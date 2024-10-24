import { useForm } from "react-hook-form";
import "./UserData";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export default function UserData() {
  const [isLoading, setIsLoading]: any = useState(false);
  let { userId } = useParams();
  let navigate = useNavigate();

  let {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  }: any = useForm();
  let onSubmit = async (data: any) => {
    try {
      let res;
      if (userId) {
        // update user(edit)
        res = await axios.put(`https://dummyjson.com/users/${userId}`, data);
        toast.success("User updated successfully!");
      } else {
        // add new user
        res = await axios.post("https://dummyjson.com/users/add", data);
        console.log(res.data);
        toast.success("user added successfully!");
      }
     
    } catch (error) {
      console.log(error);
      toast.error(`${error}`);
    }
  };

  useEffect(() => {
    if (userId) {
      getUserDataById(userId);
    }
  }, [userId]);

  const getUserDataById = async (id: any) => {
    setIsLoading(true);
    try {
      const res = await axios.get(`https://dummyjson.com/users/${id}`);
      const userInfo = res.data;
      setValue("firstName", userInfo.firstName);
      setValue("lastName", userInfo.lastName);
      setValue("email", userInfo.email);
      setValue("phone", userInfo.phone);
      setValue("age", userInfo.age);
      setValue("birthDate", formatDate(userInfo.birthDate));
      toast.success("get userInfo by id successfully!");
      setIsLoading(false);
    } catch (error) {
      toast.error(`Error fetching userInfo data! ${error}`);
      setIsLoading(false);
    }
  };
  //format Date
  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  return (
    <>
      
      <div className="container-fluid my-5 py-5  d-flex justify-content-center align-items-center">
        <div className="form-body w-75  py-5  ">
          {isLoading ? (
            <div className="text-center py-5">
              <h1 className="py-3">Loading...</h1>
              <i
                className="py-3 fa fa-spinner fa-spin fa-3x"
                aria-hidden="true"
              ></i>
            </div>
          ) : (
            <form
              className=" row  m-auto bg-white p-3 mx-3 "
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="col-md-6 py-4 ">
                <div className=" ">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Enter your First Name"
                    {...register("firstName", {
                      required: "Enter firstName",
                      minLength: 3,
                    })}
                  />
                </div>
                {errors.firstName && (
                  <small className="text-danger">
                    {errors.firstName.message}
                  </small>
                )}
              </div>
              <div className="col-md-6 py-4 ">
                <div className=" ">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Enter your Last Name"
                    {...register("lastName", {
                      required: "Enter lastName",
                      minLength: 3,
                    })}
                  />
                  {errors.lastName && (
                    <small className="text-danger">
                      {errors.lastName.message}
                    </small>
                  )}
                </div>
              </div>
              <div className="col-md-6 py-4 ">
                <div className=" ">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Enter your Email"
                    {...register("email", {
                      required: "Enter your Email",
                      pattern: {
                        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                        message: "email should be valid !",
                      },
                    })}
                  />
                  {errors.email && (
                    <small className="text-danger">
                      {errors.email.message}
                    </small>
                  )}
                </div>
              </div>
              <div className="col-md-6 py-4 ">
                <div className=" ">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Enter your Phone Number"
                    {...register("phone", {
                      required: "Enter your phone number",
                    })}
                  />
                  {errors.phone && (
                    <small className="text-danger">
                      {errors.phone.message}
                    </small>
                  )}
                </div>
              </div>

              <div className="col-md-6 py-4 ">
                <div className=" ">
                  <label className="form-label">Age</label>
                  <input
                    type="number"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Enter your Age"
                    {...register("age", {
                      required: "Age is required! ",
                      max: { value: 50, message: "max age is 50 " },
                    })}
                  />
                  {errors.age && (
                    <small className="text-danger">{errors.age.message}</small>
                  )}
                </div>
              </div>
              <div className="col-md-6 py-4 ">
                <div className=" ">
                  <label className="form-label">Birth Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Enter your birth Date"
                    {...register("birthDate", {
                      required: "Enter your birth date",
                    })}
                  />
                  {errors.birthDate && (
                    <small className="text-danger">
                      {errors.birthDate.message}
                    </small>
                  )}
                </div>
              </div>
              <div className="d-flex justify-content-center ">
                <button className="btn btn-warning sign-btn w-50 py-2 text-white mt-3">
                  {userId ? "Update" : "Save"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
}