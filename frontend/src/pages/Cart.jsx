import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import "./Cart.css";

function Cart({ cart, setCart }) {
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

  return (
    <div className="cart-page">
      <h1>🛒 Shopping Cart</h1>

      {cart.length === 0 ? (
        <h2>Your Cart is Empty 😔</h2>
      ) : (
        <>
          {cart.map((item, index) => (
            <div
              className="cart-item"
              key={`${item.id}-${index}`}
            >
              <img
                src={item.image}
                alt={item.name}
                className="cart-image"
              />

              <div className="cart-details">
                <h3>{item.name}</h3>

                <p>
                  <span
                    style={{
                      textDecoration: "line-through",
                      color: "gray",
                      marginRight: "10px",
                    }}
                  >
                    ₹{item.price}
                  </span>

                  <span
                    style={{
                      color: "green",
                      fontWeight: "bold",
                      fontSize: "18px",
                    }}
                  >
                    ₹
                    {Math.round(
                      item.price -
                        (item.price * (item.discount || 0)) / 100
                    )}
                  </span>

                  {" "}× {item.quantity || 1}
                </p>

                <div className="quantity-box">
                  <button
                    onClick={() => {
                      const updatedCart = cart
                        .map((cartItem, i) =>
                          i === index
                            ? {
                                ...cartItem,
                                quantity: (cartItem.quantity || 1) - 1,
                              }
                            : cartItem
                        )
                        .filter(
                          (cartItem) => cartItem.quantity > 0
                        );

                      setCart(updatedCart);
                    }}
                  >
                    -
                  </button>

                  <span>{item.quantity || 1}</span>

                  <button
                    onClick={() => {
                      const updatedCart = cart.map(
                        (cartItem, i) =>
                          i === index
                            ? {
                                ...cartItem,
                                quantity: (cartItem.quantity || 1) + 1,
                              }
                            : cartItem
                      );

                      setCart(updatedCart);
                    }}
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                className="remove-btn"
                onClick={() => {
                  const updatedCart = cart.filter(
                    (_, i) => i !== index
                  );

                  setCart(updatedCart);

                  toast.error(
                    `${item.name} removed from cart!`
                  );
                }}
              >
                Remove
              </button>
            </div>
          ))}

          <div className="cart-total">
            <h2>Total: ₹{total}</h2>

            <Link to="/checkout">
              <button className="checkout-btn">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;