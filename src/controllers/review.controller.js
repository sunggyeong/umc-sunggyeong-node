import express from 'express';
import { bodyToReview, responseFromReview } from '../dtos/review.dto.js';
import { createReview } from '../services/review.service.js';
import { StatusCodes } from 'http-status-codes';


export const handleReviewPost = async (req, res, next) => {
  try {
    console.log("🔥 요청 body:", req.body);
    const user = await createReview(bodyToReview(req.body));

    res.status(200).json({ result: review });
  } catch (err) {
    console.error("🔥 handleReview 에러:", err);

    next(err); // 반드시 next로 에러 넘겨야 전역 핸들러로 감
  }
};