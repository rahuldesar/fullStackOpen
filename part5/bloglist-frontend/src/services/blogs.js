import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
}

const create = async newObject => {
  const config = {
    headers : { Authorization : token },
  }
  console.log(baseUrl, newObject, config);
  const response = await axios.post(baseUrl, newObject, config)
  console.log(response);
  return response.data;
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export default { getAll, setToken, create }