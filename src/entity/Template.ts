import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { TemplateField } from "./TemplateField";

@Entity("templates")
export class Template {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => TemplateField, (field) => field.template, { cascade: true })
  fields: Array<TemplateField>;

  prepareTemplate() {
    return {
      id: this.id,
      name: this.name,
      attributeFields: this.fields.map((field) => {
        return {
          name: field.name,
          type: field.type,
        };
      }),
    };
  }
}
