import { axios, parseError, get_auth_header } from "@/api/api";

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
      url: "/auth/token/",
      data: bodyFormData,
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((resp) => {
        const token = resp.data.access_token;
        resolve(token);
      })
      .catch((err) => {
        reject(parseError(err));
      });
  });
}

function signin(payload: Login): Promise<string> {
  return new Promise((resolve, reject) => {
    axios({
      url: "/auth/signin/",
      data: { username: payload.username, password: payload.password },
      method: "POST",
    })
      .then((resp) => {
        const token = resp.data.access_token;
        resolve(token);
      })
      .catch((err) => {
        reject(parseError(err));
      });
  });
}

function get_current_user(): Promise<string> {
  return new Promise((resolve, reject) => {
    axios({
      url: "/auth/me/",
      method: "GET",
      headers: get_auth_header(),
    })
      .then((resp) => {
        resolve(resp.data);
      })
      .catch((error) => {
        reject(parseError(error));
      });
  });
}

export { login, signin, get_current_user };
