import React from 'react'

export default function NavBar() {
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-warning">
  <a className="navbar-brand" href="#">UMS</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse " id="navbarNav">
    <ul className="navbar-nav ">
      <li className="nav-item active">
        <a className="nav-link " href="#">Home <span className="sr-only"></span></a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Users</a>
      </li>
      <li className="nav-item">
        <a class="nav-link" href="#">Add Users</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Update User</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Logout</a>
      </li>
    </ul>
  </div>
</nav>
    </>
  )
}
