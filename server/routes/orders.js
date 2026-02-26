const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", (req, res) => {
    try {
        const { restaurantName, itemCount, isPaid, deliveryDistance } = req.body;

        if (!restaurantName || itemCount == null || isPaid == null || deliveryDistance == null) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const items = Number(itemCount);
        const distance = Number(deliveryDistance);

        if (!Number.isInteger(items) || items <= 0) {
            return res.status(400).json({ error: "Item count must be a positive integer." });
        }
        if (isNaN(distance) || distance <= 0) {
            return res.status(400).json({ error: "Delivery distance must be a positive number." });
        }

        const stmt = db.prepare(
            "INSERT INTO orders (restaurantName, itemCount, isPaid, deliveryDistance) VALUES (?, ?, ?, ?)"
        );
        const result = stmt.run(restaurantName.trim(), items, isPaid ? 1 : 0, distance);

        const order = {
            orderId: result.lastInsertRowid,
            restaurantName: restaurantName.trim(),
            itemCount: items,
            isPaid: !!isPaid,
            deliveryDistance: distance,
        };

        res.status(201).json(order);
    } catch (err) {
        res.status(500).json({ error: "Failed to add order." });
    }
});

router.get("/", (req, res) => {
    try {
        const rows = db.prepare("SELECT * FROM orders ORDER BY orderId DESC").all();
        const orders = rows.map((r) => ({
            ...r,
            isPaid: !!r.isPaid,
        }));
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch orders." });
    }
});

router.get("/filter", (req, res) => {
    try {
        const { paid, maxDistance } = req.query;
        let sql = "SELECT * FROM orders WHERE 1=1";
        const params = [];

        if (paid !== undefined && paid !== "") {
            sql += " AND isPaid = ?";
            params.push(paid === "true" ? 1 : 0);
        }

        if (maxDistance !== undefined && maxDistance !== "") {
            const max = parseFloat(maxDistance);
            if (isNaN(max) || max < 0) {
                return res.status(400).json({ error: "maxDistance must be a valid positive number." });
            }
            sql += " AND deliveryDistance <= ?";
            params.push(max);
        }

        sql += " ORDER BY orderId DESC";

        const rows = db.prepare(sql).all(...params);
        const orders = rows.map((r) => ({
            ...r,
            isPaid: !!r.isPaid,
        }));
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: "Failed to filter orders." });
    }
});

module.exports = router;
