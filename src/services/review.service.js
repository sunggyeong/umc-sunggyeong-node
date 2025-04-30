
import { responseFromReview } from '../dtos/review.dto.js';
import * as reviewRepository from '../repositories/review.repository.js';

export const createReview = async (data) => {
    // 리뷰 등록
    const reviewId = await reviewRepository.addReview(data);

    // 👇 등록한 리뷰 상세 조회 후 반환
    const review = await reviewRepository.getReview(reviewId); // reviewId 기반 조회 함수가 필요
    return responseFromReview(review);
};
