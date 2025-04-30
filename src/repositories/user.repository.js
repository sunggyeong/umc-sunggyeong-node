import { pool } from "../db.config.js";

// ✅ user_term에 사용자 약관 동의 저장 후 insertId 반환
export const addUserTerm = async (location_ok,marketing_ok) => {
  const conn = await pool.getConnection();

  try {
    const [result] = await conn.query(
      `INSERT INTO user_terms (location_chk, marketing_chk) VALUES (?, ?)`,
      [location_ok, marketing_ok]
    );
    return result.insertId;
  } catch (err) {
    throw new Error(`user_term 저장 중 오류가 발생했어요. (${err})`);
  } finally {
    conn.release();
  }
};

// ✅ User 데이터 삽입
export const addUser = async (data) => {
  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();
 

    // 1) 이메일 중복 확인
    const [confirm] = await conn.query(
      `SELECT EXISTS(SELECT 1 FROM user WHERE email = ?) as isExistEmail;`,
      [data.email]
    );

    if (confirm[0].isExistEmail) {
      await conn.rollback();
      return null;
    }
    
    // 2) 약관 저장 및 약관 ID 획득
    const userTermsId = await addUserTerm(data.location_ok, data.marketing_ok);

    // 3) user INSERT
    const [result] = await conn.query(
      `INSERT INTO user (email, name, gender, birth, address, point, user_terms_id, phone_verification)
       VALUES (?, ?, ?, ?, ?, ?, ?,?)`,
      [
        data.email,
        data.name,
        data.gender,
        data.birth,
        data.address,
        data.point ?? 0,
        userTermsId,
        data.phone_verification ?? 0
      ]
    );
    
    

    await conn.commit();
    return result.insertId;
  } catch (err) {
    await conn.rollback();
    throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`);
  } finally {
    conn.release();
  }
};
// 사용자 정보 얻기
export const getUser = async (userId) => {
  const conn = await pool.getConnection();

  try {
    const [user] = await conn.query(`SELECT * FROM user WHERE id = ?`, [userId]);
    return user.length > 0 ? user[0] : null;
  } catch (err) {
    throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`);
  } finally {
    conn.release();
  }
};


// 음식 선호 카테고리 매핑
export const setPreference = async (userId, foodCategoryId) => {
  const conn = await pool.getConnection();

  try {
    await conn.query(
      `INSERT INTO prefer (user_id, food_category_id) VALUES (?, ?)`,
      [userId, foodCategoryId]
    );
  } catch (err) {
    throw new Error(`선호 카테고리 저장 중 오류가 발생했어요. (${err})`);
  } finally {
    conn.release();
  }
};

// 사용자 선호 카테고리 반환
export const getUserPreferencesByUserId = async (userId) => {
  const conn = await pool.getConnection();

  try {
    const [preferences] = await conn.query(
      `SELECT p.id, p.food_category_id, p.user_id, fcl.category_name
       FROM prefer p
       JOIN food_category fcl ON p.food_category_id = fcl.id
       WHERE p.user_id = ?
       ORDER BY p.food_category_id ASC`,
      [userId]
    );
    return preferences;
  } catch (err) {
    throw new Error(`사용자 선호 정보 조회 중 오류가 발생했어요. (${err})`);
  } finally {
    conn.release();
  }
};
