import express from "express";
//import { readArticle, createArticle } from "../controllers/articleCtroller.js";
//import useVerifyToken from "../utils/useVerifyToken.js";
// AccessToken의 유효성을 검사하는 Custom 모듈

const router = express.Router();
/*
router.get("/", async (req, res) => {
    const queryString = new URLSearchParams(req.url.substring(2));
    // substring()함수로 "?/" 문자를 제거한 후 , URLSearchParams 객체로 만든다.
    // queryString을 받는 이유는 Page에 따른 article 테이블 조회를 위해서이다.
    const queryParams = {};

    queryString.forEach((value, key) => {
        queryParams[key] = value;
    });

    const result = await readArticle(queryParams);

    if (result) {
        res.send(result);
    } else {
        res.status(500);
    }
});

router.post("/create", async (req, res) => {
    // Client가 ArticleContent(글쓰기)의 작성이 완료되어 Server에 해당 Data를 처리하는 부분
    const clientAccessToken = req.headers["authorization"];

    if (clientAccessToken) {
        const tokenResult = useVerifyToken(clientAccessToken);

        if (tokenResult) {
            // DB를 활용해서 blockMap 저장해야함

            const title = req.body.title;
            const category = req.body.category;
            const clientIp = req.socket.remoteAddress;
            const writer = tokenResult.nick_name;
            const datetime = new Date();

            const blockMap = req.body.blockMap;

            const result = createArticle({
                title,
                category,
                clientIp,
                writer,
                datetime,
                blockMap,
            });
            if (result) {
                res.sendStatus(200);
            } else {
                res.sendStatus(500);
                // Server의 문제로 인해 요청을 수행하지 못함
            }
        } else {
            // AccessToken의 검증이 실패하면 401 Error를 Client에게 보낸다음
            // tokenRouter로 Request를 보내서 RefreshToken을 활용해서 AccessToken을 생성해야함
            res.sendStatus(401);
        }
    } else {
        // authorization 헤더에  AccessToken이 존재하지 않음
        // Client Page가 변형되었음
        // 왜냐하면 무조건 authorization 헤더 타입에 대한 문자열이 포함되어야함
    }
});
*/

export default router;
