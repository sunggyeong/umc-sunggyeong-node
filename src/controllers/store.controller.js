import express from 'express';
import { bodyToStore, responseFromStore } from '../dtos/store.dto.js';
import { createStore } from '../services/store.service.js';
import { StatusCodes } from 'http-status-codes';


export const handleStorePost = async (req, res, next) => {
  try {
    console.log("🔥 요청 body:", req.body);
    const store = await createStore(bodyToStore(req.body));
    res.status(200).json({ result: store });
  } catch (err) {
    console.error("🔥 handleStore 에러:", err);
    next(err); // 반드시 next로 에러 넘겨야 전역 핸들러로 감
  }
};
