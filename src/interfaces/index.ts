import {
  IsEnum,
  IsNumber,
  IsString,
  IsArray,
  IsObject,
  ValidateNested,
  IsDefined,
} from "class-validator";
import { Type } from "class-transformer";

export enum FieldType {
  string = "string",
  date = "date",
  number = "number",
}

export class TemplateField {
  @IsString()
  name: string;

  @IsEnum(FieldType)
  type: FieldType;
}

export class DocumentField {
  @IsString()
  name: string;

  @IsDefined()
  value: string | number | Date;
}

export class Template {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TemplateField)
  attributeFields: Array<TemplateField>;
}

export class Document {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DocumentField)
  attributeFields: Array<DocumentField>;
}

export class CreateTemplateBody {
  @IsString()
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TemplateField)
  attributeFields: Array<TemplateField>;
}

export class CreateTemplateResponse extends Template {}

export class CreateDocumentBody {
  @IsString()
  name: string;

  @IsNumber()
  template: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DocumentField)
  attributeFields: Array<DocumentField>;
}

export class TemplateInfo {
  @IsNumber()
  id: number;

  @IsString()
  name: string;
}
