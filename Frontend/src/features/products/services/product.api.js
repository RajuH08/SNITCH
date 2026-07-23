import axios from "axios";

const productApiInstance = axios.create({
  baseURL: "/api/products",
  withCredentials: true,
});

function getAuthHeaders() {
  const storedToken = localStorage.getItem("snitch_auth_token");
  const cookieToken = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith("token="))
    ?.split("=")[1];
  const token = storedToken || cookieToken;

  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function createProduct(formData) {
  const response = await productApiInstance.post("/", formData, {
    headers: getAuthHeaders(),
  });
  return response.data;
}

export async function getSellerProduct() {
  const response = await productApiInstance.get("/seller", {
    headers: getAuthHeaders(),
  });
  return response.data;
}
