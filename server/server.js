require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const ordersRouter = require("./routes/orders");
const assignRouter = require("./routes/assign");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Food Delivery API</title>
      <style>
        body { font-family: 'Segoe UI', sans-serif; background: #f9fafb; color: #1f2937; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; }
        .container { text-align: center; background: #fff; padding: 40px 48px; border-radius: 12px; box-shadow: 0 4px 16px rgba(0,0,0,0.06); max-width: 480px; }
        h1 { font-size: 22px; margin: 0 0 8px; color: #111827; }
        .status { display: inline-block; background: #dcfce7; color: #16a34a; font-weight: 600; font-size: 13px; padding: 4px 14px; border-radius: 20px; margin-bottom: 20px; }
        p { font-size: 14px; color: #6b7280; margin: 6px 0; }
        .endpoints { text-align: left; margin-top: 20px; background: #f3f4f6; padding: 16px 20px; border-radius: 8px; font-size: 13px; }
        .endpoints code { font-family: 'Consolas', monospace; }
        .endpoints li { margin: 6px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Food Delivery Order Manager</h1>
        <span class="status">Server Online</span>
        <p>Backend API is running and ready to accept requests.</p>
        <div class="endpoints">
          <strong>API Endpoints:</strong>
          <ul>
            <li><code>POST /orders</code> - Add a new order</li>
            <li><code>GET /orders</code> - Get all orders</li>
            <li><code>GET /orders/filter</code> - Filter orders</li>
            <li><code>POST /assign</code> - Assign delivery</li>
          </ul>
        </div>
      </div>
    </body>
    </html>
  `);
});

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

module.exports = app;
