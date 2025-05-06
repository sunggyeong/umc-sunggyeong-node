export const bodyToStore = (body) => {
  return {
    name: body.store_name,
    address: body.store_address,
    regionId: BigInt(body.store_region_id),
    categoryId: BigInt(body.store_category_id)
  };
};

// 서비스 결과 → 응답 포맷으로 변환
export const responseFromStore = (data) => {
  return {
    store: {
      id: data.id.toString(),
      name: data.store_name,
      address: data.address,
      regionId: data.region_id.toString(),
      categoryId: data.category_id.toString()
    }
  };
};
  