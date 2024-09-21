import { userAuthentication } from "../services/userService.js";

export const logInProcess = async (req, res) => {
    const { userLogInId, userPw } = req.body;

    if (typeof userLogInId === "string" && typeof userPw === "string") {
        const result = await userAuthentication({ userLogInId, userPw });

        if (result) {
            res.json(result);
        } else {
            res.status(400);
            res.send("데이터가 잘못되었음");
        }
    } else {
        res.status(400);
        res.send("데이터가 잘못되었음");
    }
};
