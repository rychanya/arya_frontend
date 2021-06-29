import { axios, parseError, get_auth_header } from "@/api/api";

type answerType = string | Array<string> | { [answer: string]: string };

export interface QA {
  _id: string;
  answers: Array<string>;
  type: string;
  question: string;
  extra_answers: Array<string>;
  correct: answerType;
  incorrect: Array<answerType>;
  tags: Array<{ [tag: string]: string }>;
}

export interface Paginator {
  current: number;
  all: number;
}
function search(q: string, page = 1): Promise<[Array<QA>, Paginator]> {
  return new Promise((resolve, reject) => {
    axios({
      url: "/qa/search",
      params: { q: q, page: page },
      method: "GET",
    })
      .then((resp) => {
        resolve(resp.data);
      })
      .catch((error) => {
        reject(parseError(error));
      });
  });
}

function upload(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append("file", file);
    axios({
      url: "qa/upload",
      method: "POST",
      headers: { "Content-Type": "multipart/form-data", ...get_auth_header() },
      data: formData,
    })
      .then((resp) => {
        resolve(resp.data);
      })
      .catch((error) => {
        reject(parseError(error));
      });
  });
}

export { search, upload };
