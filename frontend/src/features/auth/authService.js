import axios from 'axios'

const API_URL = '/api/users/'

//Register User
//in this way we make request to pur end point
const register = async(userData)=>{
    const response = await axios.post(API_URL,userData)

    if(response.data)
    {
        //local storage holds only string thts why we converted into string
        localStorage.setItem('user',JSON.stringify(response.data))
    }
    return response.data
}

const authService = {
    register,
}
export default authService
