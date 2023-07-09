import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Socket from './socket';
import { verifyToken } from './services/authService';
export const RootContext = createContext<{
  auth: any;
  setAuth: React.Dispatch<React.SetStateAction<undefined>>;
  checkAuth: any;
}>({
  auth: {},
  setAuth: () => {},
  checkAuth: () => {},
});

export const RootProvider = ({ children }) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState();
  const [isReady, setReady] = useState(false);

  const checkAuth = async () => {
    const token = localStorage.getItem('thrift_token');
    if (token) {
      axios.defaults.headers.Authorization = `Bearer ${token}`;
      let data;
      try {
        data = await verifyToken();
        data = data?.data;
      } catch (err) {}
      if (data) {
        axios.defaults.headers.Authorization = `Bearer ${token}`;
        setAuth({ ...data, fullName: `${data.firstName} ${data.lastName}` });
        Socket.connectSocket();
      }
    } else {
      setAuth(undefined);
      navigate('/login');
    }
    setReady(true);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <RootContext.Provider
      value={{
        auth,
        setAuth,
        checkAuth,
      }}
    >
      {isReady ? children : null}
    </RootContext.Provider>
  );
};

export const useRoot = () => useContext(RootContext);

export default RootProvider;
