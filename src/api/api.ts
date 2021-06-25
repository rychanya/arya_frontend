import axios, { AxiosError } from "axios";
if (process.env.NODE_ENV == "development") {
  axios.defaults.baseURL = "http://127.0.0.1:8000/";
} else {
  axios.defaults.baseURL = "https://arya-backend.herokuapp.com/";
}
axios.interceptors.response.use(undefined, function (error: AxiosError) {
  return new Promise(function () {
    if (error.response?.status === 401 && error.config) {
      console.log("interceptors");
      console.log(axios.defaults.baseURL);
    }
    throw error;
  });
});

function parseError(error: Error | AxiosError): string {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      return "Server error";
    } else if (error.request) {
      return "The server did not respond";
    } else {
      return "Something went wrong";
    }
  } else {
    return "Something also went wrong";
  }
}

export { axios, parseError };
