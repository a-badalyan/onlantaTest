import { HttpError } from "routing-controllers";
import { DocumentField, FieldType, TemplateField } from "./interfaces";

export default function checkDocumentMatchTemplate({
  templateFields,
  documentFields,
}: {
  templateFields: Array<TemplateField>;
  documentFields: Array<DocumentField>;
}) {
  if (templateFields.length !== documentFields.length)
    return new HttpError(400, "Missing template required fields");

  documentFields.forEach((df) => {
    const templateField = templateFields.find((tf) => tf.name === df.name);

    if (!templateField)
      return new HttpError(400, "Document field and template field mismatch");

    if (
      templateField.type === FieldType.date &&
      !isNaN(Date.parse(String(df.value)))
    )
      return;

    if (typeof df.value !== templateField.type)
      return new HttpError(400, `Field ${df.name} mismatch template type`);
  });
}
