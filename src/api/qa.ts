import { axios, parseError } from "@/api/api";

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

export interface QAINC {
  _id: string;
  answers: Array<string>;
  type: string;
  question: string;
  is_correct: boolean;
  title: string;
}

export interface Paginator {
  current: number;
  all: number;
}
function search(q: string, page = 1): Promise<Array<QA>> {
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

function getQA(id: string): Promise<QA> {
  return new Promise((resolve, reject) => {
    axios({
      url: `/qa/${id}`,
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

function getQAINC(id: string): Promise<QAINC> {
  return new Promise((resolve, reject) => {
    axios({
      url: `/qa/inc/${id}`,
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

export { search, getQA, getQAINC };
