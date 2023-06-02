import { Request, Response, request } from "express";
import { parseCsv } from "./csv-parse";

export class CSVRepository {
  write() {}
  read() {}
}

export class CSVController {
  async write(request: Request, response: Response): Promise<Response> {
    const file = request.file;
    if (!file) throw new Error("Please insert file.");

    return response.status(200).json({ message: "File inserted successfully" });
  }

  async read(request: Request, response: Response): Promise<Response> {
    const comsething = parseCsv('data.csv');
    console.log(comsething)
    return response.json("request.fileName");
  }
}
