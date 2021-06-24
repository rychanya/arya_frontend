import axios, { AxiosError } from "axios";

axios.defaults.baseURL = "https://arya-backend.herokuapp.com/";
axios.interceptors.response.use(undefined, function (error: AxiosError) {
  return new Promise(function () {
    if (error.response?.status === 401 && error.config) {
      console.log("interceptors");
    }
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
