import {
  Post,
  Body,
  Get,
  Param,
  JsonController,
  Res,
  HttpError,
} from "routing-controllers";
import { CreateDocumentBody } from "../interfaces";
import createDocumentHandler from "../handlers/createDocumentHandler";
import getDocumentHandler from "../handlers/getDocumentHandler";
import { Response } from "express";

@JsonController("/document")
export default class DocumentController {
  @Post()
  async createDocument(@Body() body: CreateDocumentBody, @Res() res: Response) {
    const document = await createDocumentHandler(body);

    res.status(200).json(document.prepareDocument());
  }

  @Get("/:id")
  async getDocument(@Param("id") id: number, @Res() res: Response) {
    const document = await getDocumentHandler(id);

    if (!document) return new HttpError(404);

    res.status(200).json(document.prepareDocument());
  }
}
