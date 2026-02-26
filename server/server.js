const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let orders = [];
let nextId = 1;

app.post("/orders", (req, res) => {
  const { restaurantName, itemCount, isPaid, deliveryDistance } = req.body;
  if (!restaurantName || itemCount == null || isPaid == null || deliveryDistance == null) {
    return res.status(400).json({ error: "All fields are required" });
  }
  if (typeof itemCount !== "number" || typeof deliveryDistance !== "number") {
    return res.status(400).json({ error: "itemCount and deliveryDistance must be numbers" });
  }
  const order = { orderId: nextId++, restaurantName, itemCount, isPaid, deliveryDistance };
  orders.push(order);
  res.status(201).json(order);
});

app.get("/orders", (req, res) => {
  res.json(orders);
});

app.get("/orders/filter", (req, res) => {
  let result = [...orders];
  const { paid, maxDistance } = req.query;
  if (paid !== undefined) {
    const paidBool = paid === "true";
    result = result.filter((o) => o.isPaid === paidBool);
  }
  if (maxDistance !== undefined) {
    const max = parseFloat(maxDistance);
    if (isNaN(max)) return res.status(400).json({ error: "maxDistance must be a number" });
    result = result.filter((o) => o.deliveryDistance <= max);
  }
  res.json(result);
});

app.post("/assign", (req, res) => {
  const { maxDistance } = req.body;
  if (maxDistance == null || isNaN(parseFloat(maxDistance))) {
    return res.status(400).json({ error: "maxDistance is required and must be a number" });
  }
  const max = parseFloat(maxDistance);
  const candidates = orders.filter((o) => !o.isPaid && o.deliveryDistance <= max);
  if (candidates.length === 0) {
    return res.json({ message: "No order available" });
  }
  const nearest = candidates.reduce((a, b) => (a.deliveryDistance < b.deliveryDistance ? a : b));
  nearest.isPaid = true;
  res.json({ message: "Order assigned", order: nearest });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
