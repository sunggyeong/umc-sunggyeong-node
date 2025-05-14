import express from 'express';
import { bodyToReview, responseFromReview } from '../dtos/review.dto.js';
import { responseFromReviews } from '../dtos/review.dto.js';
import { createReview } from '../services/review.service.js';
import { StatusCodes } from 'http-status-codes';
import { listUserReviews } from '../services/review.service.js';
import { listStoreReviews } from '../services/review.service.js';
export const handleReviewPost = async (req, res, next) => {
  try {
    const review = await createReview(bodyToReview(req.body));

    res.status(StatusCodes.OK).success(review);
  } catch (err) {
    console.error("🔥 handleReview 에러:", err);

    next(err); // 반드시 next로 에러 넘겨야 전역 핸들러로 감
  }
};

// 📍 GET /api/v1/stores/:storeId/reviews?cursor=5
export const handleListStoreReviews = async (req, res, next) => {
  try {
    const storeId = parseInt(req.params.storeId);
    const cursor = req.query.cursor ? parseInt(req.query.cursor) : 0;

    const result = await listStoreReviews(storeId, cursor);
    res.status(StatusCodes.OK).success(result);
  } catch (err) {
    next(err);
  }
};

export const handleListUserReviews = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    const cursor = req.query.cursor ? parseInt(req.query.cursor) : 0;

    const result = await listUserReviews(userId, cursor);
    res.status(StatusCodes.OK).success(result);
  } catch (err) {
    next(err);
  }
};

