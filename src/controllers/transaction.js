import BusinessError from "../models/BusinessError.js";
import TransactionRepo from "../repositories/local/transaction.js";

const purchase = async (req, res, next) => {
  try {
    const { customerName, customerEmail, eventId, tickets } = req.body;

    if (!customerName) {
      next(new BusinessError(422, "`customerName` is required"));
      return;
    }

    if (!customerEmail) {
      next(new BusinessError(422, "`customerEmail` is required"));
      return;
    }

    if (!eventId) {
      next(new BusinessError(422, "`eventId` is required"));
      return;
    }

    if (!tickets) {
      next(new BusinessError(422, "`tickets` is required"));
      return;
    }

    if (!Array.isArray(tickets)) {
      next(new BusinessError(422, "`tickets` must be an array"));
      return;
    }

    if (!tickets.length > 0) {
      next(
        new BusinessError(422, "`tickets` must be contain at least one ticket")
      );
      return;
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

    try {
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
    const { id } = req.query;

    if (!id) {
      next(new BusinessError(422, "`id` is required"));

      return;
    }

    const transaction = await TransactionRepo.findById(id);

    if (!transaction) {
      next(new BusinessError(404, "transaction not found"));
      return;
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
