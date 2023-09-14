import {
  Post,
  Body,
  Get,
  Param,
  JsonController,
  HttpError,
} from "routing-controllers";
import { CreateDocumentBody } from "../interfaces";
import createDocumentHandler from "../handlers/createDocumentHandler";
import getDocumentHandler from "../handlers/getDocumentHandler";

@JsonController("/document")
export default class DocumentController {
  @Post()
  async createDocument(@Body() body: CreateDocumentBody) {
    const document = await createDocumentHandler(body);

    return document.prepareDocument();
  }

  @Get("/:id")
  async getDocument(@Param("id") id: number) {
    const document = await getDocumentHandler(id);

    if (!document) return new HttpError(404);

    return document.prepareDocument();
  }
}
