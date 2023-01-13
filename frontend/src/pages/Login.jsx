import {useState} from "react"
import {FaSignInAlt} from "react-icons/fa"
import {toast} from "react-toastify"
import {useSelector,useDispatch} from "react-redux"
import {login} from "../features/auth/authSlice"



function Login(){
    const [formData, setFormData] = useState({
        email:'',
        password:'',
    })

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

    const {name,email,password,cpassword} = formData

    const dispatch = useDispatch()

    const { user,isSuccess,isLoading,message} = useSelector(state=>state.auth)
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
                        <input type="text" className="form-control" id="password"
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