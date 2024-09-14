import mysql from "mysql2/promise";
import bcrypt from "bcrypt";
import { poolConfig } from "../config/database.js";

const pool = mysql.createPool(poolConfig);

const signUpIdCheck = async (id) => {
  const conn = await pool.getConnection();
  try {
    const [userRows] = await conn.query(
      `SELECT logIn_id FROM user where logIn_id=?`,
      [id],
    );

    // LogIn ID를 체크하는 logic
    // 해당 ID가 없으면 false , 있으면 true를 전송함

    if (userRows[0] === undefined) {
      return false;
    } else {
      return true;
    }
  } catch (err) {
    console.log(err);
  } finally {
    conn.release();
  }
};

const nickNameCheck = async (nickName) => {
  const conn = await pool.getConnection();
  try {
    const userRows = await conn.query(
      `SELECT nick_name FROM user where nick_name=?`,
      [nickName],
    );

    if (userRows[0] === undefined) {
      return false;
    } else {
      return true;
    }
  } catch (err) {
    console.log(err);
  } finally {
    conn.release();
  }
};

const userCreate = async (
  { id, pw, nickName, email, userAgent, userLaguage },
  // 사용자 언어는 아직 DB Column에 부여되지 않음
  ip,
) => {
  let userData = "";
  let userDevice = "";
  let userOS = userAgent.platform;
  let userBrowser = userAgent.brands[0].brand;
  let userBrowserVersion = userAgent.brands[0].version;

  let date = new Date();
  // 회원가입한 날짜를 기록함
  if (userAgent.mobile) {
    userDevice = "Mobile";
    userData = `Divice=${userDevice} OS=${userOS} Browser='${userBrowser}'/Version ${userBrowserVersion}`;
  } else {
    userDevice = "DESKTOP";
    userData = `Divice=${userDevice} OS=${userOS} Browser='${userBrowser}'/Version ${userBrowserVersion}`;
  }

  const hash = bcrypt.hashSync(pw, 10);

  const conn = await pool.getConnection();
  try {
    await conn.query(
      `INSERT INTO user SET logIn_id=? , nick_name=? , password=? ,
            join_date=? , Email=? , account_locked=0 , 
            create_ip=? , identity='normal' , login_location=?`,
      [id, nickName, hash, date, email, ip, userData],
    );
  } catch (err) {
    console.error(err);
  } finally {
    conn.release();
  }
};

export { signUpIdCheck, nickNameCheck, userCreate };
