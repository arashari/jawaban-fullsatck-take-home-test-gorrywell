import BusinessError from "./models/BusinessError.js";
import { isValidEventDate } from "./util.js";

const createLocation = (params) => {
  const { name } = params;

  if (!name) {
    throw new BusinessError(422, "`name` is required");
  }
};

const getLocation = (params) => {
  const { id } = params;

  if (!id) {
    throw new BusinessError(422, "`id` is required");
  }
};

const purchase = (params) => {
  const { customerName, customerEmail, eventId, tickets } = params;

  if (!customerName) {
    throw new BusinessError(422, "`customerName` is required");
  }

  if (!customerEmail) {
    throw new BusinessError(422, "`customerEmail` is required");
  }

  if (!eventId) {
    throw new BusinessError(422, "`eventId` is required");
  }

  if (!tickets) {
    throw new BusinessError(422, "`tickets` is required");
  }

  if (!Array.isArray(tickets)) {
    throw new BusinessError(422, "`tickets` must be an array");
  }

  if (!tickets.length > 0) {
    throw new BusinessError(
      422,
      "`tickets` must be contain at least one ticket"
    );
  }

  for (let i = 0; i < tickets.length; i++) {
    const { id, quantity } = tickets[i];

    if (!id) {
      throw new BusinessError(422, "`tickets` must be contain Ticket object");
    }

    if (!quantity) {
      throw new BusinessError(422, "`tickets` must be contain Ticket object");
    }

    if (typeof quantity !== "number") {
      throw new BusinessError(422, "`tickets` must be contain Ticket object");
    }

    if (!Number.isInteger(quantity)) {
      throw new BusinessError(422, "`tickets` must be contain Ticket object");
    }

    if (!(quantity > 0)) {
      throw new BusinessError(
        422,
        "`tickets` must be contain Ticket with positive quantity"
      );
    }
  }
};

const getInfoTransaction = (params) => {
  const { id } = params;

  if (!id) {
    throw new BusinessError(422, "`id` is required");
  }
};

const createEvent = (params) => {
  const { name, startDate, endDate, locationId } = params;

  if (!name) {
    throw new BusinessError(422, "`name` is required");
  }

  if (!locationId) {
    throw new BusinessError(422, "`locationId` is required");
  }

  if (!startDate) {
    throw new BusinessError(422, "`startDate` is required");
  }

  if (!isValidEventDate(startDate)) {
    throw new BusinessError(
      422,
      "`startDate` wrong format (expected: YYYY-MM-DD HH:mm:ss)"
    );
  }

  if (!endDate) {
    throw new BusinessError(422, "`endDate` is required");
  }

  if (!isValidEventDate(endDate)) {
    throw new BusinessError(
      422,
      "`endDate` wrong format (expected: YYYY-MM-DD HH:mm:ss)"
    );
  }
};

const createTicket = (params) => {
  const { name, quota, price, eventId } = params;

  if (!name) {
    throw new BusinessError(422, "`name` is required");
  }

  if (!eventId) {
    throw new BusinessError(422, "`eventId` is required");
  }

  if (!quota) {
    throw new BusinessError(422, "`quota` is required");
  }

  if (typeof quota !== "number") {
    throw new BusinessError(422, "`quota` must be an integer");
  }

  if (!Number.isInteger(quota)) {
    throw new BusinessError(422, "`quota` must be an integer");
  }

  if (!(quota >= 0)) {
    throw new BusinessError(422, "`quota` must be at least 0");
  }

  if (!price) {
    throw new BusinessError(422, "`price` is required");
  }

  if (typeof price !== "number") {
    throw new BusinessError(422, "`price` must be an integer");
  }

  if (!Number.isInteger(price)) {
    throw new BusinessError(422, "`price` must be an integer");
  }

  if (!(price >= 0)) {
    throw new BusinessError(422, "`price` must be at least 0");
  }
};

const getInfoTicket = (params) => {
  const { id } = params;

  if (!id) {
    throw new BusinessError(422, "`id` is required");
  }
};

export default {
  createLocation,
  getLocation,
  purchase,
  getInfoTransaction,
  createEvent,
  createTicket,
  getInfoTicket,
};
