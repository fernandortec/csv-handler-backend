import { CSVRepositoryImpl } from "../../repositories/csv-repository.impl";

export class WriteCSVUseCase {
  constructor(private csvRepository = new CSVRepositoryImpl()) {}

  async write(file: Express.Request["file"]): Promise<string> {
    const fileInsertionStatus = this.csvRepository.write(file);

    return fileInsertionStatus;
  }
}
