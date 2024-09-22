import axios from "axios";

// Create a separate axios instance for token refresh requests
const refreshAxios = axios.create();

refreshAxios.defaults.baseURL = process.env.REACT_APP_BASE_URL

const checkAuth = () => {
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");
  const PUBLIC_ROUTES = ["login", "forgot-password", "register"];
  const isPublicPage = PUBLIC_ROUTES.some((r) => window.location.href.includes(r));

  // Redirect to login if token is missing and not on a public page
  if (!accessToken && !isPublicPage) {
    window.location.href = "/login";
    return;
  } else if (accessToken) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }

  // Request interceptor to show global loading indicator
  axios.interceptors.request.use(
    function (config) {
      document.body.classList.add("loading-indicator");
      return config;
    },
    function (error) {
      document.body.classList.remove("loading-indicator");
      return Promise.reject(error);
    }
  );

  // Response interceptor to hide loading indicator and handle token refresh
  axios.interceptors.response.use(
    function (response) {
      document.body.classList.remove("loading-indicator");
      return response;
    },
    async function (error) {
      document.body.classList.remove("loading-indicator");
      const originalRequest = error.config;

      // Check for 401 error and valid refresh token
      if (error.response && error.response.status === 401 && refreshToken && !originalRequest._retry) {
        originalRequest._retry = true; // Mark this request as retried

        try {
          // Attempt to refresh the token using the separate refreshAxios instance
          const response = await refreshAxios.post("/v1/token/refresh/", {
            refresh: refreshToken,
          });

          // Save the new tokens in localStorage if refresh was successful
          const { access, refresh } = response.data;
          localStorage.setItem("access_token", access);
          localStorage.setItem("refresh_token", refresh);

          // Update the Authorization header with the new access token
          axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;

          // Retry the original request with the new access token
          return axios(originalRequest);
        } catch (refreshError) {
          // Handle invalid or expired refresh token
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );

  return accessToken;
};

export default checkAuth;
