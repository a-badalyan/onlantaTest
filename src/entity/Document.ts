import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Template } from "./Template";
import { DocumentField } from "./DocumentField";
import { DocumentType, FieldType } from "../interfaces";

@Entity("documents")
export class Document {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  templateId: number;

  @ManyToOne(() => Template, (template) => template.fields)
  template: Template;

  @OneToMany(() => DocumentField, (documentField) => documentField.document, {
    cascade: true,
  })
  documentFields: Array<DocumentField>;

  prepareDocument(): DocumentType {
    return {
      id: this.id,
      name: this.name,
      template: {
        id: this.template.id,
        name: this.template.name,
      },
      attributeFields: this.documentFields.map(({ value, name }) => {
        const valueType = this.template.fields.find(
          (f) => f.name === name
        ).type;

        return {
          name,
          value: valueType === FieldType.number ? Number(value) : value,
        };
      }),
    };
  }
}
