// const express = require('express')  // -> CommonJS
import cors from 'cors';
import { handleUserSignUp } from './controllers/user.controller.js'; 
import { handleReviewPost } from './controllers/review.controller.js'; // 리뷰 등록 핸들러
import { handleStorePost } from './controllers/store.controller.js'; // 가게 등록 핸들러
import { handleMissionPost } from './controllers/mission.controller.js'; // 미션 등록 핸들러
import { handleMissionProgressPost } from './controllers/mission_progress.controller.js'; // 미션 진행 등록 핸들러
import { handleListStoreReviews } from './controllers/review.controller.js'; // 가게 리뷰 목록 조회 핸들러
import { handleListUserReviews}  from './controllers/review.controller.js'; //유저 리뷰 목록 조회 핸들러
import { handleListMissionsByStore } from './controllers/mission.controller.js'; // 가게 미션 목록 조회 핸들러
import { handleListInProgressMissions } from './controllers/mission_progress.controller.js'; // 도전중 미션 목록 조회 핸들러

import dotev from 'dotenv';
import express from 'express'          // -> ES Module
import { prisma } from './db.config.js'; // ← 여기가 핵심! 경로 맞춰야 함

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger/index.js';
dotev.config();

const app = express()
const port = process.env.PORT;

/*공통 응답을 사용할 수 있는 헬퍼 함수 등록*/
app.use((req, res, next) => {
  res.success = (success) => {
    return res.json({ resultType: "SUCCESS", error: null, success });
  };

  res.error = (errorCode = "unknown", reason=null, data=null) => {
    return res.json({ resultType: "FAILURE", error, success: null });
  };
  next();
});

app.use(cors());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// ...

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// ...
app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.post("/api/v1/users", handleUserSignUp);
app.post("/api/v1/stores", handleStorePost); // 가게 등록 API
app.post("/api/v1/reviews", handleReviewPost); // 리뷰 등록 AP
app.post("/api/v1/missions", handleMissionPost); // 미션 등록 API
app.post("/api/v1/missionProgress", handleMissionProgressPost); // 미션 진행 등록 API
app.get("/api/v1/stores/:storeId/reviews", handleListStoreReviews); // 가게 리뷰 목록 조회 API
app.get("/api/v1/users/:userId/reviews", handleListUserReviews);  // 유저 리뷰 목록 조회 API
app.get("/api/v1/stores/:storeId/missions", handleListMissionsByStore);  // 가게 미션 목록 조회 API
app.get('/api/v1/users/:userId/missions/in-progress', handleListInProgressMissions); // 도전중 미션 목록 조회 API


/**
 * 전역 오류를 처리하기 위한 미들웨어 => controller 내에서 별도로 처리하지 않은 오류가 발생할 경으, 모두 잡아서 공통된 오류 응답
 */
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.statusCode || 400).json({
  errorCode: err.errorCode || "UNKNOWN",
  reason: err.reason || err.message,
  data: err.data || null,
});
  res.status(err.statusCode || 500).json({
  errorCode: err.errorCode || "unknown",
  reason: err.reason || err.message || null,
  data: err.data || null,
});
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// 모든 라우터(app.get, app.post) 뒤에 추가해야 함
app.use((err, req, res, next) => {
  console.error("🔥 [전역 에러 핸들러]", err.stack || err);
  res.status(500).json({
    message: "Internal Server Error",
    error: String(err)
  });
});
