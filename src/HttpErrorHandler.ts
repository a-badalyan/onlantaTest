import { Request, Response } from "express";
import {
  Middleware,
  ExpressErrorMiddlewareInterface,
  HttpError,
} from "routing-controllers";

@Middleware({ type: "after" })
export class HttpErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: unknown, _request: Request, response: Response) {
    if (error instanceof HttpError)
      return response.status(error.httpCode).json(error);

    if (error instanceof Error)
      return response.status(500).json({ message: error.message });
  }
}
