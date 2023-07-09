// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import styled from 'styled-components';
// import useAPI from './../../../hooks/api';
// import Apis from './../../../Apis/Auth';
// import { toast } from 'react-toastify';
// import { useRoot } from './../../../RootProvider';

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// const SelectBox = styled.div`
//   width: 25%;
//   align-items: center;
//   background-color: blue;
//   color: #fff;
//   margin-top: 1.5rem;
//   border-radius: 5px;
//   border: none;
//   padding: 1rem;
//   box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
//   &:hover {
//     background-color: #000;
//     cursor: pointer;
//   }
// `;

// const Title = styled.p`
//   font-size: 1rem;
//   display: flex;
//   font-weight: 900;
//   justify-content: center;
// `;

// const Paragraph = styled.p`
//   font-size: 0.9rem;
//   display: flex;
//   justify-content: center;
// `;
// // eslint-disable-next-line react-hooks/rules-of-hooks

// const UpdateRole = (): any => {
//   const navigate = useNavigate();
//   const { setAuth } = useRoot();
//   const [selectedRole, setSelectedRole] = useState('');
//   const [handleSubmitRequest, { loading, error }] = useAPI();

//   const handleRoleSelect = (role: any) => {
//     setSelectedRole(role);
//   };

//   useEffect(() => {
//     if (selectedRole) {
//       handleSubmit();
//     }
//   }, [selectedRole]);

//   const handleSubmit = async () => {
//     const data = await handleSubmitRequest(
//       Apis.updateProfile({ role: selectedRole, onboardingStep: 3 }),
//     );
//     console.log(data, 'check data');
//     if (data) {
//       toast.success('Select role successfully');
//       navigate(`/dashboard/${data?.role}`);
//     }
//   };

//   return (
//     <Container>
//       <h4>Select your Role</h4>
//       <SelectBox
//         onClick={() => handleRoleSelect('Seeker')}
//         className={selectedRole === 'Seeker' ? 'selected' : ''}
//       >
//         <Title>Seeker</Title>
//         <Paragraph>
//           Lorem ipsum dolor sit, amet consectetur adipisicing elit.
//         </Paragraph>
//       </SelectBox>
//       <SelectBox
//         onClick={() => handleRoleSelect('Renter')}
//         className={selectedRole === 'Renter' ? 'selected' : ''}
//       >
//         <Title>Renter</Title>
//         <Paragraph>
//           Lorem ipsum dolor sit, amet consectetur adipisicing elit.
//         </Paragraph>
//       </SelectBox>
//       <SelectBox
//         onClick={() => handleRoleSelect('Owner')}
//         className={selectedRole === 'Owner' ? 'selected' : ''}
//       >
//         <Title>Owner</Title>
//         <Paragraph>
//           Lorem ipsum dolor sit, amet consectetur adipisicing elit.
//         </Paragraph>
//       </SelectBox>
//     </Container>
//   );
// };

// export default UpdateRole;

export {};
