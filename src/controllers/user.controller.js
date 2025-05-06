import { StatusCodes } from "http-status-codes";
 import { bodyToUser } from "../dtos/user.dto.js";
 import { userSignUp } from "../services/user.service.js";
 
 export const handleUserSignUp = async (req, res, next) => {
   try {
     console.log("🔥 요청 body:", req.body);
     const user = await userSignUp(bodyToUser(req.body));
     res.status(200).json({ result: user });
   } catch (err) {
     console.error("🔥 handleUserSignUp 에러:", err);
     next(err); // 반드시 next로 에러 넘겨야 전역 핸들러로 감
   }
 };

