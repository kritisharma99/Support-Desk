import axios from "axios"

const API_URL = "/api/users/"
//auth endpoint

//register user
const register = async(userData) => {
    //through here we are making request
    const response = await axios.post(API_URL, userData)

    if(response.data){
        //local storage stores the data in string form only
        localStorage.setItem('user',JSON.stringify(response.data))

    }
    return response.data
}

const logout = localStorage.removeItem('user')

const authService ={
    register,
    logout
}

export default authService