import {useState,useEffect} from "react"
import {FaSignInAlt} from "react-icons/fa"
import {toast} from "react-toastify"
import { useNavigate } from "react-router-dom"
import {login} from "../features/auth/authSlice"
import {useSelector, useDispatch} from "react-redux"
import Spinner from "../components/Spinner"


function Login(){

    const [formData, setFormData] = useState({
        email:'',
        password:'',
    })

    const {email,password} = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()
    // using selector to access state 
    const {user,isError,isSuccess,isLoading,message} = useSelector(state => state.auth)

    useEffect(()=>{
        if(isError){

            toast.error(message)
        }
        //redirect to login
        if(isSuccess || user){
            navigate("/")
        }
        if(isLoading){
            <Spinner/>
        }

        // dispatch(reset())
    },[isError,isSuccess,user,message,navigate,dispatch])
    const onChange =(e)=>{
        setFormData((prevState)=>({
        ...prevState,
        [e.target.id]:[e.target.value]
        }))
    }

    const onSubmit =(e)=>{
        e.preventDefault() 
        const userData = {
            email,
            password
        }
        dispatch(login(userData))
    }
    return(
        <>
         <section className="heading">
            <h1>
                 <FaSignInAlt/> Login
            </h1>
            <p>Please Login to get support</p>
         </section>
         <section className="form">
         <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input type="text" className="form-control" id="email"
                        value={email} onChange={onChange} placeholder="Enter your email" required></input>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" id="password"
                        value={password} onChange={onChange} placeholder="Enter your password" required></input>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-block">
                            Submit
                        </button>
                    </div>
                </form>
         </section>
        </>
    )
}
export default Login