import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async( content ) => {
  let anecdoteObj = {content, votes : 0};
  let response = await axios.post(baseUrl, anecdoteObj);
  return response.data;
}

const update = async(id, newObject) => {
  let response =await axios.put(`${baseUrl}/${id}`, newObject);
  return response.data;
};


export default { getAll, createNew, update };