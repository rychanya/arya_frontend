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

function upload(data: any): Promise<string> {
  return new Promise((resolve, reject) => {
    // const formData = new FormData();
    // formData.append("file", file);
    // formData.append("a", "nnn");
    axios({
      withCredentials: true,
      url: "uploads",
      method: "POST",
      headers: get_auth_header(),
      // data: formData,
      data: {user: '1'},
    })
      .then((resp) => {
        resolve(resp.data);
      })
      .catch((error) => {
        reject(parseError(error));
      });
  });
}

// function upload(file: File): Promise<string> {
//   return new Promise((resolve, reject) => {
//     const formData = new FormData();
//     // formData.append("file", file);
//     formData.append("idd", "123");
//     fetch(`${axios.defaults.baseURL}uploads`, {
//       mode: "cors",
//       credentials: "include",
//       method: "POST",
//       body: formData,
//       headers: get_auth_header(),
//     })
//       .then((resp) => {
//         resolve(resp.json());
//       })
//       .catch((error) => {
//         console.log(error);
//         reject();
//       });
//   });
// }

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
