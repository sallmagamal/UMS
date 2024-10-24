import React, { useState } from 'react'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import Profile from '../../assets/Images/9c5672219055d43b0ffb2caf907f4b0d.png';
import { FaArrowCircleLeft, FaArrowCircleRight, FaHome, FaUser, FaUsers } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import { IoLogOut } from 'react-icons/io5';


export default function SideBar() {
  let [isCollapsed,setIsCollapsed]=useState(false)
  let toggleCollapse=()=>{
    setIsCollapsed(!isCollapsed)
  }

  return (
    <div className='sidebarContainer vh-100'>
      <Sidebar collapsed={isCollapsed} className='vh-100'>
        <div className='text-center my-5'>
          <div >
            {isCollapsed? <FaArrowCircleRight onClick={toggleCollapse} size={30} className='my-3'/>
            :
            <FaArrowCircleLeft onClick={toggleCollapse} size={30} className='my-3' />

            }
         
          </div>
        <img src={Profile}  className='w-50 my-4 ' alt="" />
        <h6 className='my-2'>Karthi Madesh</h6>
        <h6 className='text-warning'>Admin</h6>
        </div>
        <Menu>
          <MenuItem icon={<FaHome/>} component={<Link to="/dashboard" />}> Home</MenuItem>
          <MenuItem icon={<FaUsers/>} component={<Link to="/dashboard/users-list" />}> Users</MenuItem>
          <MenuItem icon={<FaUser/>} component={<Link to="/dashboard/user-data" />}> Add User</MenuItem>
          <MenuItem icon={<CgProfile/>} component={<Link to="/dashboard/profile" />}> Update User</MenuItem>
          <MenuItem icon={<IoLogOut/>} component={<Link to="" />}> Logout</MenuItem>
        </Menu>
        </Sidebar>
    </div>
  )
}
