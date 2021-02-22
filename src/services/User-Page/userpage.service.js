import axios from "axios";
import { API_URL } from "../../config/config";

export const getAllUserService = async () => {
  try {
    const res = await axios.get(API_URL + "users/getAllUser");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const addUserService = async (userData) => {
  try {
    const res = await axios.post(API_URL + "users/addUser", userData);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deleteUserService = async (userInfoId) => {
  try {
    const res = await axios.delete(
      API_URL + `users/deleteUserById/${userInfoId}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const updateUserService = async (userData) => {
  try {
    const res = await axios.put(API_URL + "users/updateUser", userData);
    return res;
  } catch (error) {
    console.log(error);
  }
};
