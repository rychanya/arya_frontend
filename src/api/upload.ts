import { axios, parseError, get_auth_header } from "@/api/api";

export interface UploadEl {
  id: string;
  col: string;
  new: boolean;
}

export interface Upload {
  _id: string;
  data: Array<UploadEl>;
  by: string;
}

export interface XLSXQA {
  "#": string;
  Вопрос: string;
  Правильный: string;
  Баллы: string;
  Ответ: string;
  "Затраченное время (сек.)": string;
  Тип: string;
  title?: string;
}

function upload(data: XLSXQA): Promise<string> {
  return new Promise((resolve, reject) => {
    axios({
      withCredentials: true,
      url: "uploads",
      method: "POST",
      headers: get_auth_header(),
      data: {
        answer: data["Вопрос"],
        title: data["title"],
        question: data["Вопрос"],
        type: data["Тип"],
        is_correct: data["Правильный"],
      },
    })
      .then((resp) => {
        resolve(resp.data);
      })
      .catch((error) => {
        reject(parseError(error));
      });
  });
}

function getUploadByID(id: string): Promise<Upload> {
  return new Promise((resolve, reject) => {
    axios({
      url: `uploads/${id}`,
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

function getUploads(): Promise<Array<Upload>> {
  return new Promise((resolve, reject) => {
    axios({
      url: `uploads`,
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

function downloadByID(id: string): Promise<void> {
  console.log(id);
  return new Promise((resolve, reject) => {
    axios({
      url: `uploads/file/${id}`,
      method: "GET",
      responseType: "blob",
      headers: get_auth_header(),
    })
      .then((resp) => {
        const fileURL = window.URL.createObjectURL(new Blob([resp.data]));
        const link = document.createElement("a");
        link.href = fileURL;
        link.setAttribute("download", `${id}.xlsx`);
        document.body.appendChild(link);
        link.click();
        resolve();
      })
      .catch((error) => {
        reject(parseError(error));
      });
  });
}

export { upload, getUploadByID, downloadByID, getUploads };
