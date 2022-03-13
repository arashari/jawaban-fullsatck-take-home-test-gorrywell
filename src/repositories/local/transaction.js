import DB from "./index.js";

import EventRepo from "./event.js";
import { generateId } from "../../util.js";

const create = async ({ customerName, customerEmail, eventId, tickets }) => {
  // TODO: validasi input

  const event = await EventRepo.findById(eventId);

  if (!event) {
    throw new Error("event not found");
  }

  const _event = JSON.parse(
    JSON.stringify(await EventRepo.joinWithLocation(event))
  ); // get the plain copy

  // naive transactional implementation
  const dbCopy = { ...DB.data };
  try {
    const transaction = {
      id: generateId(),
      customerName,
      customerEmail,
      event: _event,
      tickets: [],
    };

    for (let i = 0; i < tickets.length; i++) {
      const t = tickets[i];
      const ticket = event.tickets.find((x) => x.id === t.id);

      if (!ticket) {
        throw new Error("ticket not found");
      }

      if (ticket.quota < t.quantity) {
        throw new Error("ticket quota exceeded");
      }

      transaction.tickets.push({
        ticketId: ticket.id,
        name: ticket.name,
        price: ticket.price,
        quantity: t.quantity,
        total: ticket.price * t.quantity,
      });

      ticket.quota = ticket.quota - t.quantity;
    }

    DB.data.transaction.push(transaction);
    DB.write();

    return transaction;
  } catch (err) {
    // naive transactional implementation
    DB.data = dbCopy;
    DB.write();

    throw err;
  }
};

const findById = async (id) => DB.data.transaction.find((x) => x.id === id);

export default {
  create,
  findById,
};
