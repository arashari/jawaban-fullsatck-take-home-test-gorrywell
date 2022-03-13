import express from "express";

import event from "./event.js";
import location from "./location.js";
import transaction from "./transaction.js";

const router = express.Router();

router.use("/event", event);
router.use("/location", location);
router.use("/transaction", transaction);

router.get("*", (req, res) => {
  res.status(404).json({ message: "not found" });
});

router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || "something wrong" });
});

export default router;
