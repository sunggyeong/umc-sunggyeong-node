import * as storeRepository from '../repositories/store.repository.js';
import { responseFromStore } from '../dtos/store.dto.js';
export const createStore = async (data) => {
  // 리뷰 등록
      const storeId = await storeRepository.addStore(data);
  
      // 👇 등록한 리뷰 상세 조회 후 반환
      const store = await storeRepository.getStore(storeId); // reviewId 기반 조회 함수가 필요
      return responseFromStore(store);
};
