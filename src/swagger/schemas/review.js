export default{
    ReviewCreateRequest: {
    type: 'object',
    required: ['userId', 'storeId', 'visitId', 'rating', 'body'],
    properties: {
      userId: { type: 'integer', example: 1 },
      storeId: { type: 'integer', example: 5 },
      visitId: { type: 'integer', example: 20 },
      rating: { type: 'integer', example: 4 },
      body: { type: 'string', example: '좋았어요!' },
    },
    },
    ReviewResponse: {
    type: 'object',
    properties: {
      id: { type: 'integer', example: 100 },
      userId: { type: 'integer', example: 1 },
      storeId: { type: 'integer', example: 5 },
      visitId: { type: 'integer', example: 20 },
      rating: { type: 'integer', example: 4 },
      body: { type: 'string', example: '좋았어요!' },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' },
      user: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          name: { type: 'string', example: '홍길동' },
        },
      },
      store: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 5 },
          name: { type: 'string', example: '맛집포차' },
        },
      },
    },
  },
  ReviewsResponse: {
    type: 'array',
    items: { $ref: '#/components/schemas/ReviewResponse' },
  },

}