import {
  Post,
  Body,
  Get,
  Param,
  JsonController,
  Res,
  HttpError,
} from "routing-controllers";
import { CreateTemplateBody } from "../interfaces";
import createTemplateHandler from "../handlers/createTemplateHandler";
import getTemplateHandler from "../handlers/getTemplateHandler";
import { Response } from "express";

@JsonController("/template")
export default class TemplateController {
  @Post()
  async createTemplate(
    @Body() body: CreateTemplateBody,
    @Res() res: Response
  ): Promise<void> {
    const template = await createTemplateHandler(body);

    res.status(200).json(template.prepareTemplate());
  }

  @Get("/:id")
  async getTemplate(
    @Param("id") id: number,
    @Res() res: Response
  ): Promise<void> {
    const template = await getTemplateHandler(id);

    if (!template) throw new HttpError(404);

    res.status(200).json(template.prepareTemplate());
  }
}
