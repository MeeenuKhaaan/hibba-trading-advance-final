import { useEffect, useReducer } from "react";

/**
 * Frontend-only order log. Checkout writes an order here (in addition to
 * sending the WhatsApp message) so the admin panel has something real to
 * show. Swap this for a real backend later without touching call sites.
 */
const ORDERS_KEY = "hibba.orders.v1";

export const ORDER_STATUSES = ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"];

function readOrders() {
  try {
    return JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];
  } catch {
    return [];
  }
}

function writeOrders(list) {
  try {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(list));
  } catch {
    /* ignore */
  }
}

export const orders = readOrders();

const listeners = new Set();
function notify() {
  listeners.forEach((l) => l());
}
export function subscribeOrders(cb) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}
function refresh() {
  orders.splice(0, orders.length, ...readOrders());
  notify();
}

export function saveOrder(order) {
  const list = readOrders();
  list.unshift(order);
  writeOrders(list);
  refresh();
  return order;
}

export function updateOrderStatus(id, status) {
  const list = readOrders().map((o) => (o.id === id ? { ...o, status } : o));
  writeOrders(list);
  refresh();
}

export function deleteOrder(id) {
  writeOrders(readOrders().filter((o) => o.id !== id));
  refresh();
}

export function useOrders() {
  const [, tick] = useReducer((c) => c + 1, 0);
  useEffect(() => subscribeOrders(tick), []);
  return orders;
}
