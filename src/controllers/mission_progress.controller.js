import express from 'express';
import { bodyToProgress , responseFromProgress } from '../dtos/mission_progress.dto.js';
import { createMissionProgress } from '../services/mission_progress.service.js';
import { StatusCodes } from 'http-status-codes';
import { listInProgressMissions } from '../services/mission_progress.service.js';

export const handleMissionProgressPost = async (req, res, next) => {
  try {
    console.log("🔥 요청 body:", req.body);
    const mission_progress = await createMissionProgress(bodyToProgress(req.body));

    res.status(200).json({ result: mission_progress });
  } catch (err) {
    console.error("🔥 handleMissionProgress 에러:", err);

    next(err); // 반드시 next로 에러 넘겨야 전역 핸들러로 감
  }
};
export const handleListInProgressMissions = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const cursor = req.query.cursor || null;

    const result = await listInProgressMissions(userId, cursor);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};