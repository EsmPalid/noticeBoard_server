import cors from "cors";

const whitelist = [
  "http://localhost:3000",
  "http://localhost:8080",
  "http://localhost:9000",
  "http://localhost",
  undefined,
];

const corsOption = {
  origin: (origin, cb) => {
    if (whitelist.indexOf(origin) !== -1) {
      cb(null, true);
    } else {
      console.log(origin);
      cb(new Error("Not Allowed Orgin"));
    }
  },
  credentials: true,
};

const coreMiddleware = cors(corsOption);

export default coreMiddleware;
