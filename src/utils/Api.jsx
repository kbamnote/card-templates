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

// Function to decode JWT token (using built-in JavaScript functions)
const decodeJWT = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

// Function to get user role from JWT token
export const getUserRole = () => {
  try {
    const token = Cookies.get("card-token");
    if (!token) return null;
    
    const decoded = decodeJWT(token);
    return decoded?.role || 'client'; // Default to client if no role specified
  } catch (error) {
    console.error("Error getting user role:", error);
    return 'client'; // Default to client if error
  }
};

// Function to get appropriate profile read function based on user role
export const getCurrentUserProfileRead = () => {
  const role = getUserRole();
  return role === 'student' ? studentProfileRead : profileRead;
};

// Function to get appropriate profile create function based on user role
export const getCurrentUserProfileCreate = () => {
  const role = getUserRole();
  return role === 'student' ? studentProfileCreate : profileCreate;
};

// Function to get appropriate profile update function based on user role
export const getCurrentUserProfileUpdate = () => {
  const role = getUserRole();
  return role === 'student' ? studentProfileUpdate : profileUpdate;
};

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
      Cookies.remove("card-role");
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
export const profileReadPublic = (userId) => Api.get(`/profile/public/${userId}`);
export const profileUpdate = (data) => Api.put(`/profile/me`, data, {
  headers: { "Content-Type": "application/json" }
});
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

// ============== Student Profile ==============
export const studentProfileCreate = (post) => Api.post("/student-profile/", post);
export const studentProfileRead = () => Api.get("/student-profile/me");
export const studentProfileReadPublic = (userId) => Api.get(`/student-profile/public/${userId}`);
export const studentProfileUpdate = (data) => Api.put(`/student-profile/me`, data, {
  headers: { "Content-Type": "application/json" }
});
export const studentProfileDelete = () => Api.delete("/student-profile/me");
export const uploadStudentProfilePic = (formData) =>
  Api.post("/student-profile/upload/profile-pic", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const uploadStudentBannerPic = (formData) =>
  Api.post("/student-profile/upload/banner-pic", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const updateStudentProfilePic = (formData) =>
  Api.put("/student-profile/upload/profile-pic", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const updateStudentBannerPic = (formData) =>
  Api.put("/student-profile/upload/banner-pic", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// ============== Student Skills ==============
export const studentSkillCreate = (post) => Api.post("/student-skills/", post);
export const studentSkillsRead = () => Api.get("/student-skills/my");
export const studentSkillReadById = (id) => Api.get(`/student-skills/${id}`);
export const studentSkillUpdate = (id, data) => Api.put(`/student-skills/${id}`, data);
export const studentSkillDelete = (id) => Api.delete(`/student-skills/${id}`);

// ============== Student Education ==============
export const studentEducationCreate = (post) => Api.post("/student-educations/", post);
export const studentEducationsRead = () => Api.get("/student-educations/my");
export const studentEducationReadById = (id) => Api.get(`/student-educations/${id}`);
export const studentEducationUpdate = (id, data) => Api.put(`/student-educations/${id}`, data);
export const studentEducationDelete = (id) => Api.delete(`/student-educations/${id}`);

// ============== Student Experience ==============
export const studentExperienceCreate = (post) => Api.post("/student-experiences/", post);
export const studentExperiencesRead = () => Api.get("/student-experiences/my");
export const studentExperienceReadById = (id) => Api.get(`/student-experiences/${id}`);
export const studentExperienceUpdate = (id, data) => Api.put(`/student-experiences/${id}`, data);
export const studentExperienceDelete = (id) => Api.delete(`/student-experiences/${id}`);

// ============== Student Projects ==============
export const studentProjectCreate = (post) => Api.post("/student-projects/", post);
export const studentProjectsRead = () => Api.get("/student-projects/my");
export const studentProjectReadById = (id) => Api.get(`/student-projects/${id}`);
export const studentProjectUpdate = (id, data) => Api.put(`/student-projects/${id}`, data);
export const studentProjectDelete = (id) => Api.delete(`/student-projects/${id}`);

// ============== Student Achievements ==============
export const studentAchievementCreate = (post) => Api.post("/student-achievements/", post);
export const studentAchievementsRead = () => Api.get("/student-achievements/my");
export const studentAchievementReadById = (id) => Api.get(`/student-achievements/${id}`);
export const studentAchievementUpdate = (id, data) => Api.put(`/student-achievements/${id}`, data);
export const studentAchievementDelete = (id) => Api.delete(`/student-achievements/${id}`);

// ============== Services ==============
export const serviceCreate = (post) => Api.post("/services/", post);
export const serviceRead = () => Api.get("/services/my");
export const serviceReadPublic = (userId) => Api.get(`/services/public/${userId}`);
export const serviceUpdate = (id, formData) => Api.put(`/services/${id}`, formData);
export const serviceDelete = (id) => Api.delete(`/services/${id}`);

// ============== Gallery ==============
export const uploadGalleryImg = (formData) =>
  Api.post("/gallery/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const galleryRead = () => Api.get("/gallery/my");
export const galleryReadPublic = (userId) => Api.get(`/gallery/public/${userId}`);
export const galleryReadById = (id) => Api.get(`/gallery/${id}`);
export const galleryDelete = (id) => Api.delete(`/gallery/${id}`);

// ============== Products ==============
export const uploadProductDetails = (formData) =>
  Api.post("/products/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const productRead = () => Api.get("/products/my");
export const productReadPublic = (userId) => Api.get(`/products/public/${userId}`);
export const productReadById = (id) => Api.get(`/products/${id}`);
export const updateProductDetails = (id, formData) =>
  Api.put(`/products/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const productDelete = (id) => Api.delete(`/products/${id}`);

// ============== Testimonials ==============
export const testimonialCreate = (post) => Api.post("/testimonials/", post);
export const testimonialRead = () => Api.get("/testimonials/my");
export const testimonialReadPublic = (userId) => Api.get(`/testimonials/public/${userId}`);
export const testimonialReadById = (id) => Api.get(`/testimonials/${id}`);
export const testimonialUpdate = (id, formData) => Api.put(`/testimonials/${id}`, formData);
export const testimonialDelete = (id) => Api.delete(`/testimonials/${id}`);

// ============== Appointment ==============
export const appointmentCreate = (post) => Api.post("/appointments/", post);
export const appointmentCreatePublic = (userId, post) => Apiauth.post(`/appointments/public/${userId}`, post);
export const apponitmentRead = () => Api.get("/appointments/my");
export const apponitmentReadPublic = (userId) => Api.get(`/appointments/public/${userId}`);
export const apponitmentReadById = (id) => Api.get(`/appointments/${id}`);
export const apponitmentUpdate = (id, formData) => Api.put(`/appointments/${id}`, formData);
export const apponitmentDelete = (id) => Api.delete(`/appointments/${id}`);