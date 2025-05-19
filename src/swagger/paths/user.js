export default {
  '/api/v1/users': {
    post: {
      tags: ['User'],
      summary: '회원가입 - User + UserTerms + Preferences 등록',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/UserSignUpRequest' },
            example: {
              email: 'hong@example.com',
              name: '홍길동',
              gender: '남성',
              birth: '1995-05-20',
              address: '서울특별시 마포구',
              detailAddress: '101동 202호',
              phoneNumber: '010-1234-5678',
              locationChk: true,
              marketingChk: false,
              preferences: [1, 2],
            },
          },
        },
      },
      responses: {
        201: {
          description: '회원가입 성공',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UserSignUpResponse' },
              example: {
                id: 5,
                email: 'hong@example.com',
                name: '홍길동',
                gender: '남성',
                birth: '1995-05-20',
                address: '서울특별시 마포구',
                detailAddress: '101동 202호',
                phoneNumber: '010-1234-5678',
                phoneVerification: false,
                point: 0,
                preferences: [
                  { id: 1, foodCategoryId: 1, categoryName: '한식' },
                  { id: 2, foodCategoryId: 2, categoryName: '일식' },
                ],
                createdAt: '2025-05-19T12:00:00.000Z',
                updatedAt: '2025-05-19T12:00:00.000Z',
              },
            },
          },
        },
        400: {
          description: '이메일 중복 오류 등 클라이언트 오류',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' },
              example: {
                errorCode: 'U001',
                reason: '이미 존재하는 이메일입니다.',
                data: {
                  email: 'hong@example.com',
                },
              },
            },
          },
        },
      },
    },
  },
};
