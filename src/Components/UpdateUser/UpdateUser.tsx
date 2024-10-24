import { useForm, SubmitHandler } from "react-hook-form";
import PageHeader from "../pagehader/PageHeader";
import "./userData.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

type UserFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: number;
  birthDate: string;
};

export default function UserData() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UserFormData>();

  const onSubmit: SubmitHandler<UserFormData> = async (data) => {
    setIsLoading(true);
    try {
      if (userId) {
        await axios.put(https://dummyjson.com/users/${userId}, data);
        toast.success("User updated successfully!");
      } else {
        await axios.post("https://dummyjson.com/users/add", data);
        toast.success("User added successfully!");
      }
      
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      getUserDataById(userId);
    }
  }, [userId]);

  const getUserDataById = async (id: string) => {
    setIsLoading(true);
    try {
      const res = await axios.get(https://dummyjson.com/users/${id});
      const userInfo = res.data;
      setValue("firstName", userInfo.firstName);
      setValue("lastName", userInfo.lastName);
      setValue("email", userInfo.email);
      setValue("phone", userInfo.phone);
      setValue("age", userInfo.age);
      setValue("birthDate", formatDate(userInfo.birthDate));
      toast.success("User information retrieved successfully!");
    } catch (error: any) {
      toast.error("Error fetching user data: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // YYYY-MM-DD format
  };

  return (
    <>
      <PageHeader headerText={userId ? "Edit User" : "Add User"} />
      <div className="container-fluid my-5 py-5 d-flex justify-content-center align-items-center">
        <div className="form-body w-75 py-5">
          {isLoading ? (
            <div className="text-center py-5">
              <h1 className="py-3">Loading...</h1>
              <i className="py-3 fa fa-spinner fa-spin fa-3x" aria-hidden="true"></i>
            </div>
          ) : (
            <form className="row m-auto bg-white p-3 mx-3" onSubmit={handleSubmit(onSubmit)}>
              {/* Form Fields */}
              <div className="col-md-6 py-4">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your First Name"
                  {...register("firstName", {
                    required: "First name is required",
                    minLength: { value: 3, message: "Minimum length is 3 characters" },
                  })}
                />
                {errors.firstName && <small className="text-danger">{errors.firstName.message}</small>}
              </div>
              {/* Additional fields (Last Name, Email, Phone, etc.) */}
              <div className="d-flex justify-content-center">
                <button className="btn btn-warning sign-btn w-50 py-2 text-white mt-3" disabled={isLoading}>
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