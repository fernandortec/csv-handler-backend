export interface CSVRepository {
  write(file: Express.Request['file']): Promise<string>;
  read(fileName?: string): Promise<string[][]>;
}
