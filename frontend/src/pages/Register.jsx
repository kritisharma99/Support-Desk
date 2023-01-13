import {useState, useEffect} from "react"
import {FaUser} from "react-icons/fa"
import {toast} from "react-toastify"
import {useSelector,useDispatch} from "react-redux"
import {register,reset} from "../features/auth/authSlice"
import {useNavigate} from "react-router-dom"


function Register(){
    const [formData, setFormData] = useState({
        name:'',
        email:'',
        password:'',
        cpassword:'',
    })

    const {name,email,password,cpassword} = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user,isError,isSuccess,isLoading,message} = useSelector(state=>state.auth)

    console.log(user,isError,isSuccess,isLoading,message)
    useEffect(()=>{
        if(isError){
            toast.error(message)
            console.log("error:",message)
        }

        //Redirect to dashboard
        if(isSuccess || user){
            navigate("/")

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
        console.log(typeof password, password)
        console.log(typeof cpassword, cpassword)
        if (String(password)  != String(cpassword)) {
            toast.error('Passwords do not match')
            console.log("123")
            
            
        }
        else{
            const userData = {
                name,
                email,
                password
            }
            dispatch(register(userData))
        }
    }

    
    return(
        <>
            <section className="heading">
                <h1>
                    <FaUser/> Register
                </h1>
                <p>Please create an Account</p>
            </section>
            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input type="text" className="form-control" id="name"
                        value={name} onChange={onChange} placeholder="Enter your name" required></input>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" id="email"
                        value={email} onChange={onChange} placeholder="Enter your email" required></input>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" id="password"
                        value={password} onChange={onChange} placeholder="Enter your password" required></input>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" id="cpassword"
                        value={cpassword} onChange={onChange} placeholder="Re-Enter your password" required></input>
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


export default Register