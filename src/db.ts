import "reflect-metadata";
import { DataSource } from "typeorm";
import { Template } from "./entities/Template";
import { Document } from "./entities/Document";
import { TemplateField } from "./entities/TemplateField";
import { DocumentField } from "./entities/DocumentField";
import { POSTGRES_URI } from "../config";
import { Initial1694623701960 } from "./migrations/1694623701960-initial";

const db = new DataSource({
  type: "postgres",
  url: POSTGRES_URI,
  entities: [Template, Document, TemplateField, DocumentField],
  migrations: [Initial1694623701960],
  subscribers: [],
  migrationsRun: true,
});

export default db;
