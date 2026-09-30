import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

const API = import.meta.env.VITE_BACKEND_URL;

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getProfile = async () => {
    try {
      const { data } = await axios.get(
        `${API}/api/users/profile`,
        {
          withCredentials: true,
        }
      );

      if (data.success) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const value = {
    user,
    setUser,
    API,
    getProfile,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;