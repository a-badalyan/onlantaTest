import { PORT } from "../config";
import db from "./db";

import { HttpServer } from "./httpServer";

const httpServer = new HttpServer({
  port: PORT,
});

(async () => {
  await db.initialize();
  await httpServer.start();
})();
