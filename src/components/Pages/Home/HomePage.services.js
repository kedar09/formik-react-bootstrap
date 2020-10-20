import axios from 'axios';
const baseUrl = "http://localhost:3001/";

export const getAllUser = () => {
   return axios.get(baseUrl + 'users/getAllUser')
        .then(res => res.data); 
}

export const addUser = (userData) => {
    return axios.post(baseUrl + 'users/addUser', userData)
         .then(res => res); 
 }
