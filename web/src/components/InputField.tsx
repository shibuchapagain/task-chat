import styled from 'styled-components';
import { Typography, Row, Input } from 'antd';

// const InputContainer = styled.div`
//   position: relative;
// `;

const Inputs = styled(Input)`
  width: 100%;
  height: 1.5rem;
  padding: 10px;
  font-size: 1rem;
  &:hover {
    border: 1px solid blue;
  }
  margin: 8px;
`;

// const ToggleButton = styled.button`
//   position: absolute;
//   top: 50%;
//   right: 0.5rem;
//   transform: translateY(-50%);
//   background-color: transparent;
//   border: none;
//   cursor: pointer;
// `;

const InputField = ({
  type,
  name,
  required,
  placeholder,
  value,
  onChange,
  onBlur,
}: any) => {
  return (
    <>
      <Inputs
        type={type}
        name={name}
        required={required || false}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </>
  );
};

export default InputField;
