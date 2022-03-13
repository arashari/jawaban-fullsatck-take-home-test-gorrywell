import BusinessError from "../models/BusinessError.js";
import EventRepo from "../repositories/local/event.js";
import LocationRepo from "../repositories/local/location.js";

import { isValidEventDate } from "../util.js";

const create = async (req, res, next) => {
  try {
    const { name, startDate, endDate, locationId } = req.body;

    if (!name) {
      next(new BusinessError(422, "`name` is required"));
      return;
    }

    if (!locationId) {
      next(new BusinessError(422, "`locationId` is required"));
      return;
    }

    if (!(await LocationRepo.findById(locationId))) {
      next(
        new BusinessError(
          422,
          `location with id: \`${locationId}\` is not found`
        )
      );
      return;
    }

    if (!startDate) {
      next(new BusinessError(422, "`startDate` is required"));
      return;
    }

    if (!isValidEventDate(startDate)) {
      next(
        new BusinessError(
          422,
          "`startDate` wrong format (expected: YYYY-MM-DD HH:mm:ss)"
        )
      );
      return;
    }

    if (!endDate) {
      next(new BusinessError(422, "`endDate` is required"));
      return;
    }

    if (!isValidEventDate(endDate)) {
      next(
        new BusinessError(
          422,
          "`endDate` wrong format (expected: YYYY-MM-DD HH:mm:ss)"
        )
      );
      return;
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
    const { name, quota, price, eventId } = req.body;

    if (!name) {
      next(new BusinessError(422, "`name` is required"));
      return;
    }

    if (!eventId) {
      next(new BusinessError(422, "`eventId` is required"));
      return;
    }

    if (!quota) {
      next(new BusinessError(422, "`quota` is required"));
      return;
    }

    const _quota = parseInt(quota);

    if (!Number.isInteger(_quota)) {
      next(new BusinessError(422, "`quota` must be an integer"));
      return;
    }

    if (!price) {
      next(new BusinessError(422, "`price` is required"));
      return;
    }

    const _price = parseInt(price);

    if (!Number.isInteger(_price)) {
      next(new BusinessError(422, "`price` must be an integer"));
      return;
    }

    try {
      const data = await EventRepo.createTicket({
        name,
        quota: _quota,
        price: _price,
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
        next(
          new BusinessError(422, `event with id: \`${eventId}\` is not found`)
        );
      } else {
        next(err);
      }
    }
  } catch (err) {
    next(err);
  }
};

const getInfo = async (req, res, next) => {
  try {
    const { id } = req.query;

    if (!id) {
      next(new BusinessError(422, "`id` is required"));

      return;
    }

    const data = await EventRepo.findById(id);

    if (!data) {
      next(new BusinessError(404, "event not found"));
      return;
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
