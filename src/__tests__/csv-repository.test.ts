import fs, { createReadStream } from "fs";
import { CSVRepositoryImpl } from "../modules/csv/repositories/csv-repository.impl";
import { CSVRepository } from "../modules/csv/repositories/csv-repository.types";
import { PassThrough, Readable } from "stream";
import path from "path";

describe("Csv repository", () => {
  let csvRepository: CSVRepository;

  beforeAll(() => {
    csvRepository = new CSVRepositoryImpl();
  });

  describe("Read", () => {
    it("should read and parse the CSV file", async () => {
      const fileName = path.resolve("src", "uploads", "data.csv");

      const readStreamSpy = jest
        .spyOn(fs, "createReadStream")
        .mockReturnValue(createReadStream(fileName));
      const readSpy = jest.spyOn(csvRepository, "read").mockResolvedValueOnce([
        ["Name", "Age"],
        ["Biscuits", "10"],
        ["Morbius", "130"],
      ]);

      const result = await csvRepository.read(fileName);

      expect(readStreamSpy).toBeCalled();
      expect(readSpy).toBeCalled();

      expect(result).toEqual([
        ["Name", "Age"],
        ["Biscuits", "10"],
        ["Morbius", "130"],
      ]);
    });

    it("read rejects with an error if there is an error reading the file", async () => {
      const fileName = "data.csv";
      const expectedError = new Error("File read error");

      jest.spyOn(fs, "createReadStream").mockImplementationOnce(() => {
        throw expectedError;
      });

      await expect(csvRepository.read(fileName)).rejects.toThrow(expectedError);
    });

    it("should throw error if file doesn't exists", async () => {
      const fileName = "not-a-file.csv";
      const expectedError = new Error("File doesn't exists");

      await expect(csvRepository.read(fileName)).rejects.toThrow(expectedError);
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });
  });

  describe("write", () => {
    it("should return success message when a file is provided", async () => {
      const file: Express.Request["file"] = {
        originalname: "example.csv",
        mimetype: "text/csv",
        buffer: Buffer.from("Name,Age\nJohn,25\nJane,30"),
        destination: "",
        fieldname: "",
        filename: "",
        path: "",
        size: 128,
        stream: Readable.from(""),
        encoding: "",
      };

      const writeFileSyncMock = jest.spyOn(fs, "writeFileSync");

      const result = await csvRepository.write(file);

      expect(writeFileSyncMock).not.toHaveBeenCalled();
      expect(result).toBe("File inserted successfully!");
    });

    it("should throw an error when no file is provided", async () => {
      const file = null as any;

      await expect(csvRepository.write(file)).rejects.toThrow(
        "Please insert file."
      );
    });
  });
});
