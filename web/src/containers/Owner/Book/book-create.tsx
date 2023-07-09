import React from 'react';
import { Formik, Field, Form } from 'formik';
import styled from 'styled-components';
import * as BookService from './BookService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  // background-color: red;
  width: 90%;
`;

const FormGroup = styled.div`
  width: 90%;
  // background-color: green;
  display: flex;
  margin: 5px;
  // justify-content: space-around;
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: 600;
  padding: 10px;
  margin-right: 30px;
`;

const InputField = styled(Field)`
  margin-left: 20px;
  width: 100%;
  padding: 10px;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  border: none;
  background-color: #0077cc;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #005fa3;
  }
`;

const BooksCategory = [
  { value: 'Fiction', label: 'Fiction' },
  { value: 'Non-Fiction', label: 'Non Fiction' },
  { value: 'Educational', label: 'Educational' },
];

const BooksCondition = [
  { value: 'New', label: 'New' },
  { value: 'Used', label: 'Used' },
  { value: 'Acceptable', label: 'Acceptable' },
];

const BookCreate = () => {
  const navigate = useNavigate();
  // let dispatch = useDispatch();
  const handleSubmit = async (values: any) => {
    try {
      const response: any = await BookService.createBook({
        ...values,
        category: 'Fiction',
        condition: 'New',
      });
      if (response?.success === true) {
        // const userData = response?.data?.userDetails;
        // dispatch(userStore(userData));
        toast.success('Create Book successfully');
        // const userRole = changeLowerCase(userData?.role);
        navigate(`/owner/book`);
        // navigate('/');
      } else {
        toast.error(response?.message);
        // navigate('/login');
      }
    } catch (err: any) {
      toast.warning(err);
    }
    // setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{
        title: '',
        price: '',
        category: '',
        condition: '',
        author: '',
        quantity: '',
        description: '',
        language: '',
        ISBN: '',
        publisher: '',
        edition: '',
      }}
      onSubmit={values => handleSubmit(values)}
    >
      {({ values, handleChange, handleBlur }) => (
        <StyledForm>
          <FormGroup>
            <Label htmlFor="title"> Name:</Label>
            <Field
              as={InputField}
              name="title"
              type="text"
              required={true}
              placeholder="Enter your title"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="off"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="price">Price:</Label>
            <Field
              as={InputField}
              name="price"
              type="number"
              required={true}
              placeholder="Enter your price"
              value={values.price}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="off"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="quantity">Quantity:</Label>
            <Field
              as={InputField}
              name="quantity"
              type="number"
              required={true}
              placeholder="Enter your quantity"
              value={values.quantity}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="off"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="author"> Author:</Label>
            <Field
              as={InputField}
              name="author"
              type="text"
              required={true}
              placeholder="Enter your Book author"
              value={values.author}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="off"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="price">Category:</Label>
            <InputField as="select" name="Category">
              <option value={values.category}>Select a Book Category</option>
              {BooksCategory.map(option => (
                <option
                  key={option.value}
                  value={option.value}
                  onChange={handleChange}
                >
                  {option.label}
                </option>
              ))}
            </InputField>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="condition">Condition:</Label>
            <InputField as="select" name="condition">
              <option value={values.condition}>Select a Book Condition</option>
              {BooksCondition.map(option => (
                <option
                  key={option.value}
                  value={option.value}
                  onChange={handleChange}
                >
                  {option.label}
                </option>
              ))}
            </InputField>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="text-area">Description:</Label>
            <Field
              as={InputField}
              name="description"
              type="text-area"
              required={true}
              placeholder="Enter your Book description"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="off"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="text">Language:</Label>
            <Field
              as={InputField}
              name="language"
              type="text"
              required={true}
              placeholder="Enter your Book language"
              value={values.language}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="off"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="number">Edition:</Label>
            <Field
              as={InputField}
              name="edition"
              type="number"
              required={true}
              placeholder="Enter your Book Edition"
              value={values.edition}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="off"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="text">Publisher:</Label>
            <Field
              as={InputField}
              name="publisher"
              type="text"
              required={false}
              placeholder="Enter your Book publisher"
              value={values.publisher}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="off"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="text">ISBN:</Label>
            <Field
              as={InputField}
              name="ISBN"
              type="text"
              required={false}
              placeholder="Enter your Book ISBN"
              value={values.ISBN}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="off"
            />
          </FormGroup>

          <Button type="submit">Submit</Button>
        </StyledForm>
      )}
    </Formik>
  );
};

export default BookCreate;
