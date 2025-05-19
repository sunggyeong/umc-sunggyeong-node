export default {
  MissionProgressCreateRequest: {
    type: 'object',
    required: ['userId', 'missionId'],
    properties: {
      userId: { type: 'integer', example: 1 },
      missionId: { type: 'integer', example: 10 },
    },
  },

  MissionProgressResponse: {
    type: 'object',
    properties: {
      id: { type: 'integer', example: 123 },
      userId: { type: 'integer', example: 1 },
      missionId: { type: 'integer', example: 10 },
      state: { type: 'string', example: '도전중' },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' },
    },
  },

  InProgressMissionsResponse: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        id: { type: 'integer', example: 1 }, // missionProgress.id
        missionId: { type: 'integer', example: 10 },
        state: { type: 'string', example: '도전중' },
        mission: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 10 },
            targetAmount: { type: 'integer', example: 20 },
            deadline: { type: 'string', format: 'date-time' },
            number: { type: 'integer', example: 123456 },
            store: {
              type: 'object',
              properties: {
                id: { type: 'integer', example: 5 },
                name: { type: 'string', example: '맛집포차' },
              },
            },
          },
        },
      },
    },
  },
};
