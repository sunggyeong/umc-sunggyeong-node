// const express = require('express')  // -> CommonJS
import cors from 'cors';
import { handleUserSignUp } from './controllers/user.controller.js'; 
import { handleReviewPost } from './controllers/review.controller.js'; // 리뷰 등록 핸들러
import { handleStorePost } from './controllers/store.controller.js'; // 가게 등록 핸들러
import { handleMissionPost } from './controllers/mission.controller.js'; // 미션 등록 핸들러
import { handleMissionProgressPost } from './controllers/mission_progress.controller.js'; // 미션 진행 등록 핸들러
import dotev from 'dotenv';
import express from 'express'          // -> ES Module

dotev.config();

const app = express()
const port = process.env.PORT;

app.use(cors());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.post("/api/v1/users", handleUserSignUp);
app.post("/api/v1/stores", handleStorePost); // 가게 등록 API
app.post("/api/v1/reviews", handleReviewPost); // 리뷰 등록 AP
app.post("/api/v1/missions", handleMissionPost); // 리뷰 등록 API
app.post("/api/v1/missionProgress", handleMissionProgressPost); // 리뷰 등록 API
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
