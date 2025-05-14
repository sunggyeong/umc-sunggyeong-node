import express from 'express';
import { bodyToStore, responseFromStore } from '../dtos/store.dto.js';
import { createStore } from '../services/store.service.js';
import { StatusCodes } from 'http-status-codes';


export const handleStorePost = async (req, res, next) => {
  try {
    const store = await createStore(bodyToStore(req.body));
    res.status(StatusCodes.OK).success(store);
  } catch (err) {
    console.error("🔥 handleStore 에러:", err);
    next(err); 
  }
};
