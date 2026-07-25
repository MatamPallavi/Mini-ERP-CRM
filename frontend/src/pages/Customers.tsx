import { useEffect, useState } from "react";
import {
  getCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer,
} from "../services/api";

type Customer = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
};

function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      const data = await getCustomers();
      setCustomers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const clearForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setAddress("");
    setEditingId(null);
    setIsEditing(false);
  };

  const handleSubmit = async () => {
    if (!name || !email || !phone || !address) {
      alert("Please fill all fields");
      return;
    }

    try {
      if (isEditing && editingId !== null) {
        await updateCustomer(editingId, {
          name,
          email,
          phone,
          address,
        });

        alert("Customer Updated Successfully");
      } else {
        await addCustomer({
          name,
          email,
          phone,
          address,
        });

        alert("Customer Added Successfully");
      }

      clearForm();
      loadCustomers();
    } catch (error) {
      console.error(error);
      alert("Operation Failed");
    }
  };

  const handleEdit = (customer: Customer) => {
    setEditingId(customer.id);
    setIsEditing(true);

    setName(customer.name);
    setEmail(customer.email);
    setPhone(customer.phone);
    setAddress(customer.address);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this customer?")) return;

    try {
      await deleteCustomer(id);
      alert("Customer Deleted Successfully");
      loadCustomers();
    } catch (error) {
      console.error(error);
      alert("Delete Failed");
    }
  };

  return (
    <div
      style={{
        padding: "30px",
        backgroundColor: "#f4f6f9",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#1e3a8a",
          marginBottom: "30px",
        }}
      >
        Customer Management
      </h1>

      <div
        style={{
          maxWidth: "500px",
          margin: "0 auto 40px",
          background: "#fff",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          display: "grid",
          gap: "12px",
        }}
      >
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        <input
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={inputStyle}
        />

        <input
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={inputStyle}
        />

        <button
          onClick={handleSubmit}
          style={{
            backgroundColor: "#2563eb",
            color: "white",
            padding: "12px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "15px",
          }}
        >
          {isEditing ? "Update Customer" : "Add Customer"}
        </button>

        {isEditing && (
          <button
            onClick={clearForm}
            style={{
              backgroundColor: "#6b7280",
              color: "white",
              padding: "12px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        )}
      </div>

      <div
        style={{
          overflowX: "auto",
          background: "#fff",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#1e3a8a", color: "white" }}>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Phone</th>
              <th style={thStyle}>Address</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td style={tdStyle}>{customer.id}</td>
                <td style={tdStyle}>{customer.name}</td>
                <td style={tdStyle}>{customer.email}</td>
                <td style={tdStyle}>{customer.phone}</td>
                <td style={tdStyle}>{customer.address}</td>

                <td style={tdStyle}>
                  <button
                    onClick={() => handleEdit(customer)}
                    style={{
                      backgroundColor: "#10b981",
                      color: "white",
                      border: "none",
                      padding: "8px 14px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      marginRight: "10px",
                    }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(customer.id)}
                    style={{
                      backgroundColor: "#ef4444",
                      color: "white",
                      border: "none",
                      padding: "8px 14px",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
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

const inputStyle = {
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  fontSize: "15px",
};

const thStyle = {
  padding: "14px",
};

const tdStyle = {
  padding: "12px",
  borderBottom: "1px solid #ddd",
  textAlign: "center" as const,
};

export default Customers;