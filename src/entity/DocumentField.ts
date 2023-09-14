import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { TemplateField } from "./TemplateField";
import { Document } from "./Document";
import { FieldType } from "../interfaces";

@Entity("documentFields")
export class DocumentField {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  value: string;

  @Column()
  documentId: number;

  @ManyToOne(() => Document, (document) => document.documentFields)
  document: Document;
}
