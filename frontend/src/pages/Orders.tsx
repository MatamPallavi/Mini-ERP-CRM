import { useEffect, useState } from "react";
import {
  getOrders,
  addOrder,
  updateOrder,
  deleteOrder,
} from "../services/api";

type Order = {
  id: number;
  customer_name: string;
  product_name: string;
  quantity: number;
  total_price: number;
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

function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  const [customerName, setCustomerName] = useState("");
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [totalPrice, setTotalPrice] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (error) {
      console.error(error);
    }
  };

  const clearForm = () => {
    setCustomerName("");
    setProductName("");
    setQuantity("");
    setTotalPrice("");
    setEditingId(null);
    setIsEditing(false);
  };
    const handleSubmit = async () => {
    if (!customerName || !productName || !quantity || !totalPrice) {
      alert("Please fill all fields");
      return;
    }

    try {
      if (isEditing && editingId !== null) {
        await updateOrder(editingId, {
          customer_name: customerName,
          product_name: productName,
          quantity: Number(quantity),
          total_price: Number(totalPrice),
        });

        alert("Order Updated Successfully");
      } else {
        await addOrder({
          customer_name: customerName,
          product_name: productName,
          quantity: Number(quantity),
          total_price: Number(totalPrice),
        });

        alert("Order Added Successfully");
      }

      clearForm();
      loadOrders();
    } catch (error) {
      console.error(error);
      alert("Operation Failed");
    }
  };

  const handleEdit = (order: Order) => {
    setEditingId(order.id);
    setIsEditing(true);

    setCustomerName(order.customer_name);
    setProductName(order.product_name);
    setQuantity(order.quantity.toString());
    setTotalPrice(order.total_price.toString());
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this order?")) return;

    try {
      await deleteOrder(id);
      alert("Order Deleted Successfully");
      loadOrders();
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
        Order Management
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
          placeholder="Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          style={inputStyle}
        />

        <input
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          style={inputStyle}
        />

        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          style={inputStyle}
        />

        <input
          type="number"
          placeholder="Total Price"
          value={totalPrice}
          onChange={(e) => setTotalPrice(e.target.value)}
          style={inputStyle}
        />

        <button onClick={handleSubmit} style={primaryBtn}>
          {isEditing ? "Update Order" : "Add Order"}
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
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
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
              <th style={thStyle}>Customer</th>
              <th style={thStyle}>Product</th>
              <th style={thStyle}>Quantity</th>
              <th style={thStyle}>Total Price</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>

          <tbody>
                        {orders.map((order) => (
              <tr key={order.id}>
                <td style={tdStyle}>{order.id}</td>
                <td style={tdStyle}>{order.customer_name}</td>
                <td style={tdStyle}>{order.product_name}</td>
                <td style={tdStyle}>{order.quantity}</td>
                <td style={tdStyle}>₹{order.total_price}</td>

                <td style={tdStyle}>
                  <button
                    onClick={() => handleEdit(order)}
                    style={editBtn}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(order.id)}
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

export default Orders;      
      