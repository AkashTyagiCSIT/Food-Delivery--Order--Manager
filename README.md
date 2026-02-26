# Food Delivery Order Manager

<<<<<<< HEAD
A full-stack web application for managing food delivery orders. Add, view, filter, and assign delivery orders through a clean UI backed by a SQLite database.

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express
- **Database:** SQLite (via better-sqlite3)
=======
A simple web application to manage food delivery orders with automatic delivery assignment.

## Project Overview

- Backend: Node.js + Express (in-memory storage)
- Frontend: HTML, CSS, Vanilla JavaScript
- No database, no frameworks, no extra libraries
>>>>>>> 88622747d0e8345367c6c4eb2f84ae7ed57368b3

## Project Structure

```
food-delivery-manager/
<<<<<<< HEAD
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
=======
  server/
    server.js
    package.json
  client/
    index.html
    style.css
    script.js
  README.md
```

## Setup & Run Locally

### Backend
>>>>>>> 88622747d0e8345367c6c4eb2f84ae7ed57368b3

```bash
cd server
npm install
<<<<<<< HEAD
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
=======
node server.js
```

Server runs on http://localhost:3000

### Frontend

Open `client/index.html` in a browser.

Update the `API` variable in `script.js` to `http://localhost:3000` for local development.

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| POST | /orders | Add a new order |
| GET | /orders | Get all orders |
| GET | /orders/filter?paid=true/false&maxDistance=X | Filter orders |
| POST | /assign | Assign delivery to nearest unpaid order |

### POST /orders — Request Body
```json
{
  "restaurantName": "Pizza Hub",
  "itemCount": 3,
  "isPaid": false,
  "deliveryDistance": 5.2
}
```

### POST /assign — Request Body
```json
{
  "maxDistance": 10
}
```

## Deployment

### Backend on Render

1. Push the `server/` folder to a GitHub repo
2. Go to https://render.com → New Web Service
3. Connect repo, set **Build Command**: `npm install`, **Start Command**: `node server.js`
4. Render auto-assigns a PORT via environment variable
5. Copy the deployed URL (e.g. `https://your-app.onrender.com`)

### Frontend on Vercel

1. Push the `client/` folder to a GitHub repo
2. Update `API` in `script.js` to your Render backend URL
3. Go to https://vercel.com → New Project → Import repo
4. Set root directory to `client/`, deploy

## Suggested Git Commits

1. `feat: initialize project structure with Express server and in-memory orders`
2. `feat: add filter and assign delivery logic with API routes`
3. `feat: add frontend UI with add, filter, assign, and orders table`

## Demo Script (2 minutes)

**Introduction (20s):**
"This is the Food Delivery Order Manager — a full-stack app with a Node/Express backend and a plain HTML frontend."

**Add Order (20s):**
"I fill in restaurant name, item count, paid status, and delivery distance, then click Add Order. The order appears in the table."

**View & Filter (20s):**
"I can see all orders in the table. Using the filter section, I can filter by Paid/Unpaid status or by maximum delivery distance."

**Assign Delivery (30s):**
"I enter a max distance and click Assign Delivery. The app finds the nearest unpaid order within that distance, marks it as paid, and displays a confirmation. If no order qualifies, it shows 'No order available'."

**Deployment (30s):**
"The backend is deployed on Render using the PORT environment variable. The frontend is deployed on Vercel as a static site. The API URL in script.js points to the Render backend."
>>>>>>> 88622747d0e8345367c6c4eb2f84ae7ed57368b3
