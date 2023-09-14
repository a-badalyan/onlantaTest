import db from "../db";
import { Template } from "../entities/Template";

export default async function getTemplateHandler(
  id: number
): Promise<Template | null> {
  return db
    .getRepository(Template)
    .createQueryBuilder("template")
    .leftJoinAndSelect("template.fields", "field")
    .where("template.id = :id", { id })
    .getOne();
}
