import express from 'express';
import { bodyToMission  } from '../dtos/mission.dto.js';
import { createMission } from '../services/mission.service.js';
import { StatusCodes } from 'http-status-codes';
import { listMissionsByStore } from '../services/mission.service.js';

export const handleMissionPost = async (req, res, next) => {
  try {
    const mission = await createMission(bodyToMission(req.body));

    res.status(StatusCodes.OK).success(mission);
  } catch (err) {
    console.error("🔥 handleReview 에러:", err);

    next(err); // 반드시 next로 에러 넘겨야 전역 핸들러로 감
  }
};

export const handleListMissionsByStore = async (req, res, next) => {
  try {
    const storeId = req.params.storeId;

     const missions = await listMissionsByStore(storeId);                                        // 

    res.status(200).json({ missions });          
  } catch (err) {
    console.error("🔥 handleListMissionsByStore 에러:", err);
    next(err);
  }
};