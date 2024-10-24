import React from 'react'
import SideBar from '../SideBar/SideBar'
import NavBar from '../NavBar/NavBar'
import { Outlet } from 'react-router-dom'

export default function MasterLayout() {
  return (
    
      <div className="d-flex">
        <div>
          <SideBar/>
        </div>
        <div className="w-100">
          <NavBar/>
          <Outlet/>
        </div>
      </div>
    
  )
}
