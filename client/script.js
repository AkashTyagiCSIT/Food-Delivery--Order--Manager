const API = "https://food-delivery-backend-lake.vercel.app";

const dom = {
  addForm: () => document.getElementById("addOrderForm"),
  restaurantName: () => document.getElementById("restaurantName"),
  itemCount: () => document.getElementById("itemCount"),
  isPaid: () => document.getElementById("isPaid"),
  deliveryDistance: () => document.getElementById("deliveryDistance"),
  addMsg: () => document.getElementById("addMsg"),
  filterPaid: () => document.getElementById("filterPaid"),
  filterDistance: () => document.getElementById("filterDistance"),
  filterBtn: () => document.getElementById("filterBtn"),
  showAllBtn: () => document.getElementById("showAllBtn"),
  assignDistance: () => document.getElementById("assignDistance"),
  assignBtn: () => document.getElementById("assignBtn"),
  assignMsg: () => document.getElementById("assignMsg"),
  ordersBody: () => document.getElementById("ordersBody"),
  orderCount: () => document.getElementById("orderCount"),
  ordersTable: () => document.getElementById("ordersTable"),
  emptyState: () => document.getElementById("emptyState"),
};

function showMsg(el, text, type) {
  el.textContent = text;
  el.className = "msg " + type;
  setTimeout(() => {
    el.textContent = "";
    el.className = "msg";
  }, 4000);
}

async function loadOrders() {
  try {
    const res = await fetch(API + "/orders");
    if (!res.ok) throw new Error("Failed to fetch orders.");
    const orders = await res.json();
    renderOrders(orders);
  } catch (err) {
    renderOrders([]);
  }
}

async function addOrder(e) {
  e.preventDefault();

  const name = dom.restaurantName().value.trim();
  const items = parseInt(dom.itemCount().value, 10);
  const paid = dom.isPaid().value === "true";
  const distance = parseFloat(dom.deliveryDistance().value);

  if (!name) {
    showMsg(dom.addMsg(), "Please enter a restaurant name.", "error");
    return;
  }
  if (isNaN(items) || items <= 0) {
    showMsg(dom.addMsg(), "Item count must be a positive number.", "error");
    return;
  }
  if (isNaN(distance) || distance <= 0) {
    showMsg(dom.addMsg(), "Distance must be a positive number.", "error");
    return;
  }

  try {
    const res = await fetch(API + "/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        restaurantName: name,
        itemCount: items,
        isPaid: paid,
        deliveryDistance: distance,
      }),
    });
    const data = await res.json();
    if (res.ok) {
      showMsg(dom.addMsg(), "Order #" + data.orderId + " added successfully.", "success");
      dom.addForm().reset();
      loadOrders();
    } else {
      showMsg(dom.addMsg(), data.error || "Failed to add order.", "error");
    }
  } catch (err) {
    showMsg(dom.addMsg(), "Network error. Please try again.", "error");
  }
}

async function filterOrders() {
  const paid = dom.filterPaid().value;
  const maxDist = dom.filterDistance().value;

  const params = new URLSearchParams();
  if (paid !== "") params.append("paid", paid);
  if (maxDist !== "") params.append("maxDistance", maxDist);

  try {
    const res = await fetch(API + "/orders/filter?" + params.toString());
    if (!res.ok) throw new Error("Filter failed.");
    const orders = await res.json();
    renderOrders(orders);
  } catch (err) {
    renderOrders([]);
  }
}

async function assignDelivery() {
  const maxDist = parseFloat(dom.assignDistance().value);
  if (isNaN(maxDist) || maxDist <= 0) {
    showMsg(dom.assignMsg(), "Please enter a valid distance.", "error");
    return;
  }

  try {
    const res = await fetch(API + "/assign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ maxDistance: maxDist }),
    });
    const data = await res.json();

    if (data.order) {
      showMsg(
        dom.assignMsg(),
        "Assigned Order #" + data.order.orderId + " (" + data.order.restaurantName + ")",
        "success"
      );
      loadOrders();
    } else {
      showMsg(dom.assignMsg(), data.message || "No order available", "info");
    }
  } catch (err) {
    showMsg(dom.assignMsg(), "Network error. Please try again.", "error");
  }
}

function renderOrders(orders) {
  const tbody = dom.ordersBody();
  const countEl = dom.orderCount();
  const table = dom.ordersTable();
  const empty = dom.emptyState();

  tbody.innerHTML = "";

  if (!orders || orders.length === 0) {
    table.style.display = "none";
    empty.style.display = "block";
    countEl.textContent = "0 orders";
    return;
  }

  table.style.display = "table";
  empty.style.display = "none";
  countEl.textContent = orders.length + (orders.length === 1 ? " order" : " orders");

  orders.forEach((o) => {
    const tr = document.createElement("tr");
    const statusClass = o.isPaid ? "badge-paid" : "badge-unpaid";
    const statusText = o.isPaid ? "Paid" : "Unpaid";

    tr.innerHTML =
      "<td>" + o.orderId + "</td>" +
      "<td>" + escapeHtml(o.restaurantName) + "</td>" +
      "<td>" + o.itemCount + "</td>" +
      "<td>" + o.deliveryDistance + " km</td>" +
      '<td><span class="badge ' + statusClass + '">' + statusText + "</span></td>";

    tbody.appendChild(tr);
  });
}

function escapeHtml(str) {
  var div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

document.addEventListener("DOMContentLoaded", function () {
  dom.addForm().addEventListener("submit", addOrder);
  dom.filterBtn().addEventListener("click", filterOrders);
  dom.showAllBtn().addEventListener("click", loadOrders);
  dom.assignBtn().addEventListener("click", assignDelivery);

  loadOrders();
});
