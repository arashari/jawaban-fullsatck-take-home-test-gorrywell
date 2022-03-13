import { LowSync, JSONFileSync } from "lowdb";

const adapter = new JSONFileSync("db.json");
const db = new LowSync(adapter);

await db.read();
db.data = db.data || {
  event: [],
  location: [],
  transaction: [],
};

export default db;
