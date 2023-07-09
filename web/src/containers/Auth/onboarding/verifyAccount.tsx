import { useState } from 'react';
import { Input } from 'antd';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import Button from './../../../components/Button';
import Apis from './../../../Apis/Auth';
import { useNavigate, useLocation } from 'react-router-dom';
import { verifyAccount } from './../../../services/authService';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 180px auto;
  max-width: 30%;
  padding: 20px;
  background-color: #eee;
`;

const Title = styled.p`
  display: block;
  float: center;
  font-size: 1.2rem;
  font-weight: 700;
  margin-top: 10px;
  padding: 20px;
`;

const InputComponent = styled(Input)`
  width: 50%;
  font-size: 20px;
  border: 1px solid #222;
  text-align: center;
  letter-spacing: 15px;
  padding-button: 10px;
`;

const VerifyAccount = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email');
  const [code, setCode] = useState('');
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();
  const handleChange = (e: any) => {
    const { value } = e.target;
    setCode(value);
    setDisabled(value.length !== 6);
  };

  const handleSubmit = async (values: any) => {
    try {
      const payload: any = {
        email: email,
        code: code,
      };
      const data = await verifyAccount(payload);
      if (data) {
        toast.success('Verify your account successfully');
        navigate('/login');
      }
    } catch (err: any) {
      toast.error(err);
    }
  };

  return (
    <Container>
      <Title>Verify Account</Title>
      <InputComponent
        placeholder="code"
        maxLength={4}
        onChange={handleChange}
      />
      <Button label="Submit" onClick={handleSubmit} />
    </Container>
  );
};

export default VerifyAccount;

// export {};
