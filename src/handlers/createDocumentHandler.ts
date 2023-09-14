import checkDocumentMatchTemplate from "../checkDocumentMatchTemplate";
import db from "../db";
import { Document } from "../entity/Document";
import { DocumentField } from "../entity/DocumentField";
import { Template } from "../entity/Template";
import { CreateDocumentBody } from "../interfaces";

export default async function createDocumentHandler(
  params: CreateDocumentBody
): Promise<Document | null> {
  const template = await db
    .getRepository(Template)
    .createQueryBuilder("template")
    .leftJoinAndSelect("template.fields", "field")
    .where("template.id = :id", { id: params.template })
    .getOne();

  checkDocumentMatchTemplate({
    templateFields: template.fields,
    documentFields: params.attributeFields,
  });

  const document = new Document();
  document.name = params.name;
  document.templateId = params.template;
  document.documentFields = [];

  params.attributeFields.forEach((attr) => {
    const field = new DocumentField();

    field.name = attr.name;
    field.value = String(attr.value);

    document.documentFields.push(field);
  });

  const insertedDocument = await db.getRepository(Document).save(document);

  return db
    .getRepository(Document)
    .createQueryBuilder("document")
    .leftJoinAndSelect("document.documentFields", "documentField")
    .leftJoinAndSelect("document.template", "template")
    .leftJoinAndSelect("template.fields", "field")
    .where("document.id = :id", { id: insertedDocument.id })
    .getOne();
}
