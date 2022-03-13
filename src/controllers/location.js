import BusinessError from "../models/BusinessError.js";
import LocationRepo from "../repositories/local/location.js";

const create = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      next(new BusinessError(422, "`name` is required"));
      return;
    }

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
    const { id } = req.query;

    if (!id) {
      next(new BusinessError(422, "`id` is required"));

      return;
    }

    const data = await LocationRepo.findById(id);

    if (!data) {
      next(new BusinessError(404, "location not found"));
      return;
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
