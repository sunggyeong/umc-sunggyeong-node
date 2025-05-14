import { prisma } from "../db.config.js";
// 꼭 .js 확장자까지!
import MISSION_PROGRESS_STATE from '../constants/missionStates.js';



// ✅ 미션 도전 기록 추가
export const addMissionProgress = async (data) => {
  const missionProgress = await prisma.missionProgress.create({
    data: {
      userId: data.userId,
      missionId: data.missionId,
      state: MISSION_PROGRESS_STATE.ACTIVE, 
    },
  });

  return missionProgress;
};

// ✅ ID로 미션 진행 조회
export const getMissionProgressById = async (id) => {
  const progress = await prisma.missionProgress.findUnique({
    where: { id },
  });

  return progress;
};

// ✅ 해당 미션에 대해 "도전중" 상태인 기록 1건 조회
export const findActiveProgressByMissionId = async (missionId) => {
  const progress = await prisma.missionProgress.findFirst({
    where: {
      missionId,
      state: MISSION_PROGRESS_STATE.ACTIVE,
    },
  });

  return progress;
};
// 도전중 미션 목록 커서 기반 조회
export const getInProgressMissionsByUser = async (userId, cursor) => {
  return await prisma.missionProgress.findMany({
    where: {
      userId: BigInt(userId),
      state: MISSION_PROGRESS_STATE.ACTIVE,
      ...(cursor && { id: { gt: BigInt(cursor) } }),
    },
    take: 5,
    orderBy: { id: "asc" },
    include: {
      mission: {
        include: {
          store: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });
};