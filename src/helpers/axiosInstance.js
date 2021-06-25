import axios from "axios";

export default (history = null) => {
  const baseURL = "https://truly-contacts.herokuapp.com/api";

  let headers = {};

  if (localStorage.auth_token) {
    // console.log(localStorage.auth_token);
    const tokenobj = JSON.parse(localStorage.auth_token);
    const { token } = tokenobj;
    headers.Authorization = `${token}`;
  }

  const axiosInstance = axios.create({
    baseURL: baseURL,
    headers,
  });

  axiosInstance.interceptors.response.use(
    (response) =>
      new Promise((resolve, reject) => {
        resolve(response);
      }),
    (error) => {
      if (!error.response) {
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }

      if (error.response.status === 404) {
        // 404
        localStorage.removeItem("auth_token");

        if (history) {
          history.push("/login");
        } else {
          window.location = "/login";
        }
      } else {
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }
    }
  );

  return axiosInstance;
};
