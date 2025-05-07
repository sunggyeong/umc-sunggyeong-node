// src/services/mission.service.js
import * as missionRepository from '../repositories/mission.repository.js';
import { responseFromMission } from '../dtos/mission.dto.js';
import { responseFromMissions } from '../dtos/mission.dto.js';

export const createMission = async (data) => {
  data.number = generateMissionNumber();
  const missionId = await missionRepository.addMission(data);
  const mission = await missionRepository.getMissionById(missionId);
  
  if (!mission) {
    throw new Error('등록한 미션 정보를 찾을 수 없습니다.');
  }

  return responseFromMission(mission);
};
// mission.service.js 내부
export const generateMissionNumber = () => {
  return Math.floor(100000 + Math.random() * 900000); // 100000 ~ 999999
};

export const listMissionsByStore = async (storeId) => {
  const missions = await missionRepository.getMissionsByStoreId(storeId);
  return responseFromMissions(missions);
};