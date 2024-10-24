import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Login() {
    let{register,handleSubmit,formState:{errors}}=useForm()
    let navigate=useNavigate()

    let onSubmit=async(data:any)=>{
        try {
            let response = await axios.post("https://dummyjson.com/auth/login",data)
            console.log(response)
            toast("Login Successfully!")
            setTimeout(()=>{
                navigate('/dashboard')
            },1000)
           
        } catch (error) {
            console.log(error)
            toast("Login Failed!")
        }
    }
   
  return (
    <>
     <ToastContainer />
    <div className='login-container vh-100'>
        
        <div className="row d-flex justify-content-center align-items-center ">
            <div className="col-md-4 mt-5">
                <div className="rounded bg-white mt-5 ">
                    <div className="title text-center p-3 mt-3 ">
                        <h3>User Management System</h3>
                        <h4>SIGN IN</h4>
                        <p className='text-muted'>Enter your credentials to access your account</p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='p-5 form-wrapper'>
                        <label className='form-label'>Username</label>
                        <div className="mb-3">
                            <input placeholder='Enter your email' type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3"
                            {...register("username",{required:("user name is required")})}
                            />

                            {errors.username && <span className='text-danger'>{errors.username.message}</span>}
                        </div>
                        
                        <label className='form-label'>Password</label>
                        <div className="mb-3">
                            <input placeholder='Enter your password' type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3"
                            {...register("password",{required:("password is required")})}
                            />
                             {errors.password && <span className='text-danger'>{errors.password.message}</span>}

                            <button className='btn btn-warning w-100 text-white mt-4'>SIGN IN</button>

                            </div>

                    </div>
                    
                    </form>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}
