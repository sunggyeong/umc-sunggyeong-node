// src/services/mission.service.js
import * as missionRepository from '../repositories/mission.repository.js';
import { responseFromMission } from '../dtos/mission.dto.js';
import { responseFromMissions } from '../dtos/mission.dto.js';
import { MissionNotFoundError } from '../errors.js';

export const createMission = async (data) => {
  data.number = generateMissionNumber();
  const missionId = await missionRepository.addMission(data);
  const mission = await missionRepository.getMissionById(missionId);
  
  if (!mission) {
    throw new MissionNotFoundError("등록한 미션 정보를 찾을 수 없습니다.");
  }

  return responseFromMission(mission);
};
// mission.service.js 내부
export const generateMissionNumber = () => {
  return Math.floor(100000 + Math.random() * 900000); // 100000 ~ 999999
};

export const listMissionsByStore = async (storeId) => {
  const missions = await missionRepository.getMissionsByStoreId(storeId);
  if (missions.length === 0) {
    throw new MissionNotFoundError("해당 가게에 등록된 미션이 없습니다.", {
      storeId,
    });
  }
  return responseFromMissions(missions);
};