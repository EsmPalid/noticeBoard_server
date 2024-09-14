import express from "express";

const router = express.Router();

/*
router.post("/", async (req, res) => {
    const idCheck = await signUpIdCheck(req.body.id);
    const NNCheck = await nickNameCheck(req.body.nickName);

    if (!idCheck && !NNCheck) {
        await userCreate(req.body, req.socket.remoteAddress);
        res.send("성공");
    } else {
        res.send("Error : Client의 HTML Page가 잘못되었음");
        // Client에서 Data를 보낼 때, 해당 Data가 중복되는지 검사하는데
        // 해당 Message가 출력된다는 것은 Client의 Page가 수정되었음을 암시한다.
    }
});

router.post("/signIdCheck", async (req, res) => {
    const idCheck = await signUpIdCheck(req.body.id);
    // 중복된 ID가 존재할 시 true , 없을 시 false를 반환한다.

    res.send(idCheck);
});

router.post("/NickNameCheck", async (req, res) => {
    const NNCheck = await nickNameCheck(req.body.nickName);
    console.log(NNCheck);
    // 중복된 ID가 존재할 시 true , 없을 시 false를 반환한다.
    res.send(NNCheck);
});
*/

export default router;
