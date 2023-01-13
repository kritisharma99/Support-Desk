import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import authService from "../auth/authService"


//get user details from local storage
const user = JSON.parse(localStorage.getItem('user'))
const initialState ={
    user:user ? user : null,
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:''
}

export const register = createAsyncThunk('auth/register', async(user,thunkAPI)=>{
    try 
    {
        return await authService.register(user)    
    } 
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
        || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const login = createAsyncThunk('auth/login', async(user,thunkAPI)=>{
    console.log(user)
})


export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        reset: (state) =>{
            state.isError = false
            state.isSuccess = false
            state.isLoading =false
            state.message =''
        }
    },
    extraReducers:(builder)=>{
        //To handle if async not fullfilled (see redux dev tool while submitting register form)
        builder.addCase(register.pending,(state)=>{
            state.isLoading(true)
        })
        .addCase(register.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.user = action.payload
        })
        .addCase(register.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            //payload comes from line 20
            state.isError=action.payload
            state.user = null
        })
    }
})
export const { reset } = authSlice.actions
export default authSlice.reducer

