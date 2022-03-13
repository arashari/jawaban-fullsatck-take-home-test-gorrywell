import DB from "./index.js";
import { generateId } from "../../util.js";

const create = async ({ name, startDate, endDate, locationId }) => {
  // TODO: validating input

  DB.data.event.push({
    id: generateId(),
    name,
    startDate, // YYYY-MM-DD HH:MM:SS
    endDate, // YYYY-MM-DD HH:MM:SS
    locationId,
    tickets: [],
  });
};

const createTicket = async () => {};
const findById = async (id) => DB.data.event.find((x) => x.id === id);

export default {
  create,
  createTicket,
  findById,
};
