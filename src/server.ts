import express, { json } from "express";
import cors from "cors";
import { csvRouter } from "./modules/csv/csv-router";

const app = express();

app.use(json());
app.use(cors());
app.use(csvRouter);

app.listen(process.env.PORT || 3001);

export { app };
