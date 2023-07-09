import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getMyProfile } from './../../../../services/authService';
import { userStore } from './../../../../reducers/User';
import { toast } from 'react-toastify';
import './Notification.css';
import { Popover, Button } from 'antd';
import socket from './../../../../socket';
import moment from 'moment';
import {
  ReadAllNotification,
  ReadNotification,
} from './../../../../services/commonService';

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px;
  background-color: #333;
  // background-color: #eee;
  color: #fff;
  position: sticky;
  top: 0;
  z-index: 999;
`;

const List = styled.ul`
  text-decoration: none;
`;

const NavContent = styled.div`
  display: flex;
  flex: 50%;
  justify-content: space-around;
  align-items: center;
`;

const NavSignup = styled.div`
  display: flex;
  flex: 50%;
  justify-content: end;
`;

const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-size: 18px;
  font-weight: 700;

  &:hover {
    background-color: #fff;
    padding: 8px;
    color: #000;
    border-radius: 5px;
  }
`;

const StyledLink1 = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-size: 18px;
  padding: 25px;
  &:hover {
    background-color: #fff;
    padding: 8px;
    color: #000;
    border-radius: 5px;
  }
`;

const NotificationContent = styled.div`
  marginBottom: '20px', 
  color: red;
  padding: 10px;
  &:hover{
    background-color: #eee;
    cursor: pointer;
  }
`;

interface CountNotification {
  isNotification?: boolean;
}

const NotificationCount = styled.span<CountNotification>`
  position: absolute;
  top: -8px;
  right: -8px;
  color: white;
  border-radius: 5px;
  padding: 2px 4px;
  font-size: 12px;
  font-weight: 900;
  background-color: ${({ isNotification }) =>
    isNotification ? 'red' : 'white'};
`;

const Heading = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let unreadNotification: number;
  let notificationData = useSelector(
    (state: any) => state.notification.notificationData,
  );

  let updateNotificationData = useSelector(
    (state: any) => state.notification.updateNotificationData,
  );

  console.log(updateNotificationData, 'zero');

  let status = notificationData?.unreadNotification;

  console.log(notificationData, status, 'one');

  //////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////

  const loadNotification = (): any => {
    // const fetchData = async () => {
    //   await socket.getUserNotifications();
    // };
    // fetchData();
    console.log('fetch on each click');
    socket.getUserNotifications();
  };

  useEffect(() => {
    // setTimeout(() => {
    //   loadNotification();
    // }, 800);
    loadNotification();
  }, [updateNotificationData]);

  unreadNotification = +notificationData?.unreadNotification;

  const handleReadAllNotification = useCallback(async () => {
    try {
      const data = await ReadAllNotification();
      loadNotification();
      if (data?.success === true) {
        toast.success('Mark Read all notifications');
      }
      return data;
    } catch (err: any) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleReadNotification = useCallback(async (id: string) => {
    try {
      const data = await ReadNotification(id);
      loadNotification();
      return data;
    } catch (err: any) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const checkValidation = useCallback(async () => {
    try {
      setLoading(true);
      const loggedInUser: any = await getMyProfile();
      if (loggedInUser?.success === true) {
        const userDetails = loggedInUser?.data;
        dispatch(userStore(userDetails));
      } else {
        toast.error(loggedInUser?.message);
      }
    } catch (err: any) {
      console.log(err);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    let token = localStorage.getItem('thrift_token') ?? null;
    if (token) {
      checkValidation();
    }
  }, [checkValidation]);

  const loggedInUser: any = useSelector((state: any) => {
    return state?.user?.userDetails;
  });
  const content = (
    <div
      style={{
        display: 'flex',
        // justifyContent: 'center',
        flexDirection: 'column',
        margin: '0 auto',
        padding: '5px 3px',
        width: '450px',
        // height: '400px',
        maxHeight: '400px',
        overflowY: 'scroll',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '2px',
        }}
      >
        <p
          style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '5px' }}
        >
          Notification
        </p>
        <button
          onClick={handleReadAllNotification}
          style={{
            fontSize: '14px',
            fontWeight: 'bold',
            border: 'transparent',
            background: '#fff',
            cursor: 'pointer',
          }}
        >
          Mark all read
        </button>
      </div>
      {notificationData?.notification &&
        notificationData?.notification.map((notification, index): any => (
          <NotificationContent
            onClick={() => {
              handleReadNotification(notification?._id);
              navigate(notification?.webRoute);
            }}
            key={index}
          >
            <p
              style={{
                padding: '5px',
                color: notification?.isRead ? 'gray' : 'black',
                fontWeight: '600',
              }}
            >
              {notification.title}
            </p>
            <p
              style={{
                color: notification?.isRead ? 'gray' : 'black',
                fontSize: '12px',
                fontWeight: '600',
                float: 'right',
              }}
            >
              {moment.utc(notification?.createdAt).local().fromNow()}
            </p>
          </NotificationContent>
        ))}
    </div>
  );

  const text = <span style={{ margin: '0px auto' }}>Notification</span>;
  const buttonWidth = 100;
  const handleNotification = () => {
    // alert('DISPLAY');
    // loadChat();
    <div
      style={{
        marginLeft: buttonWidth,
        clear: 'both',
        whiteSpace: 'nowrap',
      }}
    >
      <Popover
        placement="bottom"
        title={text}
        content={content}
        trigger="click"
      >
        <Button>Bottom</Button>
      </Popover>
    </div>;
  };
  return (
    <NavbarContainer>
      <NavContent>
        <List>
          <StyledLink to="/">Home</StyledLink>
        </List>
        {loggedInUser ? (
          <>
            <List>
              <StyledLink to={loggedInUser?.role}>Dashboard</StyledLink>
            </List>
          </>
        ) : (
          <></>
        )}
        <List>
          <StyledLink to="/product">Product</StyledLink>
        </List>
        <List>
          <StyledLink to="/contact">Contact</StyledLink>
        </List>
        <List>
          <StyledLink to="/about">About</StyledLink>
        </List>
      </NavContent>

      <NavSignup>
        {loggedInUser ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-evenly',
              width: '40%',
            }}
          >
            <div
              style={{
                marginLeft: buttonWidth,
                clear: 'both',
                whiteSpace: 'nowrap',
                display: 'flex',
                justifyContent: 'center',
                margin: '0px auto',
              }}
            >
              <Popover
                placement="bottom"
                title={''}
                content={content}
                trigger="click"
              >
                <div className="notification" onClick={handleNotification}>
                  <i
                    style={{ fontSize: '25px', cursor: 'pointer' }}
                    className="fas fa-bell"
                  ></i>
                  <NotificationCount isNotification={!!unreadNotification}>
                    {unreadNotification || ''}
                  </NotificationCount>
                </div>
              </Popover>
            </div>

            <h2>
              {loggedInUser?.firstName} {loggedInUser?.lastName}
            </h2>
          </div>
        ) : (
          <>
            <List>
              <StyledLink1 to="/login">Login</StyledLink1>
            </List>
            <List>
              <StyledLink1 to="/register">Create Account</StyledLink1>
            </List>
          </>
        )}
      </NavSignup>
    </NavbarContainer>
  );
};

export default Heading;
