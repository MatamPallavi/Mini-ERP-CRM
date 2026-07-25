const API_URL = "http://localhost:5000";

// ================= CUSTOMER APIs =================

export async function getCustomers() {
  const response = await fetch(`${API_URL}/customers`);

  if (!response.ok) {
    throw new Error("Failed to fetch customers");
  }

  return response.json();
}

export async function addCustomer(customer: {
  name: string;
  email: string;
  phone: string;
  address: string;
}) {
  const response = await fetch(`${API_URL}/customers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customer),
  });

  if (!response.ok) {
    throw new Error("Failed to add customer");
  }

  return response.json();
}

export async function updateCustomer(
  id: number,
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  }
) {
  const response = await fetch(`${API_URL}/customers/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customer),
  });

  if (!response.ok) {
    throw new Error("Failed to update customer");
  }

  return response.json();
}

export async function deleteCustomer(id: number) {
  const response = await fetch(`${API_URL}/customers/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete customer");
  }

  return response.json();
}
// ================= PRODUCT APIs =================

export async function getProducts() {
  const response = await fetch(`${API_URL}/products`);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}

export async function addProduct(product: {
  name: string;
  price: number;
  quantity: number;
}) {
  const response = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error("Failed to add product");
  }

  return response.json();
}

export async function updateProduct(
  id: number,
  product: {
    name: string;
    price: number;
    quantity: number;
  }
) {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error("Failed to update product");
  }

  return response.json();
}

export async function deleteProduct(id: number) {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete product");
  }

  return response.json();
}

// ================= ORDER APIs =================

export async function getOrders() {
  const response = await fetch(`${API_URL}/orders`);

  if (!response.ok) {
    throw new Error("Failed to fetch orders");
  }

  return response.json();
}

export async function addOrder(order: {
  customer_name: string;
  product_name: string;
  quantity: number;
  total_price: number;
}) {
  const response = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });

  if (!response.ok) {
    throw new Error("Failed to add order");
  }

  return response.json();
}

export async function updateOrder(
  id: number,
  order: {
    customer_name: string;
    product_name: string;
    quantity: number;
    total_price: number;
  }
) {
  const response = await fetch(`${API_URL}/orders/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });

  if (!response.ok) {
    throw new Error("Failed to update order");
  }

  return response.json();
}

export async function deleteOrder(id: number) {
  const response = await fetch(`${API_URL}/orders/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete order");
  }

  return response.json();
}