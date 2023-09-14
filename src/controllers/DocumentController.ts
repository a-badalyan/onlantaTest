import {
  Post,
  Body,
  Get,
  Param,
  JsonController,
  HttpError,
} from "routing-controllers";
import { CreateDocumentBody, DocumentType } from "../interfaces";
import createDocumentHandler from "../handlers/createDocumentHandler";
import getDocumentHandler from "../handlers/getDocumentHandler";

@JsonController("/document")
export default class DocumentController {
  @Post()
  async createDocument(
    @Body() body: CreateDocumentBody
  ): Promise<DocumentType> {
    const document = await createDocumentHandler(body);

    return document.prepareDocument();
  }

  @Get("/:id")
  async getDocument(@Param("id") id: number): Promise<DocumentType> {
    const document = await getDocumentHandler(id);

    if (!document) throw new HttpError(404);

    return document.prepareDocument();
  }
}
