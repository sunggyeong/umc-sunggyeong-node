export default {
  MissionCreateRequest: {
    type: 'object',
    required: ['storeId', 'targetAmount'],
    properties: {
      storeId: { type: 'integer', example: 5 },
      targetAmount: { type: 'integer', example: 10 },
    },
  },
  MissionResponse: {
    type: 'object',
    properties: {
      id: { type: 'integer', example: 1 },
      storeId: { type: 'integer', example: 5 },
      targetAmount: { type: 'integer', example: 10 },
      deadline: { type: 'string', format: 'date-time' },
      number: { type: 'integer', example: 123456 },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' },
    },
  },
  MissionsResponse: {
    type: 'array',
    items: { $ref: '#/components/schemas/MissionResponse' },
  },
};
