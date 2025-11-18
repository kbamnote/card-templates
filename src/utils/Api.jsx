import axios from "axios";
import Cookies from "js-cookie";

// Base URL - Update this to your backend URL
const BASE_URL = "https://elitedigitalcardsbackend-production.up.railway.app/api";

const Api = axios.create({
  baseURL: BASE_URL,
});

const Apiauth = axios.create({
  baseURL: BASE_URL,
});

Api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("card-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

Api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Token expired or invalid
      Cookies.remove("card-token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// ============== AUTH ==============
export const login = (post) => Apiauth.post("/auth/login", post);
export const forgotPassword = (post) => Apiauth.post("/password/forgot-password", post);
export const verifyOTP = (post) => Apiauth.post("/password/verify-otp", post);
export const resetPassword = (post) => Apiauth.post("/password/reset-password", post);
export const resendOTP = (post) => Apiauth.post("/password/forgot-password", post);

// ============== Profile ==============
export const profileCreate = (post) => Api.post("/profile/", post);
export const profileRead = () => Api.get("/profile/me");
export const profileUpdate = (formData) => Api.put(`/profile/me`, formData);
export const profileDelete = () => Api.delete("/profile/me");
export const uploadProfileImg = (formData) =>
  Api.post("/profile/upload/profile-image", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const uploadBannerImg = (formData) =>
  Api.post("/profile/upload/banner-image", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const updateProfileImg = (formData) =>
  Api.put("/profile/upload/profile-image", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const updateBannerImg = (formData) =>
  Api.put("/profile/upload/banner-image", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// ============== Services ==============
export const serviceCreate = (post) => Api.post("/services/", post);
export const serviceRead = () => Api.get("/services/my");
export const serviceUpdate = (id, formData) => Api.put(`/services/${id}`, formData);
export const serviceDelete = (id) => Api.delete(`/services/${id}`);

// ============== Gallery ==============
export const uploadGalleryImg = (formData) =>
  Api.post("/gallery/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const galleryRead = () => Api.get("/gallery/my");
export const galleryReadById = (id) => Api.get(`/gallery/${id}`);
export const galleryDelete = (id) => Api.delete(`/gallery/${id}`);

// ============== Products ==============
export const uploadProductDetails = (formData) =>
  Api.post("/products/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const productRead = () => Api.get("/products/my");
export const productReadById = (id) => Api.get(`/products/${id}`);
export const updateProductDetails = (id, formData) =>
  Api.put(`/products/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const productDelete = (id) => Api.delete(`/products/${id}`);

// ============== Testimonials ==============
export const testimonialCreate = (post) => Api.post("/testimonials/", post);
export const testimonialRead = () => Api.get("/testimonials/my");
export const testimonialReadById = (id) => Api.get(`/testimonials/${id}`);
export const testimonialUpdate = (id, formData) => Api.put(`/testimonials/${id}`, formData);
export const testimonialDelete = (id) => Api.delete(`/testimonials/${id}`);

// ============== Appointment ==============
export const apponitmentCreate = (post) => Api.post("/appointments/", post);
export const apponitmentRead = () => Api.get("/appointments/my");
export const apponitmentReadById = (id) => Api.get(`/appointments/${id}`);
export const apponitmentUpdate = (id, formData) => Api.put(`/appointments/${id}`, formData);
export const apponitmentDelete = (id) => Api.delete(`/appointments/${id}`);