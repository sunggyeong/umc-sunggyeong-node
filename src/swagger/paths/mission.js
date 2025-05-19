export default {
  '/api/v1/missions': {
    post: {
      tags: ['Mission'],
      summary: '미션 등록',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/MissionCreateRequest',
            },
            example: {
              storeId: 1,
              targetAmount: 10000,
              deadline: '2025-05-31T00:00:00.000Z',
            },
          },
        },
      },
      responses: {
        201: {
          description: '미션 등록 성공',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/MissionResponse',
              },
              example: {
                id: 123,
                storeId: 1,
                targetAmount: 10000,
                deadline: '2025-05-31T00:00:00.000Z',
                number: 567890,
                createdAt: '2025-05-19T10:30:00.000Z',
                updatedAt: '2025-05-19T10:30:00.000Z',
                store: {
                  id: 1,
                  name: '홍대 맛집포차',
                },
              },
            },
          },
        },
        400: {
          description: '잘못된 요청 또는 매장 없음',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse',
              },
              example: {
                errorCode: 'M001',
                reason: '존재하지 않는 가게입니다.',
                data: {
                  storeId: 999,
                },
              },
            },
          },
        },
      },
    },
  },

  '/api/v1/missions/stores/{storeId}': {
    get: {
      tags: ['Mission'],
      summary: '가게별 미션 목록 조회',
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
          description: '가게의 미션 목록',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/MissionsResponse',
              },
              example: {
                missions: [
                  {
                    id: 123,
                    storeId: 1,
                    targetAmount: 10000,
                    deadline: '2025-05-31T00:00:00.000Z',
                    number: 567890,
                    createdAt: '2025-05-19T10:30:00.000Z',
                    updatedAt: '2025-05-19T10:30:00.000Z',
                    store: {
                      id: 1,
                      name: '홍대 맛집포차',
                    },
                  },
                ],
              },
            },
          },
        },
        404: {
          description: '해당 가게에 등록된 미션이 없습니다.',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse',
              },
              example: {
                errorCode: 'M002',
                reason: '해당 가게에 등록된 미션이 없습니다.',
                data: {
                  storeId: 1,
                },
              },
            },
          },
        },
      },
    },
  },
};
