import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./Checkout.css";

function Checkout({ cart = [], setCart }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

if (!token) {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "50px",
      }}
    >
      <h2>Please Login First 🔒</h2>

      <button
        onClick={() => navigate("/login")}
      >
        Go To Login
      </button>
    </div>
  );
}
  

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");

  const total = cart.reduce(
    (sum, item) =>
      sum +
      Math.round(
        item.price -
          (item.price * (item.discount || 0)) / 100
      ) *
        (item.quantity || 1),
    0
  );

  const handleSubmit = async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("Please Login First");

    setTimeout(() => {
      navigate("/login");
    }, 1000);

    return;
  }

  try {
    await axios.post(
      "https://smartcart-backend-ukyl.onrender.com/api/orders",
      {
        name,
        email,
        address,
        mobile,
        items: cart,
        total,
      }
    );
    
      setCart([]); // Clear the cart after successful order placement
      localStorage.removeItem("cart"); // Remove cart from localStorage

    toast.success("🎉 Order placed successfully!");


    setTimeout(() => {
      navigate("/order-success");
    }, 1500);
  } catch (error) {
    console.log(error);
    toast.error("Order Failed");
  }
};

  return (
    <div className="checkout-page">
      <div className="checkout-card">
        <h1>Checkout</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <input
            type="text"
            placeholder="Delivery Address"
            value={address}
            onChange={(e) =>
              setAddress(e.target.value)
            }
            required
          />

          <input
            type="tel"
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e) =>
              setMobile(e.target.value)
            }
            required
          />

          <div className="summary">
            <h2>Order Summary</h2>

            {cart.length === 0 ? (
              <p>No items in cart.</p>
            ) : (
              <>
                {cart.map((item) => (
                  <div
                    className="summary-item"
                    key={item.id}
                  >
                    <span>
                      {item.name} ×{" "}
                      {item.quantity || 1}
                    </span>

                    <span>
                      ₹
                      {Math.round(
                        item.price -
                          (item.price *
                            (item.discount || 0)) /
                            100
                      ) *
                        (item.quantity || 1)}
                    </span>
                  </div>
                ))}

                <hr />

                <div className="summary-item total">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </>
            )}
          </div>

          <button
            className="checkout-btn"
            type="submit"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;