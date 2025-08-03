import React, { useEffect } from 'react'
import '../css/Admin_Dashboard.css'



const Admin_Dashboard = () => {
  return (
    <div className="container-fluid">
      <div className='row m-5 g-4'>

        <div className="col-4">
          <div className="card custom-card text-bg-danger" >
            <div className="card-header custom-card-header text-center">
              Manage Users
            </div>
            <div className="card-body custom-card-body">
              <p className="card-text">Add user, block user, remove user, Manage user permissions </p>
            </div>
          </div>
        </div>

        <div className="col-4">
          <div className="card custom-card text-bg-danger" >
            <div className="card-header custom-card-header text-center">Manage trips</div>
            <div className="card-body custom-card-body">
              <p className="card-text">Delete trips</p>
            </div>
          </div>
        </div>

        <div className="col-4">
          <div className="card custom-card text-bg-danger" >
            <div className="card-header custom-card-header text-center">Active trips</div>
            <div className="card-body custom-card-body">
              <p className="card-text">See current active trips</p>
            </div>
          </div>
        </div>

        <div className="col-4">
          <div className="card custom-card text-bg-danger" >
            <div className="card-header custom-card-header text-center">Cancelled trips</div>
            <div className="card-body custom-card-body">
              <p className="card-text">See cancelled trips</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Admin_Dashboard