import { prisma } from "../db.config.js";

// 리뷰 추가
export const addReview = async (data) => {
  return await prisma.$transaction(async (tx) => {
    // 유저 존재 여부 확인
    const user = await tx.user.findUnique({ where: { id: data.userId } });
    if (!user) throw new Error("존재하지 않는 사용자입니다.");

    // 리뷰 생성
    const review = await tx.review.create({
      data: {
        userId: data.userId,
        storeId: data.storeId,
        body: data.body,
        rating: data.rating,
        visitId: data.visitId,
      },
    });

    return review.id;
  });
};

// 리뷰 조회
export const getReview = async (reviewId) => {
  const review = await prisma.review.findUnique({
    where: { id: reviewId },
  });
  return review;
};

// 사용자 조회 (중복 제거 가능하지만 유지)
export const getUser = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  return user;
};
export const getAllStoreReviews = async (storeId, cursor) => {
  const reviews = await prisma.review.findMany({
    where: {
      storeId,
      id: { gt: cursor },
    },
    take: 5,
    orderBy: {
      id: 'asc',
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
      store: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  return reviews;
}
export const getAllUserReviews = async (userId, cursor) => {
  const reviews = await prisma.review.findMany({
    where: {
      userId: BigInt(userId),
      id: { gt: BigInt(cursor) },
    },
    take: 5,
    orderBy: {
      id: 'asc',
    },
    include: {
      store: {
        select: {
          name: true,
        },
      },
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return reviews;
};