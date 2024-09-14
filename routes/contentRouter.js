import express from "express";
//import { loadContent } from "../controllers/contentCtroller.js";

const router = express.Router();
/*
router.get("/", async (req, res) => {
    const queryString = new URLSearchParams(req.url.substring(2));
    // 이것도 모듈로 만들어야하나?

    const queryParams = {};

    queryString.forEach((value, key) => {
        queryParams[key] = value;
    });

    const result = await loadContent(queryParams);

    if (result) {
        res.send(result);
    } else {
        res.status(500);
    }
});

router.post("/update", async (req, res) => {});
*/

export default router;
