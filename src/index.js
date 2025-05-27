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
import { handleUserUpdate } from "./controllers/user.controller.js";

import dotev from 'dotenv';
import express from 'express'          // -> ES Module
import { prisma } from './db.config.js'; // ← 여기가 핵심! 경로 맞춰야 함

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger/index.js';
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import session from "express-session";
import passport from "passport";
import { googleStrategy } from "./auth.config.js";
import { naverStrategy } from "./auth.config.js";


dotev.config();

passport.use(googleStrategy);
passport.use(naverStrategy);
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

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
app.use(
  session({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    },
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000, // ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

// ...

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get("/oauth2/login/google", passport.authenticate("google"));
app.get(
  "/oauth2/callback/google",
  passport.authenticate("google", {
    failureRedirect: "/oauth2/login/google",
    failureMessage: true,
  }),
  (req, res) => res.redirect("/")
);
// Naver OAuth2 설정
app.get('/oauth2/login/naver', passport.authenticate("naver"));
app.get(
  '/oauth2/callback/naver',
  passport.authenticate('naver', {
    failureRedirect: '/oauth2/login/naver',
    failureMessage: true,
  }),
  (req, res) => {
    // 로그인 성공 후
    res.redirect('/');
  }
);
// ...
app.get('/', (req, res) => {
  // #swagger.ignore = true
  console.log(req.user);
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
app.put("/api/v1/users/:userId", handleUserUpdate); // 유저 정보 수정 API

/**
 * 전역 오류를 처리하기 위한 미들웨어 => controller 내에서 별도로 처리하지 않은 오류가 발생할 경으, 모두 잡아서 공통된 오류 응답
 */
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  console.error(err); // 서버 로그에 오류 출력
  // 클라이언트에게 오류 응답 전송
  res.status(err.statusCode || 500).json({
  errorCode: err.errorCode || "unknown",
  reason: err.reason || err.message || null,
  data: err.data || null,
});
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
