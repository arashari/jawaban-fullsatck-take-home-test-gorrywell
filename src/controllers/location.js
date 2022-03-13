import LocationRepo from "../repositories/local/location.js";

const create = async (req, res, next) => {
  const { name } = req.query;

  if (!name) {
    res.status(422).json({
      code: 422,
      message: "`name` is required",
    });
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
};

const get = async (req, res, next) => {
  const { id } = req.query;

  if (!id) {
    res.status(422).json({
      code: 422,
      message: "`id` is required",
    });
    return;
  }

  const data = await LocationRepo.findById(id);

  if (!data) {
    res.status(404).json({
      code: 404,
      message: "location not found",
    });
    return;
  }

  res.json({
    code: 200,
    message: "location found",
    data,
  });
};

export default {
  create,
  get,
};
