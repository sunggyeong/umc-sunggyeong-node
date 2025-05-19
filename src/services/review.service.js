
import { responseFromReview } from '../dtos/review.dto.js';
import { responseFromReviews } from '../dtos/review.dto.js';
import * as reviewRepository from '../repositories/review.repository.js';
import { getAllUserReviews } from '../repositories/review.repository.js';
import { getAllStoreReviews } from '../repositories/review.repository.js';
import * as error from '../errors.js';
export const createReview = async (data) => {
    // 리뷰 등록
    const reviewId = await reviewRepository.addReview(data);
    if (!reviewId) {
        throw new ReviewAlreadyExistsError(
            "해당 방문에 대한 리뷰는 이미 작성되었습니다.");
}

    //  등록한 리뷰 상세 조회 후 반환
    const review = await reviewRepository.getReview(reviewId); // reviewId 기반 조회 함수가 필요
    return responseFromReview(review);
};
export const listStoreReviews = async (storeId, cursor) => {
    const reviews = await getAllStoreReviews(storeId, cursor);
    return responseFromReviews(reviews);
  };
export const listUserReviews = async (userId, cursor) => {
    const reviews = await getAllUserReviews(userId, cursor);
    return responseFromReviews(reviews);
};