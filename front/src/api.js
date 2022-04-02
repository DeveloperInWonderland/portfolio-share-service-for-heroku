import axios from "axios";

const serverUrl = "https://" + window.location.hostname + "/";

// credential 인증 추가
axios.defaults.withCredentials = true;

// 기존 토큰이 만료되어 서버에서 새로 access token을 보냈을 경우 새 access token을 sessionStorage에 저장
// axios interceptor를 이용해 모든 요청에 적용할 수 있게 함
axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function(error) {
    // error.response가 있는 경우, error에서 상태 코드와 요청 내용을 가져옴
    if (error.response) {
      const { config, response: { status } } = error;

      // 상태 코드가 401인 경우만 access token 재발급
      if (status === 401) {
        // 기존 요청 가져오기
        const originalRequest = config;
        // 서버에서 보내준 새 access token 가져와서 session storage에 새로 저장
        const newAccessToken = error.response.data.newAccessToken;
        sessionStorage.setItem("userToken", newAccessToken);

        // 기존 요청의 헤더에도 새 access token 적용
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        // 기존 요청을 다시 보내서 하려던 작업이 제대로 수행되게 함
        return axios(originalRequest);
      }
    }
    return Promise.reject(error);
  }
)



async function get(endpoint, params = "") {
  console.log(
    `%cGET 요청 ${serverUrl + endpoint + "/" + params}`,
    "color: #a25cd1;"
  );

  return axios.get(serverUrl + endpoint + "/" + params, {
    // JWT 토큰을 헤더에 담아 백엔드 서버에 보냄.
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
    },
  });
}

async function post(endpoint, data) {
  // JSON.stringify 함수: Javascript 객체를 JSON 형태로 변환함.
  // 예시: {name: "Kim"} => {"name": "Kim"}
  const bodyData = JSON.stringify(data);
  console.log(`%cPOST 요청: ${serverUrl + endpoint}`, "color: #296aba;");
  console.log(`%cPOST 요청 데이터: ${bodyData}`, "color: #296aba;");

  return axios.post(serverUrl + endpoint, bodyData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
    },
  })
}

async function imgPost(endpoint, formData) {
  console.log(`%cPOST 요청: ${serverUrl + endpoint}`, "color: #296aba;");
  console.log(`%cPOST 요청 데이터: ${formData}`, "color: #296aba;");

  return axios.post(serverUrl + endpoint, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
    },
  });
}

async function put(endpoint, data) {
  // JSON.stringify 함수: Javascript 객체를 JSON 형태로 변환함.
  // 예시: {name: "Kim"} => {"name": "Kim"}
  const bodyData = JSON.stringify(data);
  console.log(`%cPUT 요청: ${serverUrl + endpoint}`, "color: #059c4b;");
  console.log(`%cPUT 요청 데이터: ${bodyData}`, "color: #059c4b;");

  return axios.put(serverUrl + endpoint, bodyData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
    },
  });
}

async function imgPut(endpoint, formData) {
  console.log(`%cPUT 요청: ${serverUrl + endpoint}`, "color: #059c4b;");
  console.log(`%cPUT 요청 데이터: ${formData}`, "color: #059c4b;");

  return axios.put(serverUrl + endpoint, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
    },
  });
}

// 아래 함수명에 관해, delete 단어는 자바스크립트의 reserved 단어이기에,
// 여기서는 우선 delete 대신 del로 쓰고 아래 export 시에 delete로 alias 함.
async function del(endpoint, params = "") {
  console.log(`DELETE 요청 ${serverUrl + endpoint + "/" + params}`);
  return axios.delete(serverUrl + endpoint + "/" + params, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
    },
  });
}

// 아래처럼 export한 후, import * as A 방식으로 가져오면,
// A.get, A.post 로 쓸 수 있음.
export { get, post, imgPost, put, imgPut, del as delete };
