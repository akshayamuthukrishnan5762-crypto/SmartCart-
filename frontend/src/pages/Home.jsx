import { useNavigate } from "react-router-dom";
import "./Home.css";
import heroImg from "../assets/hero.jpg";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <img
        src={heroImg}
        alt="SmartCart"
        className="hero-image"
      />

      <h1>Welcome to SmartCart</h1>

      <p>Fresh groceries delivered to your doorstep.</p>

      <button
        className="shop-btn"
        onClick={() => navigate("/products")}
      >
        Shop Now
      </button>
    </div>
  );
}

export default Home;