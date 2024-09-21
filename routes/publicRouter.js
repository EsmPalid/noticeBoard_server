import express from "express";
import { logInProcess } from "../controllers/logInController.js";
import {
    signUpProcess,
    checkNickname,
    checkLogInId,
} from "../controllers/signUpController.js";

const router = express.Router();

// RootPath : /api/

router.get("/article");
router.get("/content");

/**
 * @swagger
 * /api/public/signUp:
 *   post:
 *       summary: 회원가입 기능
 *       tags:
 *          - signUp
 *       requestBody:
 *           description: 회원가입을 수행하기 위해 필요한 user Data
 *           content:
 *               application/json:
 *                   schema:
 *                       $ref: "#components/schemas/Request_SignUpData"
 *
 *       responses:
 *           200:
 *               description: 회원가입이 성공적으로 완료됨
 *           400:
 *               description: Client가 변조되었거나 , Email이 잘못되었음(하지만 Email 확인 절차는 복잡하므로 Pass)
 *
 */

router.post("/signUp", signUpProcess);

/**
 * @swagger
 * /api/public/signUp/checkNickName:
 *   post:
 *       summary: 닉네임 중복확인 요청
 *       description: 회원가입 과정에서 , NickName이 중복되었는지를 확인함
 *       tags:
 *          - signUp
 *       requestBody:
 *           description: 중복을 확인하기 위한 nickName
 *           content:
 *              application/json:
 *                  schema:
 *                      $ref: "#components/schemas/Request_NickName"
 *
 *       responses:
 *           200:
 *              description: 중복된 NickName이 존재할 시 false , 없을 시 true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#components/schemas/Response_DuplicateCheckNickName"
 */
router.post("/signUp/checkNickName", checkNickname);

/**
 * @swagger
 * /api/public/signUp/checkLogInId:
 *    post:
 *        summary: 로그인 ID 중복확인 요청
 *        description: 회원가입 과정에서 , LogInId가 중복되었는지를 확인함
 *        tags:
 *            - signUp
 *        requestBody:
 *            description: 중복을 확인하기 위한 userLogInId
 *            content:
 *                application/json:
 *                    schema:
 *                        $ref: "#components/schemas/Request_LogInId"
 *
 *        responses:
 *            200:
 *                description: 중복된 LogInId가 존재할 시 false , 없을 시 true
 *                content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#components/schemas/Response_DuplicateCheckLogInId"
 */
router.post("/signUp/checkLogInId", checkLogInId);

/**
 * @swagger
 * /api/public/logIn:
 *   post:
 *       summary: 로그인 기능
 *       tags:
 *           - logIn
 *       requestBody:
 *           description: 로그인 수행을 Request_하기 위해 필요한 Data
 *           content:
 *               application/json:
 *                   schema:
 *                       $ref: "#/components/schemas/Request_LogInData"
 *
 *       responses:
 *           200:
 *               description: 로그인이 성공적으로 완료됨
 *               content:
 *                   application/json:
 *                       schema:
 *                           $ref: "#/components/schemas/Response_LogInData"
 *           400:
 *                description: Client에서 받은 입력값이 잘못되었음
 *
 */
router.post("/logIn", logInProcess);

export default router;
