export const bodyToProgress = (body) => {
  return {
    userId: BigInt(body.user_id),      // 필요시 BigInt로 변환
    missionId: BigInt(body.mission_id), // 필요시 BigInt로 변환
  };
};

// 서비스 결과 → 응답 포맷으로 변환
export const responseFromProgress = (data) => {
  return {
    mission_progress: {
      id: data.id.toString(),
      userId: data.user_id.toString(),
      state: data.state,
      missionId: data.mission_id.toString(),
      createdAt: data.created_at,
      updatedAt: data.updated_at
    }
  };
};
export const responseFromInProgressMissions = (progressList) => {
  return {
    data: progressList.map((progress) => ({
      id: progress.id.toString(),
      missionId: progress.missionId.toString(),
      state: progress.state,
      store: {
        id: progress.mission.store.id.toString(),
        name: progress.mission.store.name,
      },
      createdAt: progress.createdAt,
    })),
    pagination: {
      cursor: progressList.length > 0
        ? progressList[progressList.length - 1].id.toString()
        : null,
    },
  };
};