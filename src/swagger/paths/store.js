export default {
  '/api/v1/stores': {
    post: {
      tags: ['Store'],
      summary: '가게 등록',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/StoreCreateRequest',
            },
          },
        },
      },
      responses: {
        201: {
          description: '가게 등록 성공',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/StoreResponse',
              },
            },
          },
        },
      },
    },
  },

  '/api/v1/stores/{storeId}': {
    get: {
      tags: ['Store'],
      summary: '가게 단일 조회',
      parameters: [
        {
          name: 'storeId',
          in: 'path',
          required: true,
          schema: { type: 'integer' },
        },
      ],
      responses: {
        200: {
          description: '가게 상세 정보',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/StoreResponse',
              },
            },
          },
        },
        404: {
          description: '가게를 찾을 수 없음',
           content: {
            'application/json': {
            schema: {
              $ref: '#/components/schemas/ErrorResponse',
            },
          },
        },
        },
      },
    },
  },
};
