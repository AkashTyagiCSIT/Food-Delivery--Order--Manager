const API = "http://localhost:3000";

async function loadOrders() {
  const res = await fetch(`${API}/orders`);
  const orders = await res.json();
  renderOrders(orders);
}

async function addOrder() {
  const restaurantName = document.getElementById("restaurantName").value.trim();
  const itemCount = parseInt(document.getElementById("itemCount").value);
  const isPaid = document.getElementById("isPaid").value === "true";
  const deliveryDistance = parseFloat(document.getElementById("deliveryDistance").value);

  if (!restaurantName || isNaN(itemCount) || isNaN(deliveryDistance)) {
    document.getElementById("addMsg").textContent = "Please fill all fields correctly.";
    return;
  }

  const res = await fetch(`${API}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ restaurantName, itemCount, isPaid, deliveryDistance }),
  });
  const data = await res.json();
  if (res.ok) {
    document.getElementById("addMsg").textContent = `Order #${data.orderId} added.`;
    loadOrders();
  } else {
    document.getElementById("addMsg").textContent = data.error;
  }
}

async function filterOrders() {
  const paid = document.getElementById("filterPaid").value;
  const maxDistance = document.getElementById("filterDistance").value;

  let url = `${API}/orders/filter?`;
  if (paid !== "") url += `paid=${paid}&`;
  if (maxDistance !== "") url += `maxDistance=${maxDistance}`;

  const res = await fetch(url);
  const orders = await res.json();
  renderOrders(orders);
}

async function assignDelivery() {
  const maxDistance = parseFloat(document.getElementById("assignDistance").value);
  if (isNaN(maxDistance)) {
    document.getElementById("assignMsg").textContent = "Please enter a valid distance.";
    return;
  }

  const res = await fetch(`${API}/assign`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ maxDistance }),
  });
  const data = await res.json();
  document.getElementById("assignMsg").textContent = data.message;
  loadOrders();
}

function renderOrders(orders) {
  const tbody = document.getElementById("ordersBody");
  tbody.innerHTML = "";
  if (orders.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5">No orders found.</td></tr>`;
    return;
  }
  orders.forEach((o) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${o.orderId}</td>
      <td>${o.restaurantName}</td>
      <td>${o.itemCount}</td>
      <td>${o.deliveryDistance}</td>
      <td class="${o.isPaid ? "paid" : "unpaid"}">${o.isPaid ? "Paid" : "Unpaid"}</td>
    `;
    tbody.appendChild(tr);
  });
}

loadOrders();
