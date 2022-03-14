import BusinessError from "./models/BusinessError.js";
import { isValidEventDate, isBeforeEventDate } from "./util.js";

const createLocation = (params) => {
  const { name } = params;

  if (!name) {
    throw new BusinessError(422, "`name` is required");
  }

  if (typeof name !== "string") {
    throw new BusinessError(422, "`name` must be a string");
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

  if (typeof customerName !== "string") {
    throw new BusinessError(422, "`customerName` must be a string");
  }

  if (!customerEmail) {
    throw new BusinessError(422, "`customerEmail` is required");
  }

  if (typeof customerEmail !== "string") {
    throw new BusinessError(422, "`customerEmail` must be a string");
  }

  if (!eventId) {
    throw new BusinessError(422, "`eventId` is required");
  }

  if (typeof eventId !== "string") {
    throw new BusinessError(422, "`eventId` must be a string");
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
      throw new BusinessError(422, "`tickets.id` is required");
    }

    if (typeof id !== "string") {
      throw new BusinessError(422, "`tickets.id` must be string");
    }

    if (!quantity) {
      throw new BusinessError(422, "`tickets.quantity` is required");
    }

    if (typeof quantity !== "number") {
      throw new BusinessError(422, "`tickets.quantity` must be an integer");
    }

    if (!Number.isInteger(quantity)) {
      throw new BusinessError(422, "`tickets.quantity` must be an integer");
    }

    if (!(quantity > 0)) {
      throw new BusinessError(
        422,
        "`tickets.quantity` must be a positive amount"
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

  if (typeof name !== "string") {
    throw new BusinessError(422, "`name` must be a string");
  }

  if (!locationId) {
    throw new BusinessError(422, "`locationId` is required");
  }

  if (typeof locationId !== "string") {
    throw new BusinessError(422, "`locationId` must be a string");
  }

  if (!startDate) {
    throw new BusinessError(422, "`startDate` is required");
  }

  if (typeof startDate !== "string") {
    throw new BusinessError(422, "`startDate` must be a string");
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

  if (typeof endDate !== "string") {
    throw new BusinessError(422, "`endDate` must be a string");
  }

  if (!isValidEventDate(endDate)) {
    throw new BusinessError(
      422,
      "`endDate` wrong format (expected: YYYY-MM-DD HH:mm:ss)"
    );
  }

  if (!isBeforeEventDate(startDate, endDate)) {
    throw new BusinessError(422, "`startDate` must be before `endDate`");
  }
};

const createTicket = (params) => {
  const { name, quota, price, eventId } = params;

  if (!name) {
    throw new BusinessError(422, "`name` is required");
  }

  if (typeof name !== "string") {
    throw new BusinessError(422, "`name` must be a string");
  }

  if (!eventId) {
    throw new BusinessError(422, "`eventId` is required");
  }

  if (typeof eventId !== "string") {
    throw new BusinessError(422, "`eventId` must be a string");
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
