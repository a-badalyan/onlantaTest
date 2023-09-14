import {
  Post,
  Body,
  Get,
  Param,
  JsonController,
  HttpError,
} from "routing-controllers";
import { CreateTemplateBody } from "../interfaces";
import createTemplateHandler from "../handlers/createTemplateHandler";
import getTemplateHandler from "../handlers/getTemplateHandler";

@JsonController("/template")
export default class TemplateController {
  @Post()
  async createTemplate(@Body() body: CreateTemplateBody) {
    const template = await createTemplateHandler(body);

    return template.prepareTemplate();
  }

  @Get("/:id")
  async getTemplate(@Param("id") id: number) {
    const template = await getTemplateHandler(id);

    if (!template) return new HttpError(404);

    return template.prepareTemplate();
  }
}
