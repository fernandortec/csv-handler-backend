import express, { json } from "express";

const app = express();

app.use(json())
app.listen(process.env.PORT || 3000, () => console.log("server is listening"));

export { app };
