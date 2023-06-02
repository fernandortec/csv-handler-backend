import console from "console";
import { parse } from "csv-parse";
import { createReadStream, readFile, readFileSync } from "fs";
import { resolve } from "path";

const results: any[] = [];

const parser = parse(
  { columns: true },
  (err, records: { [key: string]: string }[]) => {
    if (err) throw new Error("Couldn't read file, please try again");

    const filters = ["Basketball"];

    records.forEach((record) => {
      Object.values(record).forEach((value) => {
        if (filters.includes(value)) results.push(record);
      });
    });
  }
);

const result: any = [];

export const parseCsv = (fileName: string) => {
  createReadStream(resolve("src", "uploads", fileName))
    .pipe(parser)
    .on("data", (data) => {
      result.push(data);
    })
    .on("end", () => {
      return result;
    });
};
