import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar({ cartCount }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    localStorage.removeItem("cart");
    localStorage.removeItem("name");


    alert("Logged Out");

    window.location.href = "/login";
  };

  return (
    <nav className="navbar">
      <h2 className="logo">🛒 SmartCart</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>

        <Link to="/products">Products</Link>

        <Link to="/about">About</Link>

        <Link to="/contact">Contact</Link>

        <Link to="/cart">
          Cart <span className="badge">{cartCount}</span>
        </Link>

        <Link to="/checkout">Checkout</Link>

        <Link to="/my-orders">My Orders</Link>
        <Link to="/profile">Profile</Link>

        {role === "admin" && (
          <Link to="/admin">Admin</Link>
        )}

        {token ? (
          <button onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <>
            <Link to="/login">Login</Link>

            <Link to="/register">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;