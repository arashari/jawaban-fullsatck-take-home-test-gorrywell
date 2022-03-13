const purchase = async (req, res, next) => {
  res.send("transaction purchase");
};

const getInfo = async (req, res, next) => {
  res.send("get info transaction");
};

export default {
  purchase,
  getInfo,
};
