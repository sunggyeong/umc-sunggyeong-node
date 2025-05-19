export default {
  ErrorResponse: {
     type: 'object',
  properties: {
    errorCode: { type: 'string', example: 'ERROR_CODE' },
    reason: { type: 'string', example: '에러 설명입니다.' },
    data: {
      type: 'object',
      nullable: true,
      example: null,
    },
  },
}};