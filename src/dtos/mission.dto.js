export const bodyToMission= (body) => {
  
    return {
        store_id: body.store_id,
        target_amount: body.target_amount,
    };
  };
// 서비스 결과 → 응답 포맷으로 변환
export const responseFromMission = (data) => {
    return {
      mission: {
        id: data.id,
        store_id: data.store_id,
        number: data.number,
        target_amount: data.target_amount,
        deadline: data.deadline,
        created_at: data.created_at,
        updated_at: data.updated_at
      }
    };
  };