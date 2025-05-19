export default {
  '/api/v1/reviews': {
    post: {
      tags: ['Review'],
      summary: '리뷰 등록',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ReviewCreateRequest' },
            example: {
              userId: 3,
              storeId: 2,
              visitId: 3,
              rating: 5,
              body: '맛있었어요!',
            },
          },
        },
      },
      responses: {
        201: {
          description: '생성된 리뷰',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ReviewResponse' },
              example: {
                id: 100,
                userId: 3,
                storeId: 2,
                visitId: 3,
                rating: 5,
                body: '맛있었어요!',
                createdAt: '2025-05-19T10:20:30.000Z',
                updatedAt: '2025-05-19T10:20:30.000Z',
                user: {
                  id: 3,
                  name: '홍길동',
                },
                store: {
                  id: 2,
                  name: '맛집포차',
                },
              },
            },
          },
        },
        404: {
          description: '방문 정보 없음 또는 이미 존재하는 리뷰',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' },
              example: {
                errorCode: 'R001',
                reason: '해당 방문에 대한 리뷰는 이미 작성되었습니다.',
                data: {
                  visitId: 3,
                },
              },
            },
          },
        },
      },
    },
  },

  '/api/v1/reviews/stores/{storeId}': {
    get: {
      tags: ['Review'],
      summary: '특정 가게의 리뷰 목록',
      parameters: [
        {
          name: 'storeId',
          in: 'path',
          required: true,
          schema: { type: 'integer' },
        },
        {
          name: 'cursor',
          in: 'query',
          required: false,
          schema: { type: 'integer' },
        },
      ],
      responses: {
        200: {
          description: '리뷰 목록',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ReviewsResponse' },
            },
          },
        },
      },
    },
  },

  '/api/v1/reviews/users/{userId}': {
    get: {
      tags: ['Review'],
      summary: '특정 사용자의 리뷰 목록',
      parameters: [
        {
          name: 'userId',
          in: 'path',
          required: true,
          schema: { type: 'integer' },
        },
        {
          name: 'cursor',
          in: 'query',
          required: false,
          schema: { type: 'integer' },
        },
      ],
      responses: {
        200: {
          description: '리뷰 목록',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ReviewsResponse' },
            },
          },
        },
      },
    },
  },
};
