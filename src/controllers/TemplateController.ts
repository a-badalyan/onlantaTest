import {
  Post,
  Body,
  Get,
  Param,
  JsonController,
  HttpError,
} from "routing-controllers";
import { CreateTemplateBody, TemplateType } from "../interfaces";
import createTemplateHandler from "../handlers/createTemplateHandler";
import getTemplateHandler from "../handlers/getTemplateHandler";

@JsonController("/template")
export default class TemplateController {
  @Post()
  async createTemplate(
    @Body() body: CreateTemplateBody
  ): Promise<TemplateType> {
    const template = await createTemplateHandler(body);

    return template.prepareTemplate();
  }

  @Get("/:id")
  async getTemplate(@Param("id") id: number): Promise<TemplateType> {
    const template = await getTemplateHandler(id);

    if (!template) throw new HttpError(404);

    return template.prepareTemplate();
  }
}
