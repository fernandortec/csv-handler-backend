export class CSVFilters {
  filterByColumn(
    filters: { [key: string]: any },
    data: string[][]
  ): string[][] {
    if (Object.keys(filters).length === 0) return data.slice(1);

    const results: string[][] = [];

    data.forEach((column) => {
      if (column.some((r) => Object.values(filters).includes(r))) {
        results.push(column);
      }
    });

    return results;
  }
}
