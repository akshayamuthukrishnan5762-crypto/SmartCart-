import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import "./ProductCard.css";
import axios from "axios";




function ProductCard({ product, cart, setCart }) {
  return (
    <div className="product-card">
      <span className="discount-badge">
  🔥 {product.discount}% OFF
</span>
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          width="200"
        />

        <h3>{product.name}</h3>
      </Link>

     <p className="price">
  <span className="old-price">
    ₹{product.price}
  </span>

  <span className="new-price">
    ₹
    {Math.round(
      product.price -
      (product.price * product.discount) / 100
    )}
  </span>
</p>

      <button
        onClick={() => {
  const existingItem = cart.find(
    (item) => item.id === product.id
  );

  if (existingItem) {
    const updatedCart = cart.map((item) =>
      item.id === product.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    setCart(updatedCart);
  } else {
    setCart([
      ...cart,
      {
        ...product,
        quantity: 1,
      },
    ]);
  }

  toast.success(`${product.name} added to cart!`);
}}
      >
        Add to Cart
      </button>
      
    </div>
  );
}

export default ProductCard;