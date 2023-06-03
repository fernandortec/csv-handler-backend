import { CSVFilters } from "../helpers/csv-filters";

describe("CSV Filters", () => {
  let csvFilters: CSVFilters;

  beforeAll(() => {
    csvFilters = new CSVFilters();
  });

  it("filterByColumn return all rows but the first, if filters are empty", () => {
    const data = [
      ["Name", "Age"],
      ["John", "25"],
      ["Jane", "30"],
    ];

    const result = csvFilters.filterByColumn({}, data);

    expect(result).toEqual([
      ["John", "25"],
      ["Jane", "30"],
    ]);
  });

  it("filterByColumn filter rows by provided filters", () => {
    const data = [
      ["Name", "Age"],
      ["John", "25"],
      ["Jane", "30"],
    ];

    const filter = { Name: "John" };

    const result = csvFilters.filterByColumn(filter, data);

    expect(result).toEqual([["John", "25"]]);
  });

  it("filterByColumn returns empty if no rows match the filters", () => {
    const data = [
      ["Name", "Age", "Id"],
      ["Greta", "16", "1003"],
      ["Jane", "30", "2093"],
    ];

    const filter = { Id: "9080" };

    const result = csvFilters.filterByColumn(filter, data);

    expect(result).toEqual([]);
  });

  it("filterByColumn should return multiple values if multiple filters match", () => {
    const data = [
      ["Name", "Age", "Id"],
      ["Greta", "16", "1003"],
      ["Jane", "30", "2093"],
      ["Marcus", "25", "0012"],
    ];

    const filters = { Id: "0012", Name: "Greta" };

    const result = csvFilters.filterByColumn(filters, data);

    expect(result).toEqual([
      ["Greta", "16", "1003"],
      ["Marcus", "25", "0012"],
    ]);
  });

  it("filterByCollumn returns all of the data if all filters match", () => {
    const data = [
      ["Name", "Age"],
      ["Greta", "16"],
      ["Jane", "30"],
    ];

    const filters = { Name: "Greta", Age: "30" };

    const result = csvFilters.filterByColumn(filters, data);

    expect(result).toEqual([
      ["Greta", "16"],
      ["Jane", "30"],
    ]);
  });

  it("filterByColumn should filter only by the object values", () => {
    const data = [
      ["Name", "Age"],
      ["Greta", "16"],
      ["Jane", "30"],
    ];

    const filters = { a: "Greta", b: "30" };

    const result = csvFilters.filterByColumn(filters, data);

    expect(result).toEqual([
      ["Greta", "16"],
      ["Jane", "30"],
    ]);
  });
});
