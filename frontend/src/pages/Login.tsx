import { useState } from "react";

type LoginProps = {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

function Login({ setIsLoggedIn }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login Successful");
        console.log(data);

        // Login success అయితే Dashboard కి వెళ్తుంది
        setIsLoggedIn(true);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Unable to connect to backend");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "10px",
          width: "320px",
          boxShadow: "0 0 10px rgba(0,0,0,0.2)",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Login</h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "15px",
            marginBottom: "15px",
            boxSizing: "border-box",
          }}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "20px",
            boxSizing: "border-box",
          }}
        />

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "blue",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;