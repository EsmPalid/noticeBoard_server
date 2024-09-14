import bcrypt from "bcrypt";

const createHash = (data, saltRounds = 10) => {
  // data ,  Hash 함수를 사용해 Hash로 만들 Data
  // saltRounds , Data를 Hashing할 때 사용하는 Salt의 복잡도
  // 10~12 숫자값 사용권장 , 기본값 10

  const hash = bcrypt.hashSync(data, saltRounds);

  if (hash) {
    // hash 값 생성 성공 시 , hash 값을 반환함
    return hash;
  } else {
    // hash 값 생성 실패 시 , false 값을 반환함
    return false;
  }
};

const verifyHash = (data, encrypted) => {
  // datat , Hash 값을 검증할 Data
  // encrypted , Hash된 data

  const result = bcrypt.compareSync(data, encrypted);

  if (result) {
    // 검증 결과가 정상적일 경우 , true를 반환함
    return true;
  } else {
    // 검증이 잘못된 경우 false를 반환함
    return false;
  }
};
export { createHash, verifyHash };
