// src/services/mission_progress.service.js

import * as missionProgressRepository from '../repositories/mission_progress.repository.js';
import { responseFromProgress } from '../dtos/mission_progress.dto.js';
import { responseFromInProgressMissions } from '../dtos/mission_progress.dto.js';
export const createMissionProgress = async (data) => {
    const activeProgress = await missionProgressRepository.findActiveProgressByMissionId(data.missionId);
  
    // 다른 사람이 이미 도전중이면 금지
    if (activeProgress && activeProgress.userId !== data.userId) {
      throw new Error('이미 다른 사용자가 도전 중인 미션입니다.');
    }
  
    // 본인이 이미 도전중이면 무시 (중복 INSERT 방지)
    if (activeProgress && activeProgress.userId === data.userId) {
      return responseFromProgress(activeProgress);
    }
  
    // ✅ 여기서 state를 강제로 '도전중'으로 설정
  const id = await missionProgressRepository.addMissionProgress({
    ...data,
    state: '도전중'
  });
  
    const newProgress = await missionProgressRepository.getMissionProgressById(id);
    return responseFromProgress(newProgress);
  };
  export const listInProgressMissions = async (userId, cursor) => {
    const results = await missionProgressRepository.getInProgressMissionsByUser(userId, cursor);
    return responseFromInProgressMissions(results);
  };
  