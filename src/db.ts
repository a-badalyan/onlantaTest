import "reflect-metadata";
import { DataSource } from "typeorm";
import { Template } from "./entity/Template";
import { Document } from "./entity/Document";
import { TemplateField } from "./entity/TemplateField";
import { DocumentField } from "./entity/DocumentField";
import { POSTGRES_URI } from "../config";
import { Initial1694623701960 } from "./migration/1694623701960-initial";

const db = new DataSource({
  type: "postgres",
  url: POSTGRES_URI,
  entities: [Template, Document, TemplateField, DocumentField],
  migrations: [Initial1694623701960],
  subscribers: [],
  migrationsRun: true,
});

export default db;
