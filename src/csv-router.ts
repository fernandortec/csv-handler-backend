import { Router } from "express";
import { CSVController } from "./csv-controller";
import multer from "multer";
import { multerConfig } from "./config/multer";

const upload = multer(multerConfig);

const csvController = new CSVController();
export const csvRouter = Router();

csvRouter.post("/api/files", upload.single("file"), csvController.write);
csvRouter.get('/api/users', csvController.read)
