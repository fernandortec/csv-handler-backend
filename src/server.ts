import express, { json } from "express";
import { csvRouter } from "./csv-router";
import cors from 'cors'

const app = express();

app.use(json());
app.use(cors())
app.use(csvRouter);

app.listen(process.env.PORT || 3001);

export { app };
