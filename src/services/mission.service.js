// src/services/mission.service.js
import * as missionRepository from '../repositories/mission.repository.js';
import { responseFromMission } from '../dtos/mission.dto.js';

export const createMission = async (data) => {
  const missionId = await missionRepository.addMission(data);
  const mission = await missionRepository.getMissionById(missionId);
  
  if (!mission) {
    throw new Error('등록한 미션 정보를 찾을 수 없습니다.');
  }

  return responseFromMission(mission);
};
