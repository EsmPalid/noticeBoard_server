import User from "../models/userModel.js";
import { createRefreshToken, createAccessToken } from "./tokenService.js";
import { verifyHash } from "../utils/customBcryptHash.js";

export const userAuthentication = async ({ userLogInId, userPw }) => {
    try {
        // const [user] = await User.getUserLogInId(userLogInId);
        const [user] = await User.getUserLogInId(userLogInId);

        const { password, id, logIn_id, nick_name, identity } = user[0];

        const hashResult = verifyHash(userPw, password);

        if (hashResult) {
            const refreshToken = await createRefreshToken(
                id,
                logIn_id,
                nick_name,
                identity
            );
            const accessToken = await createAccessToken(refreshToken);

            return { refreshToken: refreshToken, accessToken: accessToken };
        } else {
            return false;
        }
    } catch (err) {
        console.error(err);
    }
};
