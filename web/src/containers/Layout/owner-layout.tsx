import { useCallback, useEffect } from 'react';
import {
  OwnerBreadCrumb,
  OwnerContent,
  OwnerFooter,
  OwnerNavbar,
  OwnerSidebar,
} from './../Owner/owner-components';
import { Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getMyProfile } from './../../services/authService';
import { useDispatch } from 'react-redux';
import { userStore } from './../../reducers/User';

const OwnerLayout = () => {
  const dispatch = useDispatch();
  const checkValidation = useCallback(async () => {
    try {
      const loggedInUser: any = await getMyProfile();
      if (loggedInUser?.success === true) {
        const userDetails = loggedInUser?.data;
        dispatch(userStore(userDetails));
        toast.success(`Welcome to ${userDetails?.role} Panel`);
        // return loggedInUser;
      } else {
        toast.error(loggedInUser?.message);
      }
    } catch (err: any) {
      toast.warning(err);
    }
  }, []);

  useEffect(() => {
    let token = localStorage.getItem('thrift_token') ?? null;
    if (token) {
      checkValidation();
    }
  }, [checkValidation]);
  return (
    <>
      <OwnerNavbar />
      <div style={{ display: 'flex' }}>
        <OwnerSidebar />
        <div style={{ marginTop: '30px' }}>
          <OwnerContent />
        </div>
        <Outlet />
      </div>

      <OwnerFooter />
    </>
  );
};

export default OwnerLayout;
