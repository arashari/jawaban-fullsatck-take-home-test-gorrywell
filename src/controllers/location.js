import BusinessError from "../models/BusinessError.js";
import LocationRepo from "../repositories/local/location.js";

import Validator from "../validator.js";

const create = async (req, res, next) => {
  try {
    Validator.createLocation(req.body);

    const { name } = req.body;
    const data = await LocationRepo.create({ name });

    res.json({
      code: 200,
      message: "location created",
      data: {
        id: data.id,
      },
    });
  } catch (err) {
    next(err);
  }
};

const get = async (req, res, next) => {
  try {
    Validator.getLocation(req.query);

    const { id } = req.query;
    const data = await LocationRepo.findById(id);

    if (!data) {
      throw new BusinessError(404, "location not found");
    }

    res.json({
      code: 200,
      message: "location found",
      data,
    });
  } catch (err) {
    next(err);
  }
};

export default {
  create,
  get,
};
