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
import TripHistory from './routes/TripHistory.jsx';
import Admin_Dashboard from './routes/Admin_Dashboard.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'signup', element: <Signup /> },
      { path: 'login', element: <Login /> },

      { path: 'dashboard', element: <PrivateRoute><Dashboard /></PrivateRoute> },
      { path: 'addtrip', element: <PrivateRoute><AddTripForm /></PrivateRoute> },
      { path: 'managetrip', element: <PrivateRoute><ManageTrip /></PrivateRoute> },
      { path: 'profile', element: <PrivateRoute><Profile /></PrivateRoute> },
      { path: 'UpdateProfile', element: <PrivateRoute><UpdateProfile /></PrivateRoute> },
      { path: 'triphistory', element: <PrivateRoute><TripHistory /> </PrivateRoute>},
      { path: 'admin_dashboard', element: <PrivateRoute requiredRole={'ADMIN'}><Admin_Dashboard /></PrivateRoute> }
    ],
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
