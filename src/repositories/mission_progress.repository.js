import { prisma } from "../db.config.js";

// ✅ 미션 도전 기록 추가
export const addMissionProgress = async (data) => {
  const missionProgress = await prisma.missionProgress.create({
    data: {
      userId: data.userId,
      missionId: data.missionId,
      state: '도전중', 
    },
  });

  return missionProgress.id;
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
      state: "도전중",
    },
  });

  return progress;
};
