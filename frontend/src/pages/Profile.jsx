import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [user, setUser] = useState({});
  const [orderCount, setOrderCount] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);
  const[currentPassword,setCurrentPassword]=useState("");
  const[newPassword,setNewPassword]=useState("");
  const[confirmPassword,setConfirmPassword]=useState("");

  const fetchOrders = async (email) => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/orders"
      );

      const userOrders = res.data.filter(
        (order) => order.email === email
      );

      setOrderCount(userOrders.length);

      const spent = userOrders.reduce(
        (sum, order) => sum + order.total,
        0
      );

      setTotalSpent(spent);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token=localStorage.getItem("token");
    if(!token){
      window.location.href="/login";
      return;
    }
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");
    const role = localStorage.getItem("role");

    setUser({
      name,
      email,
      role,
    });

    fetchOrders(email);
  }, []);

  const handleChangePassword = async () => {
  if (newPassword !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    await axios.put(
      "http://localhost:5000/api/auth/change-password",
      {
        email: user.email,
        currentPassword,
        newPassword,
      }
    );

    alert("Password Updated Successfully");

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  } catch (error) {
    console.log(error);
    alert("Password Update Failed");
  }
};

  return (
    <div style={{ padding: "30px" }}>
      <h1>👤 My Profile</h1>

      <div
        style={{
          border: "1px solid #ddd",
          padding: "20px",
          borderRadius: "10px",
          maxWidth: "500px",
        }}
      >
        <p>
          <strong>Name:</strong> {user.name || "-"}
        </p>

        <p>
          <strong>Email:</strong> {user.email || "-"}
        </p>

        <p>
          <strong>Role:</strong> {user.role || "-"}
        </p>

        <hr />

        <p>
          <strong>📦 Total Orders:</strong>{" "}
          {orderCount}
        </p>

        <p>
          <strong>💰 Total Spent:</strong> ₹
          {totalSpent}
        </p>
        <hr />

<h3>🔐 Change Password</h3>

<input
  type="password"
  placeholder="Current Password"
  value={currentPassword}
  onChange={(e) =>
    setCurrentPassword(e.target.value)
  }
/>

<br /><br />

<input
  type="password"
  placeholder="New Password"
  value={newPassword}
  onChange={(e) =>
    setNewPassword(e.target.value)
  }
/>

<br /><br />

<input
  type="password"
  placeholder="Confirm Password"
  value={confirmPassword}
  onChange={(e) =>
    setConfirmPassword(e.target.value)
  }
/>

<br /><br />

<button
  onClick={handleChangePassword}
>
  Update Password
</button>
      </div>
    </div>
  );
}

export default Profile;