import express from "express";
//import { createToken_AT } from "../utils/customCreateToken.js";
//import customVerifyToken from "../utils/useVerifyToken.js";

const router = express.Router();

/*
router.get("/tokenVerify", (req, res) => {
    // accessToken을 검사하는 부분

    const clientRefreshToken = req.headers["authorization"];
    if (clientRefreshToken) {
        const tokenResult = customVerifyToken(clientRefreshToken);

        if (tokenResult) {
            res.sendStatus(200);
        } else {
            res.sendStatus(401);
        }
    } else {
        res.sendStatus(401);
    }
});

router.get("/tokenCreate", async (req, res) => {
    // Axios에서 401 Error가 발생했을 때 , AccessToken을 생성해주는 경로
    // RefreshToken을 검증해서 성공하면 AccessToken을 생성함
    // 실패하면 , Client의 RefreshToken을 삭제하고 LogIn을 유도시킴

    const clientRefreshToken = req.headers["authorization"];

    if (clientRefreshToken) {
        const refreshToken = clientRefreshToken.split(" ")[1];
        const accessToken = await createToken_AT(refreshToken);

        if (accessToken) {
            res.json(accessToken);
        } else {
            // RefreshToken 검증 실패
            res.send(false);
        }
    } else {
        // authorization 헤더에 RefreshToken 존재하지 않음
        res.send(false);
    }
});
*/

export default router;
