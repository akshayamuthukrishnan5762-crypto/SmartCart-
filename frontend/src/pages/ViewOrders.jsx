import { useEffect, useState } from "react";
import axios from "axios";

function ViewOrders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/orders"
      );

      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/orders/${id}`,
        {
          status,
        }
      );

      fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h1>📦 View Orders</h1>

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
            <h3>{order.name}</h3>

            <p>Email: {order.email}</p>

            <p>Mobile: {order.mobile}</p>

            <p>Address: {order.address}</p>

            <p>
              <strong>
                Total: ₹{order.total}
              </strong>
            </p>

            <p>
              Items: {order.items?.length || 0}
            </p>

            <p>
              Status:
              {order.status === "Pending" &&
                " 🟡 Pending"}
              {order.status === "Shipped" &&
                " 🟠 Shipped"}
              {order.status === "Delivered" &&
                " 🟢 Delivered"}
            </p>

            {order.status === "Pending" && (
              <button
                onClick={() =>
                  updateStatus(
                    order._id,
                    "Shipped"
                  )
                }
              >
                Mark as Shipped
              </button>
            )}

            {order.status === "Shipped" && (
              <button
                onClick={() =>
                  updateStatus(
                    order._id,
                    "Delivered"
                  )
                }
              >
                Mark as Delivered
              </button>
            )}

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

export default ViewOrders;