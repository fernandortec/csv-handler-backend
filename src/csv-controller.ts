import { Request, Response, request } from "express";

export class CSVRepository {
  write() {}
  read() {}
}

export class CSVController {
  async write(request: Request, response: Response): Promise<Response> {
    const something = request.file;

    if(!request.file) throw new Error('Please insert file.')

    return response.json('a');
  }

  async read(request: Request, response: Response): Promise<Response> {
    return response.json();
  }
}
