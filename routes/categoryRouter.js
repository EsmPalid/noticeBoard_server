import express from "express";
//import { readCategory } from "../controllers/categoryCtroller.js";

const router = express.Router();
/*
router.get("/read", async (req, res) => {
    const category = await readCategory();

    if (category) {
        const result = category.map((item) => {
            // DB 결과 값(category)을 변경
            // category 형태(원본 형태)로 Client로 Data를 보낼 경우
            // DataBase의 Category 테이블의 Column이 노출된다.
            return item.type;
        });

        res.send(result);
    } else {
        // Category를 DB에서 조회하지 못한경우 , 실행되는 부분
        // 아마 DB 쪽에 문제가 생기면 실행될 가능성이 있음
    }
});

router.post("/update", (req, res) => {});

router.delete("/delete", (req, res) => {});
*/

export default router;
