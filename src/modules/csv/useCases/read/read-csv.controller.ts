import { Request, Response } from "express";
import { ReadCSVUseCase } from "./read-csv.usecase";

export class ReadCSVController {
  constructor(private readCsvUseCase = new ReadCSVUseCase()) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const filters = request.query;

    const data = await this.readCsvUseCase.read(filters);

    return response.json(data);
  }
}
