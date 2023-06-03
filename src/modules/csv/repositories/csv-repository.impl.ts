import { parse } from "csv-parse";
import { createReadStream } from "fs";
import path from "path";
import { CSVRepository } from "./csv-repository.types";

export class CSVRepositoryImpl implements CSVRepository {
  async read(fileName: string): Promise<string[][]> {
    return new Promise((resolve, reject) => {
      const result: string[][] = [];

      const stream = createReadStream(path.resolve("src", "uploads", fileName));
      const parser = parse();

      stream.pipe(parser);

      parser
        .on("data", (data: string[]) => result.push(data))
        .on("end", () => resolve(result))
        .on("error", (error) => reject(error));
    });
  }

  async write(file: Express.Request["file"]): Promise<string> {
    if (!file) throw new Error("Please insert file.");

    return "File inserted successfully!";
  }
}
