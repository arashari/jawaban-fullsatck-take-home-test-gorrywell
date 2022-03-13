import BusinessError from "../models/BusinessError.js";
import TransactionRepo from "../repositories/local/transaction.js";
import Validator from "../validator.js";

const purchase = async (req, res, next) => {
  try {
    Validator.purchase(req.body);

    try {
      const { customerName, customerEmail, eventId, tickets } = params;

      const transaction = await TransactionRepo.create({
        customerName,
        customerEmail,
        eventId,
        tickets,
      });

      res.json({
        code: 200,
        message: "transaction created",
        data: {
          id: transaction.id,
        },
      });
    } catch (err) {
      switch (err.message) {
        case "event not found":
          throw new BusinessError(
            422,
            `event with id: \`${eventId}\` not found`
          );
        case "ticket not found":
          // TODO: more helpful message
          throw new BusinessError(422, "invalid ticket");
        case "ticket quota exceeded":
          // TODO: more helpful message
          throw new BusinessError(422, "ticket quota exceeded");
        default:
          throw err;
      }
    }
  } catch (err) {
    next(err);
  }
};

const getInfo = async (req, res, next) => {
  try {
    Validator.getInfoTransaction(req.query);

    const { id } = req.query;
    const transaction = await TransactionRepo.findById(id);

    if (!transaction) {
      throw new BusinessError(404, "transaction not found");
    }

    res.json({
      code: 200,
      message: "transaction found",
      data: transaction,
    });
  } catch (err) {
    next(err);
  }
};

export default {
  purchase,
  getInfo,
};
