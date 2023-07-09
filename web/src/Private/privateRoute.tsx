import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
const PrivateComponent = ({ component }) => {
  let userToken = localStorage.getItem('thrift_token');
  if (userToken) {
    return component;
  } else {
    <Navigate to={'/login'} />;
  }
};

const PublicComponent = () => {
  const [loading, setLoading] = useState(true);
  const pathname = window.location.pathname;
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [pathname]);
  return loading ? <div> ...Loading</div> : <Outlet />;
};

export { PrivateComponent, PublicComponent };
