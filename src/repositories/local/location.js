import DB from "./index.js";
import { generateId } from "../../util.js";

const create = async ({ name }) => {
  // TODO: validate input
  const data = {
    id: generateId(),
    name,
  };

  DB.data.location.push(data);
  DB.write();

  return data;
};

const findById = async (id) => DB.data.location.find((x) => x.id === id);

export default {
  create,
  findById,
};
