import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f7fb",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "#1e3a8a",
          color: "white",
          padding: "18px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Mini ERP & CRM</h2>

        <div
          style={{
            display: "flex",
            gap: "25px",
            alignItems: "center",
            fontWeight: "bold",
          }}
        >
          <Link
            to="/dashboard"
            style={{ color: "white", textDecoration: "none" }}
          >
            Dashboard
          </Link>

          <Link
            to="/customers"
            style={{ color: "white", textDecoration: "none" }}
          >
            Customers
          </Link>

          <Link
            to="/products"
            style={{ color: "white", textDecoration: "none" }}
          >
            Products
          </Link>

          <Link
            to="/orders"
            style={{ color: "white", textDecoration: "none" }}
          >
            Orders
          </Link>

          <span style={{ color: "#ffd4d4", cursor: "pointer" }}>
            Logout
          </span>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "35px" }}>
        <h1>Welcome Admin 👋</h1>
        <p>Manage Customers, Products and Orders from one place.</p>

        <div
          style={{
            display: "flex",
            gap: "25px",
            marginTop: "30px",
            flexWrap: "wrap",
          }}
        >
          {/* Customers */}
          <div
            style={{
              width: "240px",
              background: "white",
              borderRadius: "12px",
              padding: "25px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
            }}
          >
            <h3>👥 Customers</h3>
            <h1>25</h1>

            <Link
              to="/customers"
              style={{
                color: "#1e3a8a",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Manage Customers →
            </Link>
          </div>

          {/* Products */}
          <div
            style={{
              width: "240px",
              background: "white",
              borderRadius: "12px",
              padding: "25px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
            }}
          >
            <h3>📦 Products</h3>
            <h1>18</h1>

            <Link
              to="/products"
              style={{
                color: "#1e3a8a",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Manage Products →
            </Link>
          </div>

          {/* Orders */}
          <div
            style={{
              width: "240px",
              background: "white",
              borderRadius: "12px",
              padding: "25px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
            }}
          >
            <h3>🛒 Orders</h3>
            <h1>12</h1>

            <Link
              to="/orders"
              style={{
                color: "#1e3a8a",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Manage Orders →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;