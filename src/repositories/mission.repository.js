import { prisma } from "../db.config.js";

// ✅ 미션 추가
export const addMission = async (data) => {
  const mission = await prisma.mission.create({
    data: {
      storeId: data.storeId,
      targetAmount: data.targetAmount,
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7일 후
      number: generateRandomNumber(),
    },
  });

  return mission.id;
};

// ✅ 미션 조회 by ID
export const getMissionById = async (missionId) => {
  const mission = await prisma.mission.findUnique({
    where: { id: missionId },
  });

  return mission;
};

function generateRandomNumber() {
  return Math.floor(100000 + Math.random() * 900000); // 100000 ~ 999999 사이 숫자
}
