import { pool } from "../db.config.js";
// review 데이터 삽입
export const addReview = async (data) => {
  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();
    // 사전 검증 1: 유저 존재 여부 확인
    const [userRows] = await conn.query(
        `SELECT * FROM user WHERE id = ?`,
        [data.user_id]
      );
      if (userRows.length === 0) {
        throw new Error('존재하지 않는 사용자입니다.');
      }
  
 
    const [result] = await conn.query(
      `INSERT INTO review (user_id, store_id, body, rating, visit_id)
       VALUES (?, ?, ?, ?, ?)`,
      [
        data.user_id,
        data.store_id,
        data.body,
        data.rating,    
        data.visit_id
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
export const getReview = async (reviewId) => {
    const conn = await pool.getConnection();
  
    try {
      const [review] = await conn.query(`SELECT * FROM review WHERE id = ?`, [reviewId]);
      return review.length > 0 ? review[0] : null;
    } catch (err) {
      throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`);
    } finally {
      conn.release();
    }
  };