import { db } from "../config/database.js";

class User {
    static create(userData) {
        // user 생성
        const { logInId, nickName, password, joinDate, email, ip } = userData;

        const userObject = {
            logIn_id: logInId,
            nick_name: nickName,
            password: password,
            join_date: joinDate,
            Email: email,
            account_locked: false,
            create_ip: ip,
            identity: "user",
            login_location: ip,
        };

        const key = Object.keys(userObject);
        const values = Object.values(userObject);
        const columns = key.join(",");
        const parameters = values.join(",");

        const sql = `INSERT INTO user (${columns}) VALUES ( ? ) `;

        console.log(sql);

        const result = db.query(sql, [parameters]);

        return result;
    }

    static getUser(userId) {
        // user id 이용 , user 탐색
        const sql = `SELECT * FROM user where id=?`;
        const rows = db.execute(sql, [userId]);

        return rows;
    }

    static getUserLogInId(userlogInId) {
        // user log_in ID 이용 ,  user 탐색
        const sql = `SELECT * FROM user where logIn_id=?`;
        const rows = db.execute(sql, [userlogInId]);
        return rows;
    }

    static getUserNickName(userNickname) {
        // userNickname 이용 , user nick_name 탐색

        const sql = `SELECT nick_name FROM user where nick_name=?`;
        const rows = db.execute(sql, [userNickname]);

        return rows;
    }

    // user 업데이트 , 삭제 미구현
}

export default User;
