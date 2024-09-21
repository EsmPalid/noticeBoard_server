import { db } from "../config/database.js";

const userCertificationColumns = {
    id: "int(10) unsigned",
    refresh_token: "varchar(512)",
    connection: "tinyint(1)",
};
// key값은 Object.keys()메서드를 사용해서 사용하나
// value값은 사용하지 않는다. 단지, DB에서 어떤 DataType으로 선언되었는지 명시할 뿐이다.

const columns = Object.keys(userCertificationColumns).join(",");
// userCertification의 모든 column 값을 문자열로 만들어서 , 생성 및 수정에 사용함

class UserCertification {
    static createRefreshToken(userId, refreshToken) {
        // user id 이용 , refresh_token 생성
        const parameterArray = [userId, refreshToken, 1];
        const questionMark = parameterArray.map(() => "?").join(", ");

        const sql = `INSERT INTO user_certification (${columns}) VALUES (${questionMark})`;
        const result = db.execute(sql, parameterArray);

        return result;
    }

    static getRefreshToken(userId) {
        // user id 이용 , refresh_token 탐색
        const sql = `SELECT refresh_token FROM user_certification where id=?`;
        const rows = db.execute(sql, [userId]);

        return rows;
    }

    static updateRefreshToken(userId, refreshToken) {
        // user id 이용 , refresh_token 업데이트
        const sql = `UPDATE user_certification SET refresh_token = ?  where id=?`;
        const result = db.execute(sql, [refreshToken, userId]);

        return result;
    }

    static delete(userId) {
        // user id 이용 , Tuple(가로 행) 삭제
        const sql = `DELETE FROM user_certification where id=?`;
        const result = db.execute(sql, [userId]);

        return result;
    }
}

export default UserCertification;
