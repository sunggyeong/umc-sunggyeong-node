import { pool } from "../db.config.js";

export const addMission = async (data) => {
  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    const [result] = await conn.query(
      `INSERT INTO mission (store_id, target_amount, deadline, number)
       VALUES (?, ?, ?,?)`,
      [data.store_id, data.target_amount, data.deadline, data.number]
    );

    await conn.commit();
    return result.insertId;
  } catch (err) {
    await conn.rollback();
    throw new Error(`mission 저장 중 오류가 발생했어요. (${err.message})`);
  } finally {
    conn.release();
  }
};

export const getMissionById = async (missionId) => {
  const conn = await pool.getConnection();

  try {
    const [rows] = await conn.query(`SELECT * FROM mission WHERE id = ?`, [missionId]);
    return rows[0] || null;
  } catch (err) {
    throw new Error(`mission 조회 중 오류가 발생했어요. (${err.message})`);
  } finally {
    conn.release();
  }
};
