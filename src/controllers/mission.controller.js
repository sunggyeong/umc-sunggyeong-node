import express from 'express';
import { bodyToMission  } from '../dtos/mission.dto.js';
import { createMission } from '../services/mission.service.js';
import { StatusCodes } from 'http-status-codes';
import { listMissionsByStore } from '../services/mission.service.js';

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
export const handleListMissionsByStore = async (req, res, next) => {
  try {
    const storeId = req.params.storeId;
    const result = await listMissionsByStore(storeId);
    res.status(StatusCodes.OK).json(result);
  } catch (err) {
    console.error("🔥 handleListMissionsByStore 에러:", err);
    next(err);
  }
};