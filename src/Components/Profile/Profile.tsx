import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
export default function Profile() {
  let navigate=useNavigate();
  const {register,handleSubmit,formState:{errors}}=useForm();

  let onSubmit=async(data)=>{
    try {
      let res = await axios.post('https://dummyjson.com/users/add',data);
      toast.success('user added successfully')
      navigate('/dashboard/users-list')
    } catch (error) {
      toast.error('something wrong!');

    }
  }

  return (
    <>
  <ToastContainer/>
    <div className="m-3">
      <h3>Update User</h3>
    </div>
    <hr />
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className='shadow-lg mt-5 p-4 border rounded'>
        <div className="row">

          <div className='col-md-6'>
            <div className="mb-1">
                      <label className='form-label'>FirstName</label>
                        <div className="mb-3">
                            <input placeholder='Enter your email' type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3"
                            {...register("firstName",{required:("first name is required")})}
                            />

                            {errors.firstName && <span className='text-danger'>{errors.firstName.message}</span>}
                        </div>
          </div>
            </div>


            <div className='col-md-6'>
            <div className="mb-1">
                      <label className='form-label'>LastName</label>
                        <div className="mb-3">
                            <input placeholder='Enter your email' type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3"
                            {...register("lastName",{required:("last name is required")})}
                            />

                            {errors.lastName && <span className='text-danger'>{errors.lastName.message}</span>}
                        </div>
          </div>
            </div>
          
          </div>


          <div className="row">

          <div className='col-md-6'>
            <div className="mb-1">
                      <label className='form-label'>Email</label>
                        <div className="mb-3">
                            <input placeholder='Enter your email' type="email" className="form-control" id="basic-url" aria-describedby="basic-addon3"
                            {...register("email",{required:("user email is required"),
                              pattern:{value:/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm,message:'please enter valid email'},
                            })}
                            />

                            {errors.email && <span className='text-danger'>{errors.email.message}</span>}
                        </div>
          </div>
            </div>


            <div className='col-md-6'>
            <div className="mb-1">
                      <label className='form-label'>Age</label>
                        <div className="mb-3">
                            <input placeholder='Enter your email' type="number" className="form-control" id="basic-url" aria-describedby="basic-addon3"
                            {...register("age",{required:("user age is required")})}
                            />

                            {errors.age && <span className='text-danger'>{errors.age.message}</span>}
                        </div>
          </div>
            </div>
          
          </div>


          <div className="row">

          <div className='col-md-6'>
            <div className="mb-1">
                      <label className='form-label'>Phone Number</label>
                        <div className="mb-3">
                            <input placeholder='Enter your email' type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3"
                            {...register("phone",{required:("user num is required")})}
                            />

                            {errors.phone && <span className='text-danger'>{errors.phone.message}</span>}
                        </div>
          </div>
            </div>


            <div className='col-md-6'>
            <div className="mb-1">
                      <label className='form-label'>Birth Date</label>
                        <div className="mb-3">
                            <input placeholder='Enter your email' type="date" className="form-control" id="basic-url" aria-describedby="basic-addon3"
                            {...register("birthDate",{required:("user birthDate is required")})}
                            />

                            {errors.birthDate && <span className='text-danger'>{errors.birthDate.message}</span>}
                        </div>
          </div>
            </div>
          
          </div>
        <button className='btn btn-warning text-center'>Save</button>  
      </form>
    </div>
    </>
  )
}
