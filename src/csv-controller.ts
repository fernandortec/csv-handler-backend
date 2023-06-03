import { Request, Response, request } from "express";
import { filterData, parseCsv } from "./csv-parse";
export class CSVController {
  async write(request: Request, response: Response): Promise<Response> {
    const file = request.file;
    if (!file) throw new Error("Please insert file.");

    return response.status(200).json({ message: "File inserted successfully" });
  }

  async read(request: Request, response: Response): Promise<Response> {
    const csvData = await parseCsv();
    const filteredData = await filterData(request.query, csvData);

    return response.json(filteredData);
  }
}
