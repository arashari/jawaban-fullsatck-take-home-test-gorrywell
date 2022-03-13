import DB from "./index.js";
import LocationRepo from "./location.js";
import { generateId } from "../../util.js";

const create = async ({ name, startDate, endDate, locationId }) => {
  // TODO: validating input

  const data = {
    id: generateId(),
    name,
    startDate, // YYYY-MM-DD HH:mm:ss
    endDate, // YYYY-MM-DD HH:mm:ss
    locationId,
    tickets: [],
  };

  DB.data.event.push(data);
  DB.write();

  return data;
};

const createTicket = async () => {};

const findById = async (id) => DB.data.event.find((x) => x.id === id);

const joinWithLocation = async (event) => {
  // TODO: use functional programming to make it beautiful and elegant

  const location = await LocationRepo.findById(event.locationId);
  const _event = { ...event, location };
  delete _event.locationId;

  return _event;
};

export default {
  create,
  createTicket,
  findById,
  joinWithLocation,
};
