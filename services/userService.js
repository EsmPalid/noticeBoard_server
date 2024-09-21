import { format } from "date-fns";
import User from "../models/userModel.js";
import { createRefreshToken, createAccessToken } from "./tokenService.js";
import { createHash, verifyHash } from "../utils/customBcryptHash.js";

export const userAuthentication = async ({ userLogInId, userPw }) => {
    try {
        const [user] = await User.getUserByLogInId(userLogInId);
        // 사용자의 LogInId를 기준으로, 사용자 정보를 가져온 다음
        // user라는 변수에 담는다.

        const { password, id, logIn_id, nick_name, identity } = user[0];

        const hashResult = verifyHash(userPw, password);
        // password를 검증하는 기능의 함수

        console.log(hashResult);

        if (hashResult) {
            // password의 검증 결과가 정상적일 경우, Token 값들을 생성하여
            // Controller에 전달한다.
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

export const userCreate = async ({
    userLogInId,
    nickName,
    password,
    email,
    login_location,
    client_ip,
}) => {
    try {
        if (
            !(await userDuplicateCheck("userLogInId", userLogInId)) &&
            !(await userDuplicateCheck("nickName", nickName))
            // 사용자를 추가하기 이전에 , logInId 와 nickName이 중복되는지 검사한다.
        ) {
            // DB에 사용자를 추가하는 Business 로직

            const hashPassword = createHash(password);
            const now = new Date();
            const joinDate = format(now, "yyyy-MM-dd HH:mm:ss");

            if (hashPassword) {
                const userData = {
                    logIn_id: userLogInId,
                    nick_name: nickName,
                    password: hashPassword,
                    join_date: joinDate,
                    Email: email,
                    account_locked: false,
                    client_ip: client_ip,
                    identity: "normal",
                    login_location: login_location,
                };

                await User.createUser(userData);

                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    } catch (err) {
        console.error(err);
    }
};

export const userDuplicateCheck = async (columnName, value) => {
    // columnName       중복을 확인할 column (주의, DB의 컬럼명과 일치하지 않음)
    // value            중복을 확인할 data값

    try {
        switch (columnName) {
            // columnName의 값에 따라서, 중복을 체크할 내용이 바뀐다.
            // excute() 메서드를 사용하여, 유연성이 떨어지므로, 중복체크할 column이 늘어나면 이곳의 case와 Model의 정적 메서드를 추가해야한다.
            case "userLogInId":
                const [userLogInId] = await User.getUserLogInId(value);

                if (value !== userLogInId[0] && userLogInId[0] !== undefined) {
                    return true;
                }
                break;

            case "nickName":
                const [nickName] = await User.getUserNickName(value);
                if (value !== nickName[0] && nickName[0] !== undefined) {
                    return true;
                }
                break;
        }

        return false;
    } catch (err) {
        console.error(err);
    }
};
