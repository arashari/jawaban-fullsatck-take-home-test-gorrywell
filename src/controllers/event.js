import BusinessError from "../models/BusinessError.js";
import EventRepo from "../repositories/local/event.js";
import LocationRepo from "../repositories/local/location.js";

import Validator from "../validator.js";

const create = async (req, res, next) => {
  try {
    Validator.createEvent(req.body);

    const { name, startDate, endDate, locationId } = req.body;
    if (!(await LocationRepo.findById(locationId))) {
      throw new BusinessError(
        422,
        `location with id: \`${locationId}\` is not found`
      );
    }

    const data = await EventRepo.create({
      name,
      startDate,
      endDate,
      locationId,
    });

    res.json({
      code: 200,
      message: "event created",
      data: {
        id: data.id,
      },
    });
  } catch (err) {
    next(err);
  }
};

const createTicket = async (req, res, next) => {
  try {
    Validator.createTicket(req.body);

    try {
      const { name, quota, price, eventId } = req.body;
      const data = await EventRepo.createTicket({
        name,
        quota,
        price,
        eventId,
      });

      res.json({
        code: 200,
        message: "ticket created",
        data: {
          id: data.id,
          eventId,
        },
      });
    } catch (err) {
      if (err.message === "event not found") {
        throw new BusinessError(
          422,
          `event with id: \`${eventId}\` is not found`
        );
      } else {
        throw err;
      }
    }
  } catch (err) {
    next(err);
  }
};

const getInfo = async (req, res, next) => {
  try {
    Validator.getInfoTicket(req.query);

    const { id } = req.query;
    const data = await EventRepo.findById(id);

    if (!data) {
      throw new BusinessError(404, "event not found");
    }

    const _data = await EventRepo.joinWithLocation(data);

    res.json({
      code: 200,
      message: "event found",
      data: _data,
    });
  } catch (err) {
    next(err);
  }
};

export default {
  create,
  createTicket,
  getInfo,
};
