import { Router } from "express";
import multer from "multer";
import { multerConfig } from "../../config/multer";
import { WriteCSVController } from "./useCases/write/write-csv.controller";
import { ReadCSVController } from "./useCases/read/read-csv.controller";

const upload = multer(multerConfig);
export const csvRouter = Router();

const writeCsvController = new WriteCSVController();
const readCsvController = new ReadCSVController();

csvRouter.post("/api/files", upload.single("file"), writeCsvController.handle.bind(writeCsvController));
csvRouter.get("/api/users", readCsvController.handle.bind(readCsvController));
