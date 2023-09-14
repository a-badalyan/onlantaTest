import * as env from "env-var";

export const POSTGRES_URI = env.get("POSTGRES_URI").required().asString();
export const PORT = env.get("PORT").required().asInt();
