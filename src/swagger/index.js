import schemas from './schemas/index.js';
import paths from './paths/index.js';

export default {
  openapi: '3.0.0',
  info: {
    title: 'UMC 7th API',
    version: '1.0.0',
    description: 'Swagger 기반 API 문서',
  },
  components: {
    schemas,
  },
  paths,
};
