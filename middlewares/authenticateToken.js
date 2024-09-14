import jwt from "jsonwebtoken";
import { accessTokenSecreKey } from "../services/tokenService.js";

const authenticateToken = (req, res, next) => {
  // 권한이 필요한 Path(경로)에 Middleware로써 사용해야함
  // authenticate , 인증하다
  // authorization , 권한 부여

  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, accessTokenSecreKey, (err) => {
    if (err) {
      res.sendStatus(401);
    } else {
      next();
    }
  });
};

export default authenticateToken;
