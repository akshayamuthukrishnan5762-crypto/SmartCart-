const express = require("express");
const router = express.Router();

const {
  createOrder,
  getOrders,
  updateOrderStatus,
  getAnalytics,
} = require("../controllers/orderController");

router.get("/analytics", getAnalytics);
router.get("/", getOrders);
router.post("/", createOrder);



router.put("/:id", updateOrderStatus);



module.exports = router;