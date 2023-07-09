// import InputField from './../../components/InputField';
import React, { useContext } from 'react';
import { Typography, Checkbox, Row, Input } from 'antd';
import { Formik, Form, Field, replace } from 'formik';
import Button from './../../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Heading from '../App/Layouts/main/header';
// import useAPI from './../../hooks/api';
import axios from 'axios';
// import Apis from './../../Apis/Auth';
// import { useRoot } from './../../RootProvider';
import { toast } from 'react-toastify';
import * as AuthService from './../../services/authService';
// import { useState } from 'react';
import { changeLowerCase } from './../../utils/Lowercase';
import { useDispatch } from 'react-redux';
import { userStore } from './../../reducers/User';
// import { UserContext } from './../../RootProvider';
import Socket from './../../socket';

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const InputField = styled(Input)`
  padding: 10px;
  font-size: 1rem;
  &:hover {
    border: 1px solid blue;
  }
  margin: 8px;
`;

const Login = () => {
  const navigate = useNavigate();
  let dispatch = useDispatch();
  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      const response: any = await AuthService.Login(values);
      if (response?.success === true) {
        const userData = response?.data?.userDetails;
        dispatch(userStore(userData));
        toast.success('Login successfully');
        localStorage.setItem('thrift_user', userData);
        const token = response?.data?.token;
        localStorage.setItem('thrift_token', token);
        // axios.defaults.headers.Authorization = `Bearer ${token}`;
        // Socket.connectSocket();
        const isVerify = userData?.isVerified;
        if (isVerify === true && userData?.role === 'Seller') {
          const userRole = changeLowerCase(userData?.role);
          navigate(`/${userRole}`);
        } else if (isVerify === true && userData?.role === 'Buyer') {
          navigate('/');
        } else {
          navigate(`/verify-account?${userData?.email}`);
        }
      } else {
        toast.error(response?.message);
        navigate('/login');
      }
    } catch (err: any) {
      toast.warning(err);
    }
    setSubmitting(false);
  };

  return (
    <>
      <Heading />
      <Container>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={handleSubmit}
        >
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <Form onSubmit={handleSubmit} autoComplete="off">
              <Typography.Title level={5}>Login</Typography.Title>
              <Typography.Title level={5}>
                Don't have an account? <Link to="/signup"> Create Account</Link>
              </Typography.Title>
              <Field
                as={InputField}
                name="email"
                type="email"
                required={true}
                placeholder="Enter your email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Field
                as={InputField}
                name="password"
                type="password"
                required={true}
                placeholder="Enter your password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Row
                justify="space-between"
                style={{ margin: 10, marginBottom: 10 }}
              >
                <Link to="/forgotPassword">Forgot Password?</Link>
              </Row>
              <Button
                style={{
                  marginTop: '12px',
                  backgroundColor: 'blue',
                  display: 'block',
                  margin: '0 auto',
                }}
                label="login"
                type="submit"
                disabled={isSubmitting}
              />
            </Form>
          )}
        </Formik>
      </Container>
    </>
  );
};

export default Login;
