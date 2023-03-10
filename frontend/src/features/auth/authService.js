import axios from "axios";

const API_URL = "/api/users/";
//auth endpoint

//register user
const register = async (userData) => {
  //through here we are making request
  const response = await axios.post(API_URL, {
    name: userData.name[0],
    email: userData.email[0],
    password: userData.password[0],
  });

  if (response.data) {
    //local storage stores the data in string form only
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
//Login
const login = async (userData) => {
  //through here we are making request
  const response = await axios.post(API_URL + "login", userData);

  if (response.data) {
    //local storage stores the data in string form only
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = localStorage.removeItem("user");

const authService = {
  register,
  logout,
  login,
};

export default authService;
