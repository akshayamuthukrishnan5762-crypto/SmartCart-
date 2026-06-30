import { useState } from "react";
import axios from "axios";

function AddProduct() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/products", {
        id: Number(id),
        name,
        price: Number(price),
        discount: Number(discount),
        image,
      });

      alert("✅ Product Added");

      setId("");
      setName("");
      setPrice("");
      setDiscount("");
      setImage("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Add Product</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Product ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <br /><br />

        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br /><br />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <br /><br />

        <input
          type="number"
          placeholder="Discount"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
        />
        <br /><br />

        <input
          type="text"
          placeholder="/chocolate.jpeg"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <br /><br />

        <button type="submit">
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;