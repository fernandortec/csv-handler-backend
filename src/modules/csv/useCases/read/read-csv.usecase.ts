import { CSVFilters } from "../../../../helpers/csv-filters";
import { CSVRepositoryImpl } from "../../repositories/csv-repository.impl";

export class ReadCSVUseCase {
  constructor(
    private csvRepository = new CSVRepositoryImpl(),
    private csvFilters = new CSVFilters()
  ) {}

  async read(
    filters: { [key: string]: any },
    fileName: string = "data.csv"
  ): Promise<string[][]> {
    const data = await this.csvRepository.read(fileName);
    const filteredData = this.csvFilters.filterByColumn(filters, data);
    
    return filteredData;
  }
}
