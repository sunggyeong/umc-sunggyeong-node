export const bodyToReview= (body) => {
  
    return {
        user_id: body.user_id,
        store_id: body.store_id,
        body: body.body,
        rating: body.rating,
        visit_id: body.visit_id
    };
  };
// 서비스 결과 → 응답 포맷으로 변환
export const responseFromReview = (data) => {
    return {
      review: {
        review_id: data.review.id,
        user_id: data.user_id,
        store_id: data.store_id,
        body: data.review.body,
        rating: data.review.rating,
        visit_id: data.visit_id
      }
    };
  };