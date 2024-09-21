import axios from "axios";

const checkAuth = () => {
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");
  const PUBLIC_ROUTES = ["login", "forgot-password", "register"];
  const isPublicPage = PUBLIC_ROUTES.some((r) => window.location.href.includes(r));

  // Redirect to login if token is missing and not on a public page
  if (!accessToken && !isPublicPage) {
    window.location.href = "/login";
    return;
  } else {
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

    // Request interceptor to show global loading indicator
    axios.interceptors.request.use(
      function (config) {
        document.body.classList.add("loading-indicator");
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );

    // Response interceptor to hide loading indicator and refresh token on 401
    axios.interceptors.response.use(
      function (response) {
        document.body.classList.remove("loading-indicator");
        return response;
      },
      async function (error) {
        document.body.classList.remove("loading-indicator");

        const originalRequest = error.config;

        // Check for 401 error and refresh the token if the refresh token exists
        if (error.response.status === 401 && refreshToken && !originalRequest._retry) {
          originalRequest._retry = true; // Prevent infinite retry loops

          try {
            const { access, refresh } = await axios.post("/v1/token/refresh/", {
              refresh: refreshToken,
            });

            // Save the new tokens in localStorage
            localStorage.setItem("access_token", access);
            localStorage.setItem("refresh_token", refresh);

            // Update the Authorization header with the new access token
            axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;

            // Retry the original request with the new access token
            return axios(originalRequest);
          } catch (refreshError) {
            // If refreshing the token fails, redirect to login
            window.location.href = "/login";
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );

    return accessToken;
  }
};

export default checkAuth;
