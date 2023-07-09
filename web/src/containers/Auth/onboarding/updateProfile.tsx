// import styled from 'styled-components';
// import React from 'react';
// import { Formik, Field, Form, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import Button from './../../../components/Button';
// import useAPI from './../../../hooks/api';
// import Apis from './../../../Apis/Auth';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';

// const ErrorMsg = styled(ErrorMessage)`
//   color: red;
//   font-size: 2rem;
// `;

// const Heading = styled.p`
//   font-size: 1.5rem;
//   font-weight: 900;
//   display: flex;
//   justify-content: center;
// `;

// const Container = styled.div`
//   padding: 20px;
//   display: flex;
//   flex-direction: column;
//   max-width: 50%;
//   align-items: 'center';
//   margin: 0 auto;
//   background-color: #eee;
// `;

// const Title = styled.label`
//   margin-top: 10px;
//   font-size: 1.2rem;
//   font-weight: 900;
// `;

// const InputField = styled(Field)`
//   margin-top: 10px;
//   padding: 10px;
//   margin-left: 40px;
//   width: 70%;
//   font-size: 1rem;
// `;

// const validationSchema = Yup.object().shape({
//   firstName: Yup.string().required('first name is required'),
//   lastName: Yup.string().required('last name is required'),
//   address: Yup.string().required('Address is required'),
//   bio: Yup.string(),
// });

// const HandleSubmit = async (values: any) => {
//   console.log(values, 'check on function run on custom hooks');
//   const navigate = useNavigate();
//   const [handleSubmitRequest, { loading, error }] = useAPI();
//   await handleSubmitRequest(Apis.updateProfile(values));
//   toast.success('Successfully update your profile');
//   navigate('/');
//   if (error) {
//     console.log(error, 'see whats error comes from api');
//     toast.error(error);
//   }
// };

// const UpdateProfileForm = () => (
//   <div>
//     <Heading>Update your profile</Heading>
//     <Formik
//       initialValues={{
//         firstName: '',
//         lastName: '',
//         address: '',
//         bio: '',
//       }}
//       validationSchema={validationSchema}
//       onSubmit={async values => {
//         await HandleSubmit(values);
//       }}
//     >
//       {({ touched, errors }) => (
//         <Form>
//           <Container>
//             <Title htmlFor="firstName">First Name:</Title>
//             <InputField type="text" name="firstName" />
//             <ErrorMsg name="firstName" />

//             <Title htmlFor="lastName">Last Name:</Title>
//             <InputField type="text" name="lastName" />
//             <ErrorMsg name="lastName" />

//             <Title htmlFor="address">Address:</Title>
//             <InputField type="text" name="address" />
//             <ErrorMsg name="address" />

//             <Title htmlFor="country">Country:</Title>
//             <InputField type="text" name="country" />
//             <ErrorMsg name="country" />

//             <Title htmlFor="bio">Bio:</Title>
//             {/* <InputField type="text-area" name="bio" /> */}
//             <textarea
//               style={{ padding: '10px', marginTop: '10px', height: '40px' }}
//               name="bio"
//             />
//             <ErrorMsg name="bio" />
//             <Button
//               style={{ display: 'flex', justifyContent: 'center' }}
//               label="Submit"
//               type="submit"
//             />
//           </Container>
//         </Form>
//       )}
//     </Formik>
//   </div>
// );

// export default UpdateProfileForm;

export {};
