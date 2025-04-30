// const express = require('express')  // -> CommonJS
import cors from 'cors';
import { handleUserSignUp } from './controllers/user.controller.js'; 
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
