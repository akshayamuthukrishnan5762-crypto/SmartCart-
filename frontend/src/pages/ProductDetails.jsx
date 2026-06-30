
import{useState,useEffect}from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "./ProductDetails.css";


function ProductDetails({ cart, setCart }) {
  const { id } = useParams();
const [product, setProduct] = useState(null);

useEffect(() => {
  axios
    .get(`http://localhost:5000/products/${id}`)
    .then((res) => {
      setProduct(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}, [id]);
  

  if (!product) {
  return <h2>Loading...</h2>;
}

  return (
    <div
      style={{
        textAlign: "center",
        padding: "40px",
      }}
    >
      <div
  style={{
    display: "inline-block",
    background: "#ef4444",
    color: "white",
    padding: "8px 15px",
    borderRadius: "20px",
    fontWeight: "bold",
    marginBottom: "20px",
  }}
>
  🔥 {product.discount}% OFF
</div>
      <img
        src={product.image}
        alt={product.name}
        width="300"
        style={{
          borderRadius: "20px",
        }}
      />

      <h1>{product.name}</h1>

      <p
  style={{
    marginTop: "15px",
    marginBottom: "15px",
  }}
>
  <span
    style={{
      textDecoration: "line-through",
      color: "gray",
      fontSize: "18px",
      marginRight: "10px",
    }}
  >
    ₹{product.price}
  </span>

  <span
    style={{
      color: "green",
      fontSize: "28px",
      fontWeight: "bold",
    }}
  >
    ₹
    {Math.round(
      product.price -
      (product.price * product.discount) / 100
    )}
  </span>
</p>

      <p>{product.description}</p>

      <button
  className="add-cart-btn"
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
  🛒 Add to Cart
</button>
    </div>
  );
}

export default ProductDetails;