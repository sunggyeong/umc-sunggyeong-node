export const bodyToStore= (body) => {
  
    return {
        store_name: body.store_name,
        store_address: body.store_address,
        store_region_id: body.store_region_id,
        store_category_id: body.store_category_id
    };
  };
// 서비스 결과 → 응답 포맷으로 변환
export const responseFromStore = (data) => {
    return {
      store: {
        store_id: data.id,
        store_name: data.store_name,
        store_address: data.address,
        store_region_id: data.region_id,
        store_category_id: data.category_id
      }
    };
  };
  