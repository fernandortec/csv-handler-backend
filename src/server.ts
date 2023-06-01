import express, { json } from "express";
import { csvRouter } from "./csv-router";

const app = express();

app.use(json());
app.use(csvRouter);

app.listen(process.env.PORT || 3000);

export { app };
