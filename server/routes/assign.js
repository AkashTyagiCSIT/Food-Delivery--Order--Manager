const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", (req, res) => {
    try {
        const { maxDistance } = req.body;

        if (maxDistance == null || maxDistance === "") {
            return res.status(400).json({ error: "maxDistance is required." });
        }

        const max = parseFloat(maxDistance);
        if (isNaN(max) || max <= 0) {
            return res.status(400).json({ error: "maxDistance must be a positive number." });
        }

        const nearest = db
            .prepare(
                "SELECT * FROM orders WHERE isPaid = 0 AND deliveryDistance <= ? ORDER BY deliveryDistance ASC LIMIT 1"
            )
            .get(max);

        if (!nearest) {
            return res.json({ message: "No order available" });
        }

        db.prepare("UPDATE orders SET isPaid = 1 WHERE orderId = ?").run(nearest.orderId);

        res.json({
            message: "Order assigned",
            order: {
                ...nearest,
                isPaid: true,
            },
        });
    } catch (err) {
        res.status(500).json({ error: "Failed to assign delivery." });
    }
});

module.exports = router;
