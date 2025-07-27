import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from './routes/Home.jsx'
import Dashboard from './routes/Dashboard.jsx'
import Login from './routes/Login.jsx'

import AddTripForm from './routes/AddTrip.jsx'
import Profile from './routes/ProfileDetail';
import UpdateProfile from './routes/UpdateProfile';

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Signup from './routes/Signup.jsx';
import ManageTrip from './routes/ManageTrip.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'login', element: <Login /> },


      { path: 'addtrip' , element: <AddTripForm /> }, 
      { path: 'managetrip', element: <ManageTrip /> },

            { path: 'signup', element: <Signup /> },
      { path: 'profile', element: <Profile /> },
      { path: 'update-profile', element: <UpdateProfile /> },

      { path: 'signup', element: <Signup /> },

    ],
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
