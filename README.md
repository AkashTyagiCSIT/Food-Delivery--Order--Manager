# Online Food Delivery Order Manager

## Overview

This is a full-stack web application that manages food delivery orders and automatically assigns delivery to the nearest unpaid order. The system allows users to add new orders, view all existing orders, filter them by payment status or delivery distance, and assign deliveries using a nearest-first algorithm.

## Tech Stack

- Frontend: HTML5, CSS3, JavaScript (Vanilla)
- Backend: Node.js with Express.js
- Database: SQLite (via better-sqlite3)
- Deployment: Vercel

## Project Structure

```
food-delivery-manager/
  client/
    index.html        - Main application page
    style.css         - Stylesheet with white and sunset orange theme
    script.js         - Frontend logic and API communication
  server/
    routes/
      orders.js       - Routes for adding, viewing, and filtering orders
      assign.js       - Route for assigning delivery to nearest unpaid order
    db.js             - SQLite database setup and table schema
    server.js         - Express server entry point
    package.json      - Node.js dependencies and scripts
    .env              - Environment variables (PORT, DB_PATH)
  .gitignore
  README.md
```

## Data Model

Each order contains the following fields:

| Field            | Type    | Description                          |
|------------------|---------|--------------------------------------|
| orderId          | Integer | Unique auto-incremented identifier   |
| restaurantName   | String  | Name of the restaurant               |
| itemCount        | Integer | Number of items in the order         |
| isPaid           | Boolean | Whether the order has been paid      |
| deliveryDistance  | Float   | Delivery distance in kilometers      |

## Features

### 1. Add Order

Users can add a new food delivery order by providing the restaurant name, item count, payment status (paid or unpaid), and delivery distance in kilometers. Input validation ensures all fields are filled correctly before submission.

### 2. View All Orders

All existing orders are displayed in a table showing the order ID, restaurant name, item count, delivery distance, and payment status. Orders are sorted by most recent first.

### 3. Filter Orders

Users can filter the displayed orders by:
- Payment status (Paid, Unpaid, or All)
- Maximum delivery distance (only orders within the specified distance are shown)

Both filters can be applied simultaneously.

### 4. Assign Delivery

The AssignDelivery feature accepts a maximum distance and:
- Searches for all unpaid orders within that distance
- Selects the nearest unpaid order (smallest delivery distance)
- Marks that order as paid (assigned)
- If no suitable unpaid order exists within the distance, displays "No order available"

## API Endpoints

| Method | Endpoint        | Description                                      |
|--------|-----------------|--------------------------------------------------|
| POST   | /orders         | Add a new order                                  |
| GET    | /orders         | Retrieve all orders                              |
| GET    | /orders/filter  | Filter orders by paid status and max distance    |
| POST   | /assign         | Assign delivery to nearest unpaid order          |

## How to Run Locally

1. Clone the repository:
   ```
   git clone <repository-url>
   cd food-delivery-manager
   ```

2. Install dependencies:
   ```
   cd server
   npm install
   ```

3. Start the server:
   ```
   npm start
   ```

4. Open `http://localhost:3000` in a browser.

## Environment Variables

Create a `.env` file inside the `server/` directory:

```
PORT=3000
DB_PATH=./data/orders.db
```

## Deployment

- Backend is deployed on Vercel at: https://food-delivery-backend-lake.vercel.app
- The frontend is served as static files by the backend, or can be deployed separately on any static hosting platform (GitHub Pages, Netlify, Vercel).

## Error Handling

- All form inputs are validated on both the client and server side.
- Invalid or missing fields return descriptive error messages.
- Network errors are caught and displayed in the UI.
- The server returns appropriate HTTP status codes (400 for bad requests, 500 for server errors).

## License

MIT
