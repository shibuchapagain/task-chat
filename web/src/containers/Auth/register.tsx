// import InputField from './../../components/InputField';
import { Typography, Row, Input } from 'antd';
import { Formik, Form, Field } from 'formik';
import Button from './../../components/Button';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Heading from '../App/Layouts/main/header';
// import useAPI from './../../hooks/api';
// import { Toast } from 'react-toastify/dist/components';
import * as AuthService from './../../services/authService';
import { toast } from 'react-toastify';
import axiosInstance from './../../services/axios';
// import { Navigate } from 'react-router-dom';

const Container = styled.div`
  //   display: flex;
  //   justify-content: center;
  display: flex;
  justify-content: space-around;
  //   align-items: center;
  //   width: 40%;
  margin: 20px auto;
`;

const FormContainer = styled.div`
  //   display: flex;
  //   justify-content: center;
  //   width: 30%;
  //   background-color: #eee;
  //   margin-left: 30px;
  margin: 30px auto;
  max-width: 40%;
`;

const Image = styled.img`
  //   width: 550px;
  width: 55%;
  height: 90vh;
  align-items: center;
`;

const InputField = styled(Input)`
  padding: 10px;
  font-size: 1rem;
  &:hover {
    border: 1px solid blue;
  }
  margin: 8px;
`;

const Title = styled.p`
  display: flex;
  justify-content: center;
  font-weight: 900;
  font-size: 1.5rem;
  color: #000;
`;

const Register = () => {
  const navigate = useNavigate();
  const handleSubmit = async (
    values: any,
    { setSubmitting, resetForm }: any,
  ) => {
    try {
      let response: any = await axiosInstance.post('/auth/register', values);
      const user = response?.data;
      if (response?.success === true) {
        toast.success('Successfully register your account.');
        // navigate('/login', { replace: true });
        navigate(`/verify-account?email=${user?.email}`, { replace: true });
      } else {
        toast.error(response?.message);
        navigate('/register');
      }
    } catch (err: any) {
      toast.error(err);
    }
    resetForm(true);
    setSubmitting(false);
  };

  return (
    <>
      <Heading />
      <Container>
        <Image
          src={require('./../../assets/img/new-tour-2.jpg')}
          alt="tour image"
        />
        <FormContainer>
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              password: '',
            }}
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
                <Title>Create Account</Title>
                <Field
                  as={InputField}
                  name="firstName"
                  type="firstName"
                  required={true}
                  placeholder="Enter your first Name"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Field
                  as={InputField}
                  name="lastName"
                  type="lastName"
                  required={true}
                  placeholder="Enter your last Name"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
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
                  autoComplete="off"
                />
                <Row
                  justify="space-between"
                  style={{ margin: 10, marginBottom: 10 }}
                >
                  {/* <Link to="/forgotPassword">Forgot Password?</Link> */}
                </Row>
                <Button
                  style={{
                    marginTop: '12px',
                    backgroundColor: 'blue',
                    display: 'block',
                    margin: '0 auto',
                  }}
                  label="Sign Up"
                  type="submit"
                  disabled={isSubmitting}
                />
              </Form>
            )}
          </Formik>
        </FormContainer>
      </Container>
    </>
  );
};

export default Register;
