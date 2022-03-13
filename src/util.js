import crypto from "crypto";
import { parse, isMatch, isBefore } from "date-fns";

const generateId = () => crypto.randomUUID();
const isValidEventDate = (str) => {
  if (!isMatch(str, "yyyy-MM-dd HH:mm:ss")) {
    return false;
  }

  return true;
};
const isBeforeEventDate = (start, end) => {
  return isBefore(
    parse(start, "yyyy-MM-dd HH:mm:ss", new Date()),
    parse(end, "yyyy-MM-dd HH:mm:ss", new Date())
  );
};

export { generateId, isValidEventDate, isBeforeEventDate };
