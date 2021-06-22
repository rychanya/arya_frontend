import { axios, parseError } from "@/api/api";

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
      url: "/auth/token",
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

export { login };