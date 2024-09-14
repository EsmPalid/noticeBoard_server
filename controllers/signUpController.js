export const signUpProcess = async (req, res) => {
    const { logInId, nickName, password, joinDate, email } = req.body;
    // logInid 및 password는 정규표현식을 가지고 해당 Data가 필요 패턴을 충족하는지 검사해야한다. 그와 별개로 service에서 model을 사용해서 해당 logInId와 nickName이 중복되는지 또한 확인해야한다.
    // 데이터 유효성 검사는 controller의 역할이지만 , 데이터의 중복을 확인하는 작업은 DB를 조회해야 하므로 해당 역할은 Service 파일에 위임한다.

    const pwRegexp =
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*-_\\\+\=\:\;\'\"\[\]\{\}\<\>\.\,\/\?]).{8,16}$/;
    // 영문 , 숫자 , 특수문자를 조합하여 8자리 이상 15이하의 패턴

    const idRegexp = /^A-Za-z0-9-_/;
    // 영문 또는 숫자를 사용해서

    if (pwRegexp.test(password) && idRegexp.test(logInId)) {
    } else {
        res.status(400);
        res.send("데이터가 맞지 않음");
    }

    return false;
};

export const checkNickname = async (req, res) => {
    return false;
};

export const checkUserLogInId = async (req, res) => {
    return false;
};
