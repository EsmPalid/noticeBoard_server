import mysql from "mysql2/promise";
import { poolConfigMul } from "../config/database.js";

const pool = mysql.createPool(poolConfigMul);

const loadContent = async ({ id }) => {
    const conn = await pool.getConnection();

    console.log(id);

    try {
        const sanitizeId = conn.escape(id);
        // escape()로 문자열화한 id 값

        const [Rows] = await conn.query(
            `SELECT * FROM content where article=${sanitizeId};
            SELECT * FROM article where id=${sanitizeId}`
        );

        // console.log(Rows);

        const [contentRows] = Rows[0];
        const [articleRows] = Rows[1];

        //console.log(contentRows);
        if (contentRows !== undefined && articleRows !== undefined) {
            const result = {
                id: articleRows.id,
                content: contentRows.content,
                title: articleRows.title,
                category: articleRows.category,
                writer: articleRows.writer,
                writeDate: articleRows.write_date,
                lastEditor: articleRows.last_editor,
                views: articleRows.views,
                likes: articleRows.likes,
            };

            return result;
        } else {
            return false;
        }
    } catch (err) {
        console.error(err);
        return false;
    } finally {
        conn.release();
    }
};

export { loadContent };
