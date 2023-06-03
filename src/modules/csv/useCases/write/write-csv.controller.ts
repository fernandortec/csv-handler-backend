import e, { Request, Response } from "express";
import { WriteCSVUseCase } from "./write-csv.usecase";

export class WriteCSVController {
  constructor(private writeCsvUseCase = new WriteCSVUseCase()) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const file = request.file;

    try {
      const fileInsertionStatus = await this.writeCsvUseCase.write(file);

      return response.json({ message: fileInsertionStatus });
    } catch {
      return response.status(422).json({ message: 'Error while inserting file, please try again' });
    }
  }
}
