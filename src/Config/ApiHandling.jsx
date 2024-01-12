import axios from "axios";

let apiHandle = axios.create({
  baseURL: "http://192.168.18.125:3005/api/",
});


let Get = (endPoint) => {
  return apiHandle.get(endPoint);
};

let GetList = (endPoint, token) => {
  return apiHandle.get(`${endPoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

let GetName = (endPoint, usertype, token) => {
  return apiHandle.get(`${endPoint}/${usertype}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

let Post = (endPoint, body) => {
  return apiHandle.post(`${endPoint}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


let Put = (endPoint, id, body, token) => {
  return apiHandle.put(`${endPoint}/${id}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


let Delete = (endPoint, id, token) => {
  return apiHandle.delete(`${endPoint}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export { Get, Post, Put, Delete, GetName, GetList };