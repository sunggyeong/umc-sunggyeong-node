import express from 'express';
import { bodyToMission , responseFromMission } from '../dtos/mission.dto.js';
import { createMission } from '../services/mission.service.js';
import { StatusCodes } from 'http-status-codes';


export const handleMissionPost = async (req, res, next) => {
  try {
    console.log("🔥 요청 body:", req.body);
    const mission = await createMission(bodyToMission(req.body));

    res.status(200).json({ result: mission });
  } catch (err) {
    console.error("🔥 handleReview 에러:", err);

    next(err); // 반드시 next로 에러 넘겨야 전역 핸들러로 감
  }
};