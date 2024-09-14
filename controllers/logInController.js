import { userAuthentication } from "../services/userService.js";

export const logInProcess = async (req, res) => {
    const { userLogInId, userPw } = req.body;

    if (typeof userLogInId === "string" && typeof userPw === "string") {
        const result = await userAuthentication({ userLogInId, userPw });

        if (result) {
            res.json(result);
        } else {
            res.status(400);
        }
    } else {
        // 해당 Status 코드 , Client에서 잘못된 Reqeust에서 왔기 때문에 전달된다.
        res.status(400);
    }
};
