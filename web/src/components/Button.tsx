////////////////////////////////////////////////////////////
import React, { FC, ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const StyledButton = styled.button`
  margin-top: 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 1rem;
  align-items: center;
  width: 25%;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #0069d9;
  }
`;

const Button: FC<Props> = ({ label, ...rest }) => {
  return <StyledButton {...rest}>{label}</StyledButton>;
};

export default Button;
