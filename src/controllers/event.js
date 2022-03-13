const create = async (req, res, next) => {
  res.send("create event");
};

const createTicket = async (req, res, next) => {
  res.send("create event ticket");
};

const getInfo = async (req, res, next) => {
  res.send("get event info");
};

export default {
  create,
  createTicket,
  getInfo,
};
