# Food Delivery Order Manager

A full-stack web application for managing food delivery orders. Add, view, filter, and assign delivery orders through a clean UI backed by a SQLite database.

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express
- **Database:** SQLite (via better-sqlite3)

## Project Structure

```
food-delivery-manager/
├── client/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── server/
│   ├── routes/
│   │   ├── orders.js
│   │   └── assign.js
│   ├── db.js
│   ├── server.js
│   ├── package.json
│   └── .env
└── README.md
```

## Features

1. **Add Order** — Create food orders with restaurant name, item count, paid/unpaid status, and delivery distance.
2. **View Orders** — Display all orders in a table with status badges.
3. **Filter Orders** — Filter by payment status (Paid / Unpaid) and maximum delivery distance.
4. **Assign Delivery** — Automatically assigns the nearest unpaid order within a given distance. Marks it as paid upon assignment.

## Setup & Run

```bash
cd server
npm install
npm start
```

The app runs at `http://localhost:3000`.

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| PORT | 3000 | Server port |
| DB_PATH | ./data/orders.db | SQLite database file path |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /orders | Add a new order |
| GET | /orders | Get all orders |
| GET | /orders/filter | Filter orders by status and distance |
| POST | /assign | Assign nearest unpaid order |

## Deployment

Deploy the `server/` directory to any Node.js hosting platform (Render, Vercel, etc.). The server serves the `client/` folder as static files.

## License

MIT
