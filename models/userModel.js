import { db } from "../config/database.js";

const userColumns = {
    logIn_id: "varchar(255)",
    nick_name: "varchar(255)",
    password: "varchar(255)",
    join_date: "datetime",
    Email: "varchar(255)",
    account_locked: "tinyint(1)",
    client_ip: "varchar(255)",
    identity: "varchar(255)",
    login_location: "varchar(255)",
};

const columns = Object.keys(userColumns).join(",");

class User {
    static createUser(userData) {
        // 사용자 회원가입 기능

        const values = Object.values(userData);
        const questionMark = values.map(() => "?").join(",");

        const sql = `INSERT INTO user (${columns}) VALUES (${questionMark}) `;

        const result = db.execute(sql, values);

        return result;
    }

    static getUser(userId) {
        // 사용자의 id(기본키)를 이용하여 , user 탐색
    }

    static getUserByLogInId(userLogInId) {
        // 사용자의 로그인 ID를 이용하여 , user 탐색
        const sql = `SELECT * FROM user where logIn_id=?`;
        const rows = db.execute(sql, [userLogInId]);

        return rows;
    }

    static getUserLogInId(userlogInId) {
        // 사용자의 로그인 ID를 이용하여 ,  user logIn_id 탐색
        const sql = `SELECT login_id FROM user where logIn_id=?`;
        const rows = db.execute(sql, [userlogInId]);
        return rows;
    }

    static getUserNickName(userNickname) {
        // 사용자의 nickName을 이용하여 , user nick_name 탐색

        const sql = `SELECT nick_name FROM user where nick_name=?`;
        const rows = db.execute(sql, [userNickname]);

        return rows;
    }

    // user 업데이트 , 삭제 미구현
}

export default User;
