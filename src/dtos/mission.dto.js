export const bodyToMission = (body) => {
  return {
    storeId: BigInt(body.store_id),         // BigInt로 변환
    targetAmount: body.target_amount
  };
};

// 서비스 결과 → 응답 포맷으로 변환
export const responseFromMission = (data) => {
  return {
    mission: {
      id: data.id.toString(),
      storeId: data.storeId.toString(),
      number: data.number,        // number도 BigInt면 변환
      targetAmount: data.targetAmount,
      deadline: data.deadline,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt
    }
  };
};
export const responseFromMissions = (missions) => {
  return {
    data: missions.map((mission) => ({
      id: mission.id.toString(),
      number: mission.number,
      targetAmount: mission.targetAmount,
      deadline: mission.deadline,
      store: {
        name: mission.store?.name ?? '',
      },
    })),
    pagination: {
      cursor: missions.length ? missions[missions.length - 1].id.toString() : null,
    },
  };
};