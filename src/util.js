import crypto from "crypto";
import { isMatch } from "date-fns";

const generateId = () => crypto.randomUUID();
const isValidEventDate = (str) => {
  if (!isMatch(str, "yyyy-MM-dd HH:mm:ss")) {
    return false;
  }

  return true;
};

export { generateId, isValidEventDate };
