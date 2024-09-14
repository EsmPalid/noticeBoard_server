import express from "express";
import { logInProcess } from "../controllers/logInController.js";
import {
    signUpProcess,
    checkNickname,
    checkUserLogInId,
} from "../controllers/signUpController.js";

const router = express.Router();

// RootPath : /api/

router.get("/article");
router.get("/content");

router.post("/signUp", signUpProcess);

router.post("/signUp/checkNickName", checkNickname);
router.post("/signUp/checkUserLogInId", checkUserLogInId);

/**
 * @swagger
 * /api/public/logIn:
 *   post:
 *       summary: 로그인 기능
 *       tags:
 *           - logIn
 *       requestBody:
 *           description: 로그인 수행을 Request하기 위한 , 필요한 Data
 *           content:
 *               application/json:
 *                   schema:
 *                       $ref: "#/components/schemas/RequestLogInData"
 *
 *       responses:
 *           200:
 *               description: 로그인이 성공적으로 완료됨
 *               content:
 *                   application/json:
 *                       schema:
 *                           $ref: "#/components/schemas/ResponseLogInData"
 *           400:
 *                description: Client에서 받은 입력값이 잘못되었음
 *
 */
router.post("/logIn", logInProcess);

export default router;
