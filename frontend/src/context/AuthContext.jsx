import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

const API = import.meta.env.VITE_BACKEND_URL;
const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const getProfile = async () => {
    try {
      const { data } = await axios.get(`${API}/api/users/profile`);
      if (data.success) {
        setUser(data.user);
      }
    } catch (error) {
      setUser(null);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getProfile();
    }
  }, []);

  const value = {
    user,
    setUser,
    API,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
