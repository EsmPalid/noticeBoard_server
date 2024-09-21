import { userCreate, userDuplicateCheck } from "../services/userService.js";

export const signUpProcess = async (req, res) => {
    const userData = req.body;
    const { userLogInId, nickName, password, email } = userData;
    // userLogInId 및 password는 정규표현식을 가지고 해당 Data가 필요 패턴을 충족하는지 검사해야한다. 그와 별개로 service에서 model을 사용해서 해당 userLogInId와 nickName이 중복되는지 또한 확인해야한다.
    // 데이터 유효성 검사는 controller의 역할이지만 , 데이터의 중복을 확인하는 작업은 DB를 조회해야 하므로 해당 역할은 Service 파일에 위임한다.

    const pwRegexp =
        /^(?=.*[A-Za-z])(?=.*[\p{N}])(?=.*[\p{P}\p{S}])(?!.*[^A-Za-z\p{N}\p{P}\p{S}]).{8,16}$/u;
    // 영문, 숫자, 특수문자를 조합하여 8자리 이상 15이하의 패턴
    // 영문, 숫자, 특수문자를 제외한 다른 문자 입력시 매칭되지 않음

    const idRegexp = /^(?=.*[a-zA-Z0-9-_])(?!.*[^a-zA-Z0-9-_]).{6,12}$/g;
    // 영문, 숫자, -_ 기호를 사용하여 6자리 이상 12이하의 패턴

    if (pwRegexp.test(password) && idRegexp.test(userLogInId)) {
        //  DB 사용자 추가 => 200 status code

        const login_location = req.headers["user-agent"];
        const client_ip = req.socket.remoteAddress;
        const result = await userCreate({
            userLogInId,
            nickName,
            password,
            email,
            login_location,
            client_ip,
        });

        if (result) {
            res.send("성공");
        } else {
            res.send("400실패 혹은 500실패, 흠...");
            // service 쪽에서 controll로 결과를 반환할 때 ,단순히 boolean 값으로
            // 소통하는 경우, Client에정확한 HTTP Status code를 보내기 어렵다.
            // 지금 이걸 고치려고하면 "또" Server를 갈아 엎어야하니 생각만 해두자
            // 대충 커스텀 Error 객체를 생성하여, 처리하면 적절할 것 같다.
        }
    } else {
        res.status(400);
        res.send("데이터 형식이 맞지 않음");
        // Client에는 기본적으로 RegExp를 사용해서 , 형식에 맞지 않으면 Server로
        // Data를 보낼 수 없게 되어있다.
    }

    return false;
};

export const checkNickname = async (req, res) => {
    const { nickName } = req.body;

    if (await userDuplicateCheck("nickName", nickName)) {
        res.json({ result: true });
    } else {
        res.json({ result: false });
    }
};

export const checkLogInId = async (req, res) => {
    const { userLogInId } = req.body;

    if (await userDuplicateCheck("userLogInId", userLogInId)) {
        res.json({ result: true });
    } else {
        res.json({ result: false });
    }
};
