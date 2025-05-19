export default {
  '/api/v1/missionProgress': {
    post: {
      tags: ['MissionProgress'],
      summary: '미션 도전 시작',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/MissionProgressCreateRequest',
            },
            example: {
              userId: 3,
              missionId: 12,
            },
          },
        },
      },
      responses: {
        201: {
          description: '도전 시작 성공',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/MissionProgressResponse',
              },
              example: {
                id: 100,
                userId: 3,
                missionId: 12,
                state: '도전중',
                createdAt: '2025-05-19T11:00:00.000Z',
                updatedAt: '2025-05-19T11:00:00.000Z',
              },
            },
          },
        },
        400: {
          description: '이미 도전 중이거나 도전 불가',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse',
              },
              example: {
                errorCode: 'MP001',
                reason: '이미 다른 사용자가 도전 중입니다.',
                data: {
                  missionId: 12,
                },
              },
            },
          },
        },
      },
    },
  },

  '/api/v1/users/{userId}/missions/in-progress': {
    get: {
      tags: ['MissionProgress'],
      summary: '사용자의 도전중 미션 목록 조회',
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
          description: '도전중인 미션 목록',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/InProgressMissionsResponse',
              },
              example: {
                missions: [
                  {
                    id: 100,
                    userId: 3,
                    missionId: 12,
                    state: '도전중',
                    createdAt: '2025-05-19T11:00:00.000Z',
                    updatedAt: '2025-05-19T11:00:00.000Z',
                    mission: {
                      id: 12,
                      targetAmount: 10000,
                      deadline: '2025-05-31T00:00:00.000Z',
                      number: 123456,
                      store: {
                        id: 1,
                        name: '맛집포차',
                      },
                    },
                  },
                ],
              },
            },
          },
        },
      },
    },
  },
};
