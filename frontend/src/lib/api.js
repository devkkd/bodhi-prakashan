import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

// ✅ FIXED INTERCEPTOR
API.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const userToken = localStorage.getItem("userToken");
      const adminToken = localStorage.getItem("adminToken");

      const isAdminRoute = config.url?.startsWith("/admin");

      if (isAdminRoute) {
        if (adminToken) {
          config.headers.Authorization = `Bearer ${adminToken}`;
        }
      } else {
        if (userToken) {
          config.headers.Authorization = `Bearer ${userToken}`;
        }
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ============================
// 🛠️ ADMIN APIs
// ============================

export const getAdminOrders = () =>
  API.get("/admin/orders");

export const updateOrderStatus = (id, status) =>
  API.put(`/admin/orders/${id}/status`, { status });

// 🔥 NEW: GET ALL USERS
export const getAllUsers = () =>
  API.get("/admin/users");

export const getUserById = (id) => API.get(`/admin/users/${id}`); // 🔥 Add this line

// =====================================================
// 🔐 AUTH APIs
// =====================================================

export const sendOtp = (data) => API.post("/auth/send-otp", data);
export const verifyOtp = (data) => API.post("/auth/verify-otp", data);
export const getDevOtp = (phone) => API.get(`/auth/dev-otp/${phone}`);

// =====================================================
// 👤 USER APIs
// =====================================================

export const updateProfile = (data) =>
  API.post("/user/profile", data);

// =====================================================
// 📍 ADDRESS APIs
// =====================================================

export const addAddress = (data) =>
  API.post("/user/address", data);

export const getAddresses = () =>
  API.get("/user/addresses");

// =====================================================
// 📂 CATEGORY APIs
// =====================================================

export const getCategories = () =>
  API.get("/categories");

export const createCategory = (data) =>
  API.post("/categories", data);

export const deleteCategory = (id) =>
  API.delete(`/categories/${id}`);

// =====================================================
// 📂 SUBCATEGORY APIs
// =====================================================

export const getSubCategories = () =>
  API.get("/subcategories");

export const createSubCategory = (data) =>
  API.post("/subcategories", data);

export const deleteSubCategory = (id) =>
  API.delete(`/subcategories/${id}`);

// =====================================================
// 🛒 PRODUCT APIs
// =====================================================

export const getProducts = () =>
  API.get("/products");

export const getProductById = (id) =>
  API.get(`/products/${id}`);

export const createProduct = (data) =>
  API.post("/products", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const updateProduct = (id, data) =>
  API.put(`/products/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const deleteProduct = (id) =>
  API.delete(`/products/${id}`);

// =====================================================
// 🛍️ CART APIs
// =====================================================

export const addToCart = (data) =>
  API.post("/cart/add", data);

export const getCart = () =>
  API.get("/cart");

export const updateCart = (data) =>
  API.put("/cart/update", data);

export const removeFromCart = (productId) =>
  API.delete(`/cart/remove/${productId}`);

// =====================================================
// 🛍️ Orders
// =====================================================

export const getOrders = () =>
  API.get("/orders");

export const createOrder = (data) =>
  API.post("/orders", data);

export const createRazorpayOrder = () =>
  API.post("/orders/create");

export const verifyPayment = (data) =>
  API.post("/orders/verify", data);

export const mergeCart = (data) =>
  API.post("/cart/merge", data);

// Add this under your public APIs section
export const submitContactForm = (data) =>
  API.post("/inquiries", data);

// Add this under your ADMIN APIs section
export const getAdminInquiries = () =>
  API.get("/admin/inquiries");

export const updateInquiryStatus = (id, status) =>
  API.put(`/admin/inquiries/${id}/status`, { status });

export default API;