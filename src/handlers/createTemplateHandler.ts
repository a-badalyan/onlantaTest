import db from "../db";
import { Template } from "../entity/Template";
import { TemplateField } from "../entity/TemplateField";
import { CreateTemplateBody } from "../interfaces";

export default async function createTemplateHandler(
  params: CreateTemplateBody
): Promise<Template> {
  const template = new Template();

  template.name = params.name;
  template.fields = [];

  params.attributeFields.forEach((attr) => {
    const field = new TemplateField();

    field.name = attr.name;
    field.type = attr.type;

    template.fields.push(field);
  });

  return db.getRepository(Template).save(template);
}
