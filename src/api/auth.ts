import { axios, parseError, get_auth_header } from "@/api/api";
import { AxiosError } from "axios";

export interface Login {
  username: string;
  password: string;
}

function login(payload: Login): Promise<string> {
  return new Promise((resolve, reject) => {
    const bodyFormData = new FormData();
    bodyFormData.append("username", payload.username);
    bodyFormData.append("password", payload.password);
    axios({
      url: "user/token",
      data: bodyFormData,
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((resp) => {
        const token = resp.data.access_token;
        resolve(token);
      })
      .catch((err: AxiosError) => {
        if (err.response?.status == 401) {
          reject("Неправильное имя или пароль");
        }
        reject(parseError(err));
      });
  });
}

export interface SiginIn {
  data?: "OK";
  error?: string;
}

function signin(payload: Login): Promise<SiginIn> {
  return new Promise((resolve, reject) => {
    axios({
      url: "user/",
      data: { username: payload.username, password: payload.password },
      method: "POST",
    })
      .then((resp) => {
        resolve(resp.data);
      })
      .catch((err) => {
        reject(parseError(err));
      });
  });
}

function get_current_user(): Promise<string> {
  return new Promise((resolve, reject) => {
    axios({
      url: "user/",
      method: "GET",
      headers: get_auth_header(),
    })
      .then((resp) => {
        resolve(resp.data.data);
      })
      .catch((error) => {
        reject(parseError(error));
      });
  });
}

export { login, signin, get_current_user };
