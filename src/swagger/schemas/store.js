export default {
  StoreCreateRequest: {
    type: 'object',
    required: ['store_name', 'store_address', 'store_region_id', 'store_category_id'],
    properties: {
      store_name: { type: 'string', example: '맛집 포차' },
      store_address: { type: 'string', example: '서울시 강남구 역삼동 123-45' },
      store_region_id: { type: 'integer', example: 1 },
      store_category_id: { type: 'integer', example: 2 },
    },
  },

  StoreResponse: {
    type: 'object',
    properties: {
      id: { type: 'integer', example: 5 },
      name: { type: 'string', example: '맛집 포차' },
      address: { type: 'string', example: '서울시 강남구 역삼동 123-45' },
      regionId: { type: 'integer', example: 1 },
      categoryId: { type: 'integer', example: 2 },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' },
    },
  },
};
