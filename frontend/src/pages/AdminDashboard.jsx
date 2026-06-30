import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
  const [analytics, setAnalytics] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/orders/analytics"
        );

        setAnalytics(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h1>📊 Admin Dashboard</h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "20px",
          marginBottom: "30px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <h3>📦 Products</h3>
          <p>{analytics.totalProducts}</p>
        </div>

        <div>
          <h3>🛒 Orders</h3>
          <p>{analytics.totalOrders}</p>
        </div>

        <div>
          <h3>👤 Users</h3>
          <p>{analytics.totalUsers}</p>
        </div>

        <div>
          <h3>💰 Revenue</h3>
          <p>₹{analytics.totalRevenue}</p>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: "20px",
        }}
      >
        <Link to="/add-product">
          <button>➕ Add Product</button>
        </Link>

        <Link to="/manage-products">
          <button>📦 Manage Products</button>
        </Link>

        <Link to="/view-orders">
          <button>📋 View Orders</button>
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;