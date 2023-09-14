import db from "../db";
import { Document } from "../entity/Document";

export default async function getDocumentHandler(
  id: number
): Promise<Document> {
  return db
    .getRepository(Document)
    .createQueryBuilder("document")
    .leftJoinAndSelect("document.documentFields", "documentField")
    .leftJoinAndSelect("document.template", "template")
    .leftJoinAndSelect("template.fields", "field")
    .where("document.id = :id", { id })
    .getOne();
}
