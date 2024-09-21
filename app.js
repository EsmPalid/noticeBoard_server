import express from "express";
import { swaggerUi, specs } from "./swagger/config.js";
import path from "path";
import bodyParser from "body-parser";
import fsNoPromise from "fs";
import cookieParser from "cookie-parser";
import corsMiddleware from "./middlewares/corsMiddleware.js";
import authenticateToken from "./middlewares/authenticateToken.js";
import publicRouter from "./routes/publicRouter.js";

const app = express();
const port = 8080;
const fs = fsNoPromise.promises;
const __dirname = path.resolve();

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(corsMiddleware);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/api/public", publicRouter);
app.use("/api/user", authenticateToken);
// app.use("/api/admin")

app.use((req, res, next) => {
    res.status(404).send("Not Found");
});

app.listen(port, "0.0.0.0", () => {
    console.log("Server listening");
});
