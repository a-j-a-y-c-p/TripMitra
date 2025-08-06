import { jwtDecode } from 'jwt-decode';
import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [loading , setLoading] = useState(true);

  const login = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    const decodedUser = jwtDecode(newToken);
    setUser(decodedUser);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        setUser(decodedUser);
      } catch (e) {
        console.error("Invalid token", e);
        logout();
      }
    }
    setLoading(false);
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, user, login, logout , loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// import { jwtDecode } from 'jwt-decode';
// import { createContext, useState, useEffect } from 'react';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(localStorage.getItem('token'));
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const login = (newToken) => {
//     localStorage.setItem('token', newToken);
//     setToken(newToken);
//     const decodedUser = jwtDecode(newToken);
//     setUser(decodedUser);
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     setToken(null);
//     setUser(null);
//   };

//   useEffect(() => {
//     if (token) {
//       try {
//         const decodedUser = jwtDecode(token);
//         const currentTime = Math.floor(Date.now() / 1000);
        
//         // Auto logout if token is expired
//         if (decodedUser.exp && decodedUser.exp < currentTime) {
//           console.warn("Token expired. Logging out.");
//           logout();
//         } else {
//           setUser(decodedUser);
//         }
//       } catch (e) {
//         console.error("Invalid token", e);
//         logout();
//       }
//     }
//     setLoading(false);
//   }, [token]);

//   return (
//     <AuthContext.Provider value={{ token, user, login, logout, loading }}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };

