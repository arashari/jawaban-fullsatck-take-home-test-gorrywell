import DB from "./index.js";
import LocationRepo from "./location.js";
import { generateId } from "../../util.js";

const create = async ({ name, startDate, endDate, locationId }) => {
  // TODO: validating input

  const event = {
    id: generateId(),
    name,
    startDate, // YYYY-MM-DD HH:mm:ss
    endDate, // YYYY-MM-DD HH:mm:ss
    locationId,
    tickets: [],
  };

  DB.data.event.push(event);
  DB.write();

  return event;
};

const createTicket = async ({ name, quota, price, eventId }) => {
  const event = await findById(eventId);
  if (!event) {
    throw new Error("event not found");
  }

  const ticket = {
    id: generateId(),
    name,
    quota,
    initialQuota: quota,
    price,
  };

  event.tickets.push(ticket);
  DB.write();

  return ticket;
};

const findById = async (id) => DB.data.event.find((x) => x.id === id);

const joinWithLocation = async (event) => {
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
