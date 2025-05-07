export const bodyToReview = (body) => {
  return {
    userId: body.user_id,
    storeId: body.store_id,
    body: body.body,
    rating: body.rating,
    visitId: body.visit_id
  };
};

// 단일 리뷰 응답
export const responseFromReview = (data) => {
  return {
    review: {
      id: data.id.toString(),
      userId: data.user_id.toString(),
      storeId: data.store_id.toString(),
      visitId: data.visit_id.toString(),
      body: data.body,
      rating: data.rating,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt
    }
  };
};


export const responseFromReviews = (reviews) => {
  return {
    data: reviews.map((review) => ({
      id: review.id.toString(),
      content: review.body,
      rating: review.rating,
      createdAt: review.createdAt,
      user: {
        id: review.user?.id?.toString() ?? null,
        name: review.user?.name ?? "알 수 없음",
      },
      store: {
        id: review.store?.id?.toString() ?? null,
        name: review.store?.name ?? "알 수 없음",
      },
    })),
    pagination: {
      cursor: reviews.length ? reviews[reviews.length - 1].id.toString() : null,
    },
  };
};
  