import { pool } from "../db.config.js";

export const addMissionProgress = async (data) => {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const [result] = await conn.query(
      `INSERT INTO mission_progress (user_id, mission_id, state)
       VALUES (?, ?,  ?)`,
      [data.user_id, data.mission_id, data.state]
    );

    await conn.commit();
    return result.insertId;
  } catch (err) {
    await conn.rollback();
    throw new Error(`mission_progress 저장 중 오류가 발생했어요. (${err.message})`);
  } finally {
    conn.release();
  }
};

export const getMissionProgressById = async (id) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query(
      `SELECT * FROM mission_progress WHERE id = ?`,
      [id]
    );
    return rows[0] || null;
  } catch (err) {
    throw new Error(`mission_progress 조회 중 오류가 발생했어요. (${err.message})`);
  } finally {
    conn.release();
  }
};

export const findActiveProgressByMissionId = async (missionId) => {
    const conn = await pool.getConnection();
    try {
      const [rows] = await conn.query(
        `SELECT * FROM mission_progress
         WHERE mission_id = ? AND state = '도전중'
         LIMIT 1`,
        [missionId]
      );
      return rows[0] || null;
    } finally {
      conn.release();
    }
  };
  