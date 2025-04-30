export const bodyToProgress= (body) => {
  
    return {
        user_id: body.user_id,
        mission_id:body.mission_id
    };
  };
// 서비스 결과 → 응답 포맷으로 변환
export const responseFromProgress = (data) => {
    return {
      mission_progress:{
        id: data.id,
        user_id: data.user_id,
        state: data.state,
        mission_id: data.mission_id,
        created_at: data.created_at,
        updated_at: data.updated_at
      }
    };
  };