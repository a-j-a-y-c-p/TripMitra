import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from './routes/Home.jsx'
import Dashboard from './routes/Dashboard.jsx'
import Login from './routes/Login.jsx'
import Profile from './routes/UserProfile.jsx';
import AddTripForm from './routes/AddTrip.jsx'

import UpdateProfile from './routes/UpdateProfile';

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Signup from './routes/Signup.jsx';
import ManageTrip from './routes/ManageTrip.jsx';
<<<<<<< HEAD

import TripHistory from './routes/TripHistory.jsx';

=======
import TripHistory from './routes/TripHistory.jsx';
>>>>>>> d986f6c34c1511e8d41a98d4f7cf378766b0850f
import Admin_Dashboard from './routes/Admin_Dashboard.jsx';


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
      { path: 'signup', element: <Signup /> },
      { path: 'profile', element: <Profile /> },
      { path: 'UpdateProfile', element: <UpdateProfile /> },
      { path: 'signup', element: <Signup /> },
      {path: 'triphistory', element: <TripHistory /> },

      {path: 'admin_dashboard',element: <Admin_Dashboard/>}
    ],
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
