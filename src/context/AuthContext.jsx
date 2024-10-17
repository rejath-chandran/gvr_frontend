import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useLayoutEffect,
} from "react";

import { api, getUser } from "../service/api";

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const authcontext=useContext(AuthContext)
  if(!authcontext){
    throw new Error("useauth must be in auth provider")
  }

  return authcontext
};


export const AuthProvider = ({ children }) => {

  const [token, SetToken] = useState();
  const [user,Setuser]=useState()

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await localStorage.getItem("token")
        
        SetToken(response);
      } catch {
        SetToken(null);
      }
    };
    fetchToken();
  }, []);

  useLayoutEffect(() => {
    const authItreceptor = api.interceptors.request.use((config) => {
      config.headers.Authorization =
        !config._retry && token
          ? `Bearer ${token}`
          : config.headers.Authorization;
      return config;
    });
    return () => {
      api.interceptors.request.eject(authItreceptor);
    };
  }, [token]);

  useLayoutEffect(() => {
    const refreshinterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalrequest = error.config;

        if (
          error.response.status === 403 &&
          error.response.data.error == "unauthorised"
        ) {
          SetToken(null);
          localStorage.removeItem("token");
        }
        return Promise.reject(error);
      }
    );
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    SetToken(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    SetToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

