import UserCertification from "../models/userCertificationModel.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";

export let accessTokenSecreKey = process.env.SECRET_KEY;
// AccessToken 전용 비밀키
const secretKey = process.env.SECRET_KEY;
// RefreshToken 전용 비밀키

setInterval(() => {
    accessTokenSecreKey = crypto.randomBytes(12).toString("hex");
}, 1000 * 60 * 60 * 24);
// 하루 마다 Access Token의 secretKey를 변경함
// 좋은가?는 모름
// 사실 내가 하루동안 Server를 켤일이 없으므로 없는거나 마찬가지

export const createRefreshToken = async (id, logIn_id, nick_name, identity) => {
    const payload = {
        // payload 부분
        id: id,
        logIn_id: logIn_id,
        nick_name: nick_name,
        identity: identity,
    };

    const options = {
        // option을 설정하는 곳
        algorithm: "HS256",
        expiresIn: "7d",
    };

    const refreshToken = jwt.sign(payload, secretKey, options);
    // RefreshToken 생성

    const [tokenResult] = await UserCertification.getRefreshToken(id);
    // 사용자 id를 기준으로 , user_certification Table에 Data가 존재하는지 확인함
    // 없다면 , 새롭게 Create 함
    // 있다면 , 기존의 Data를 Update 함

    if (tokenResult[0] === undefined) {
        // 해당 logic은 이미 생성된 RefreshToken을 DB에 저장하는 과정이다.
        const [createResult] = await UserCertification.createRefreshToken(
            id,
            refreshToken
        );
        if (createResult.affectedRows === 0) {
            // 그럴리 없겠지만 , user id와 user_certification id가 맞지 않을 경우 나타날 수 있음
            // 하지만 , user id 와 user_certification id는 외래키 관계에
            // on Delete , on Update 모두 cascade 옵션을 줬음
            // 이러한 Error 처리도 필요한가???
            throw new Error(
                "user id와 user_certification id가 맞지 않을 수 있음"
            );
        }
    } else {
        const [updateResult] = await UserCertification.updateRefreshToken(
            id,
            refreshToken
        );
        if (updateResult.affectedRows === 0) {
            throw new Error(
                "user id와 user_certification id가 맞지 않을 수 있음"
            );
        }
    }

    return refreshToken;
};

export const createAccessToken = async (refreshToken) => {
    const decode = jwt.verify(refreshToken, secretKey, (err, decode) => {
        // RefreshToken의 유효기간을 검사하는 과정이다.
        if (err) {
            // RefreshToken의 유효기간이 지남 또는 적절치 않음
            return false;
        } else {
            return decode;
        }
    });

    if (decode) {
        const { id, nick_name } = decode;

        const [rows] = await UserCertification.getRefreshToken(id);

        const { refresh_token } = rows[0];

        if (refreshToken === refresh_token) {
            // Client로부터 받은 RefreshToken과
            // UserId에 해당하는 RefreshToken이 같은지 확인함
            const payload = {
                id: id,
                nick_name: nick_name,
            };
            const option = {
                algorithm: "HS256",
                expiresIn: "1d",
            };

            const accessToken = jwt.sign(payload, accessTokenSecreKey, option);
            // 만약 , accessToken의 비밀키를 일정 시간마다 변경한다고 가정할 때를 대비해
            // refreshToken과 accessToken은 다른 비밀키 변수를 갖는다.
            // 처음에는 모두 같은 환경변수에게 값을 가져오기 때문에 , 차이가 없음

            return accessToken;
            // accessToken의 값은 Server에 저장하지 않으므로 바로 반환한다.
        }
    } else {
        // Token 자체는 유효하나 , 사용자가 다름
        return false;
    }
};
