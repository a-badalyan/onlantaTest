import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Template } from "./Template";
import { FieldType } from "../interfaces";

@Entity("templateFields")
export class TemplateField {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: FieldType;

  @Column()
  templateId: number;

  @ManyToOne(() => Template, (template) => template.fields)
  template: Template;
}
