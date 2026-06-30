import { useEffect, useState } from "react";
import axios from "axios";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  const email = localStorage.getItem("email");

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/orders"
      );

      const userOrders = res.data.filter(
        (order) => order.email === email
      );

      setOrders(userOrders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h1>📦 My Orders</h1>

      {orders.length === 0 ? (
        <p>No Orders Found</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "10px",
            }}
          >
            <p>
              <strong>Total:</strong> ₹{order.total}
            </p>

            <p>
              Status:
              {order.status === "Delivered"
                ? " 🟢 Delivered"
                : " 🟡 Pending"}
            </p>

            <p>
              Items: {order.items?.length}
            </p>

            <h4>Order Items</h4>

            {order.items?.map((item, index) => (
              <div
                key={index}
                style={{
                  marginLeft: "15px",
                  marginBottom: "5px",
                }}
              >
                <p>
                  {item.name} × {item.quantity}
                </p>

                <p>
                  ₹
                  {Math.round(
                    item.price -
                      (item.price *
                        (item.discount || 0)) /
                        100
                  )}
                </p>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}

export default MyOrders;