import { useEffect, useState } from "react";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../services/api";

type Product = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

const inputStyle = {
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  fontSize: "15px",
};

const primaryBtn = {
  background: "#2563eb",
  color: "#fff",
  border: "none",
  padding: "12px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold" as const,
};

const cancelBtn = {
  background: "#6b7280",
  color: "#fff",
  border: "none",
  padding: "12px",
  borderRadius: "8px",
  cursor: "pointer",
};

const thStyle = {
  padding: "14px",
  textAlign: "center" as const,
};

const tdStyle = {
  padding: "12px",
  borderBottom: "1px solid #ddd",
  textAlign: "center" as const,
};

const editBtn = {
  background: "#10b981",
  color: "#fff",
  border: "none",
  padding: "8px 14px",
  borderRadius: "6px",
  cursor: "pointer",
  marginRight: "10px",
};

const deleteBtn = {
  background: "#ef4444",
  color: "#fff",
  border: "none",
  padding: "8px 14px",
  borderRadius: "6px",
  cursor: "pointer",
};

function Products() {
  const [products, setProducts] = useState<Product[]>([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const clearForm = () => {
    setName("");
    setPrice("");
    setQuantity("");
    setEditingId(null);
    setIsEditing(false);
  };
    const handleSubmit = async () => {
    if (!name || !price || !quantity) {
      alert("Please fill all fields");
      return;
    }

    try {
      if (isEditing && editingId !== null) {
        await updateProduct(editingId, {
          name,
          price: Number(price),
          quantity: Number(quantity),
        });

        alert("Product Updated Successfully");
      } else {
        await addProduct({
          name,
          price: Number(price),
          quantity: Number(quantity),
        });

        alert("Product Added Successfully");
      }

      clearForm();
      loadProducts();
    } catch (error) {
      console.error(error);
      alert("Operation Failed");
    }
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setIsEditing(true);

    setName(product.name);
    setPrice(product.price.toString());
    setQuantity(product.quantity.toString());
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await deleteProduct(id);
      alert("Product Deleted Successfully");
      loadProducts();
    } catch (error) {
      console.error(error);
      alert("Delete Failed");
    }
  };

  return (
    <div
      style={{
        padding: "30px",
        background: "#f4f6f9",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#1e3a8a",
          marginBottom: "25px",
        }}
      >
        Product Management
      </h1>

      <div
        style={{
          display: "grid",
          gap: "12px",
          maxWidth: "500px",
          margin: "0 auto 30px",
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
                <input
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={inputStyle}
        />

        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          style={inputStyle}
        />

        <button onClick={handleSubmit} style={primaryBtn}>
          {isEditing ? "Update Product" : "Add Product"}
        </button>

        {isEditing && (
          <button onClick={clearForm} style={cancelBtn}>
            Cancel
          </button>
        )}
      </div>

      <div
        style={{
          background: "#fff",
          borderRadius: "10px",
          overflow: "hidden",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr style={{ background: "#1e3a8a", color: "#fff" }}>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Product Name</th>
              <th style={thStyle}>Price</th>
              <th style={thStyle}>Quantity</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>

          <tbody>
                        {products.map((product) => (
              <tr key={product.id}>
                <td style={tdStyle}>{product.id}</td>
                <td style={tdStyle}>{product.name}</td>
                <td style={tdStyle}>₹{product.price}</td>
                <td style={tdStyle}>{product.quantity}</td>

                <td style={tdStyle}>
                  <button
                    onClick={() => handleEdit(product)}
                    style={editBtn}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(product.id)}
                    style={deleteBtn}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Products;