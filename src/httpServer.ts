import express, { Application } from "express";
import {
  RoutingControllersOptions,
  useExpressServer,
} from "routing-controllers";
import TemplateController from "./controllers/TemplateController";
import { HttpErrorHandler } from "./errorMiddleware";
import DocumentController from "./controllers/DocumentController";

const controllersOptions: RoutingControllersOptions = {
  controllers: [TemplateController, DocumentController],
  validation: true,
  classTransformer: true,
  defaultErrorHandler: false,
  middlewares: [HttpErrorHandler],
};

export class HttpServer {
  expressApp: Application;
  port: number;

  constructor({ port }: { port: number }) {
    this.expressApp = express();
    this.port = port;
  }

  async start(): Promise<void> {
    this.expressApp.listen(this.port, "0.0.0.0");
    console.log("server_started");

    useExpressServer(this.expressApp, controllersOptions);
  }
}
