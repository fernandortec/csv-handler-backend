import { parse } from "csv-parse";
import { createReadStream } from "fs";
import path from "path";

type Object = { [key: string]: any };

export const filterData = async (filters: Object, data: any[]) => {
  const results: string[] = [];

  if (Object.keys(filters).length === 0) return data.slice(1);

  data.forEach((column) => {
    column.some((r) => {
      if (Object.values(filters).includes(r)) results.push(column);
    });
  });

  return results;
};

export const parseCsv = (fileName: string = "data.csv"): Promise<Object[]> => {
  return new Promise((resolve, reject) => {
    const result: Object[] = [];

    const stream = createReadStream(path.resolve("src", "uploads", fileName));
    const parser = parse();

    stream.pipe(parser);

    parser
      .on("data", (data: Object) => result.push(data))
      .on("end", () => resolve(result))
      .on("error", (error) => reject(error));
  });
};
