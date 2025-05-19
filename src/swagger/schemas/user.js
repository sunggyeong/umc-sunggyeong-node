export default{
  UserSignUpRequest: {
    type: 'object',
    required: ['email', 'name', 'gender', 'birth', 'phoneNumber', 'address', 'userTerms', 'preferences'],
    properties: {
      email: { type: 'string', example: 'test@example.com' },
      name: { type: 'string', example: '홍길동' },
      gender: { type: 'string', example: 'male' },
      birth: { type: 'string', format: 'date', example: '2000-01-01' },
      phoneNumber: { type: 'string', example: '010-1234-5678' },
      address: { type: 'string', example: '서울시 강남구' },
      userTerms: {
        type: 'object',
        required: ['locationChk', 'marketingChk'],
        properties: {
          locationChk: { type: 'boolean', example: true },
          marketingChk: { type: 'boolean', example: false },
        },
      },
      preferences: {
        type: 'array',
        items: {
          type: 'integer',
          example: 1, // foodCategoryId
        },
      },
    },
  },

  UserSignUpResponse: {
    type: 'object',
    properties: {
      id: { type: 'integer', example: 1 },
      email: { type: 'string', example: 'test@example.com' },
      name: { type: 'string', example: '홍길동' },
      gender: { type: 'string', example: 'male' },
      birth: { type: 'string', format: 'date' },
      phoneNumber: { type: 'string', example: '010-1234-5678' },
      address: { type: 'string', example: '서울시 강남구' },
      phoneVerification: { type: 'boolean', example: false },
      point: { type: 'integer', example: 0 },
      userTerms: {
        type: 'object',
        properties: {
          locationChk: { type: 'boolean', example: true },
          marketingChk: { type: 'boolean', example: false },
        },
      },
      preferences: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            foodCategoryId: { type: 'integer', example: 2 },
            foodCategory: {
              type: 'object',
              properties: {
                categoryName: { type: 'string', example: '한식' },
              },
            },
          },
        },
      },
    },
  },
};
