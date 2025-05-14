import { prisma } from "../db.config.js";
import { ReviewVisitNotFoundError } from "../errors.js";

// 리뷰 추가

export const addReview = async (data) => {
  return await prisma.$transaction(async (tx) => {

    // 방문 내역 확인
    const visit = await tx.visit.findUnique({ where: { id: data.visitId } });
    if (!visit || visit.userId !== data.userId || visit.storeId !== data.storeId) {
      throw new ReviewVisitNotFoundError(
        "해당 방문 내역이 존재하지 않거나 이 사용자의 방문이 아닙니다.",
        {
          visitId: data.visitId,
          userId: data.userId,
          storeId: data.storeId,
        }
      );
    }

    //중복 리뷰 존재 여부 확인
     const existingReview = await tx.review.findFirst({
      where: { visitId: data.visitId },
    });

    if (existingReview) {
      throw new ReviewAlreadyExistsError(
        "해당 방문에 대한 리뷰는 이미 작성되었습니다.",
        {
          reviewId: existingReview.id,
          visitId: data.visitId,
        }
      );
    }


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

    return review;
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
      storeId: BigInt(storeId),
      ...(cursor && { id: { gt: BigInt(cursor) } }), // 커서가 있을 때만 필터링
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
};

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