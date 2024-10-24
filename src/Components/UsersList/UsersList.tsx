import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { Button, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UsersList() {
  //modal 
  const [show, setShow] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userData,setUserData]= useState({})


  const handleClose = () => setShow(false);
  const handleShow = (user) =>{

  setShow(true); 
  setUserId(user.id)
  setUserData(user)
  }
   //modal
  let[users,setUsers]=useState([]);
 

  let getUsers=async()=>{
    try {
      let response = await axios.get('https://dummyjson.com/users')
      setUsers(response.data?.users)
    } catch (error) {
      console.log(error);
    }
  };


  let deleteUser= async()=>{
    try {
      let response= await axios.delete(`https://dummyjson.com/users/${userId}`)
      console.log(response)
      toast.success('deleted Success!')
      handleClose()
    } 
    catch (error) {
      console.log(error)
      toast.error('Something wrong happened!')
      
    }
  }


  useEffect(()=>{
    getUsers();
  },[]);

  return (

    <>
    <ToastContainer/>
    <div>
      <div className='d-flex justify-content-between m-3'>
        <h3>Users List</h3>
        <button className='btn btn-warning text-white'>ADD NEW User</button>
      </div>
      <hr />
      <div>
      <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col"></th>
      <th scope="col">firstName</th>
      <th scope="col">lastName</th>
      <th scope="col">Email</th>
      <th scope="col">Phone</th>
      <th scope="col">BirthDay Date</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>

  <tbody>
    {users.map((user,index)=>(

      <tr key={index}>
      <th scope="col">{user.id}</th>
      <th scope="col"><img src={user.image} className='w-25' alt="" /></th>
      <th scope="row">{user.firstName}</th>
      <td>{user.lastName}</td>
      <td>{user.email}</td>
      <td>{user.phone}</td>
      <td>{user.birthDate}</td>
      <td><FaEdit className='text-warning mx-2' size={30}/></td>
      <td><MdDelete  onClick={()=>handleShow(user)} className='text-warning'size={30} /></td>
    </tr>
    ))}
   

  </tbody>
</table>
<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm delete?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete {userData.firstName} {userData.lastName}!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="danger" onClick={()=>deleteUser()}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    </div>
    </>
  )
}
