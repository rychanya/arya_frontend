import axios from "axios";

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

axios.defaults.baseURL = "https://arya-backend.herokuapp.com/";

function parseError(error: any): string {
  if (error.response) {
    return "Server error";
  } else if (error.request) {
    return "The server did not respond";
  } else {
    return "Something went wrong";
  }
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

export { search };
