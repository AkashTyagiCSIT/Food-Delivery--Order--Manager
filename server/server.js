require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const ordersRouter = require("./routes/orders");
const assignRouter = require("./routes/assign");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "client")));

app.use("/orders", ordersRouter);
app.use("/assign", assignRouter);

app.use((err, req, res, next) => {
  res.status(500).json({ error: "Internal server error." });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
