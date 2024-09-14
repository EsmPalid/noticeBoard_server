import mysql from "mysql2/promise";
import bcrypt from "bcrypt";
// PW를 단방향 Algorithm으로 암호화하기 위해서 사용한다.
// Token은 jsonwebtoken, crypto 모듈을 사용했다
import { poolConfig } from "../config/database.js";
import { createToken_RT, createToken_AT } from "../utils/customCreateToken.js";

const pool = mysql.createPool(poolConfig);
/*

import { createLogger, format, transports } from "winston";

const { combine, timestamp, label, printf, colorize } = format;
const myFormat = printf(({ level, message, label, timestamp 
}) => {
    return `${timestamp} [${label}] ${level} : ${message}`;
});

const logger = createLogger({
    format: combine(
        colorize(),
        label({ label: "logger test" }),
        timestamp(),
        myFormat
    ),

    transports: [new transports.Console({ level: "info" })],
});
    // Log 생성 , 모듈 winston 연습단락
*/
const logInProcess = async ({ customrId, userPw }) => {
  const conn = await pool.getConnection();
  let result = {
    id: "",
    logIn_id: "",
    nickName: "",
    token: {},
    state: "",
  };
  try {
    const [customr] = await conn.query(
      "select password, nick_name, id, logIn_id from customr where login_id=?",
      [customrId],
    );
    if (customr[0] !== undefined) {
      const hash = bcrypt.compareSync(customrPw, user[0].password);

      if (hash) {
        // 비밀번호 일치
        const resultRT = createToken_RT(customr[0].id, user[0].nick_name);
        const refreshToken = resultRT.value;
        const refreshTokenExp = resultRT.exp;

        const [customrCertification] = await conn.query(
          "select * from customr_certification where id=?",
          [customr[0].id],
        );

        const expires_at = refreshTokenExp;

        if (customrCertification[0] === undefined) {
          // 1. if    없으면 새롭게 만든다.
          // 2. else  있으면 지운후 새롭게 만든다. 또는 업데이트한다.

          conn.query(
            "INSERT INTO customr_certification (id, refresh_token, expires_at ,connection) VALUES (?,?,?,?)",
            [customr[0].id, refreshToken, expires_at, 1],
          );
        } else {
          conn.query(
            "UPDATE customr_certification SET id=? , refresh_token=? , expires_at=?, connection=?",
            [customr[0].id, refreshToken, expires_at, 1],
          );
          // 위의 2개의 query문은 동기적으로 처리할 필요가 없다.
          // 그렇기에 await를 붙이지 않고 비동기적으로 처리한다.
        }

        const accessToken = await createToken_AT(refreshToken);

        result.id = customr[0].id;
        result.logIn_id = customr[0].logIn_id;
        result.nickName = customr[0].nick_name;
        result.token = {
          refreshToken: refreshToken,
          accessToken: accessToken,
        };
        result.state = "match";

        return result;
      } else {
        // 비밀번호가 일치하지 않음
        result.state = "no match";
        return result;
      }
    } else {
      // ID 불일치
      result.state = "no match";
      return result;
    }
  } catch (err) {
    console.error(err);
  } finally {
    conn.release();
  }
};

export { logInProcess };
