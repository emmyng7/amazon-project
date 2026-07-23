import { createContext, useState } from "react";

export const OrderContext = createContext();

function OrderProvider({ children }) {
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem("orders");
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

function addOrder(order) {
  console.log("========== ORDER RECEIVED ==========");
  console.log(order);

  const updatedOrders = [order, ...orders];

  console.log("Updated Orders:", updatedOrders);

  setOrders(updatedOrders);

  localStorage.setItem(
    "orders",
    JSON.stringify(updatedOrders)
  );

  console.log(
    "Saved to localStorage:",
    localStorage.getItem("orders")
  );
}

  function clearOrders() {
    setOrders([]);
    localStorage.removeItem("orders");
  }

  return (
    <OrderContext.Provider
      value={{
        orders,
        addOrder,
        clearOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export default OrderProvider;