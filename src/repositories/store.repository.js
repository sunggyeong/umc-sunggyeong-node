import { pool } from "../db.config.js";

export const addStore = async (storeData) => {
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.query(
      `INSERT INTO store (store_name, address, region_id, category_id)
       VALUES (?, ?, ?, ?)`,
      [
        storeData.store_name,
        storeData.store_address,
        storeData.store_region_id,
        storeData.store_category_id
      ]
    );

    return result.insertId;
  } catch (err) {
    throw new Error(`store 저장 중 오류가 발생했어요. (${err})`);
  } finally {
    conn.release();
  }
};
// 사용자 정보 얻기
export const getStore = async (storeId) => {
    const conn = await pool.getConnection();
  
    try {
      const [store] = await conn.query(`SELECT * FROM store WHERE id = ?`, [storeId]);
      return store.length > 0 ? store[0] : null;
    } catch (err) {
      throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`);
    } finally {
      conn.release();
    }
  };