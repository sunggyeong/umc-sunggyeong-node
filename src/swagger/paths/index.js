import userPath from './user.js';
import storePath from './store.js';
import missionPath from './mission.js';
import reviewPath from './review.js';
import missionProgressPath from './missionProgress.js';

const paths ={
    ...userPath,
    ...storePath,
    ...missionPath,
    ...reviewPath,
    ...missionProgressPath,

};

export default paths;