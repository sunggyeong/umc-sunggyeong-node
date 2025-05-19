import user from './user.js';
import review from './review.js';
import store from './store.js';
import mission from './mission.js';
import missionProgress from './missionProgress.js';
import error from './error.js';

const schemas = {
  ...user,
  ...review,
  ...store,
  ...mission,
  ...missionProgress,
  ...error,
};

// default export로 내보내기
export default schemas;
