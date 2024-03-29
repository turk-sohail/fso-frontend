import axios from "axios";
//const baseUrl = "/api/v1/notes";
const baseUrl = "http://localhost:3001/api/v1/notes";
const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const update = async (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

export default {
  getAll,
  create,
  update,
};
