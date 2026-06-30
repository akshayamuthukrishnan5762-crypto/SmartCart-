import { useEffect, useState } from "react";
import axios from "axios";

function ManageProducts() {
  const [products, setProducts] = useState([]);
  const[editId,setEditId]=useState(null);
  const[editName,setEditName]=useState("");
  const[editPrice,setEditPrice]=useState("");
  const[editDiscount,setEditDiscount]=useState("");
  const[editDescription,setEditDescription]=useState("");
  const[editImage,setEditImage]=useState("");

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/products"
      );

      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/products/${id}`
      );

      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };
  const updateProduct = async (id) => {
  try {
    await axios.put(
      `http://localhost:5000/products/${id}`,
      {
        name: editName,
        price: editPrice,
        discount: editDiscount,
        description: editDescription,
        image: editImage,
      }
    );

    alert("Product Updated Successfully");

    setEditId(null);

    fetchProducts();
  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h1>📦 Manage Products</h1>

      {products.map((product) => (
        <div
          key={product.id}
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            margin: "10px 0",
          }}
        >
          <h3>{product.name}</h3>

          <p>₹{product.price}</p>
<button
onClick={() => {
  setEditId(product.id);
  setEditName(product.name);  
  setEditPrice(product.price);
  setEditDiscount(product.discount);
  setEditDescription(product.description);
  setEditImage(product.image);
}}
>
Edit
</button>
          <button
            onClick={() =>
              deleteProduct(product.id)
            }
          >
            Delete
          </button>
          {editId === product.id && (
  <div style={{ marginTop: "15px" }}>

    <input
      type="text"
      placeholder="Name"
      value={editName}
      onChange={(e) =>
        setEditName(e.target.value)
      }
    />

    <br /><br />

    <input
      type="number"
      placeholder="Price"
      value={editPrice}
      onChange={(e) =>
        setEditPrice(e.target.value)
      }
    />

    <br /><br />

    <input
      type="number"
      placeholder="Discount"
      value={editDiscount}
      onChange={(e) =>
        setEditDiscount(e.target.value)
      }
    />

    <br /><br />

    <textarea
      placeholder="Description"
      value={editDescription}
      onChange={(e) =>
        setEditDescription(e.target.value)
      }
    />

    <br /><br />

    <input
      type="text"
      placeholder="Image URL"
      value={editImage}
      onChange={(e) =>
        setEditImage(e.target.value)
      }
    />

    <br /><br />

    <button
      onClick={() => updateProduct(product.id)}
    >
      Update Product
    </button>

  </div>
)}
        </div>
      ))}
    </div>
  );
}

export default ManageProducts;