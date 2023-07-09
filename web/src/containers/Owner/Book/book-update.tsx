// const BookUpdate = () => {
//   return <>THIS IS BOOK UPDATE SECTION</>;
// };

// export default BookUpdate;

import React, { useEffect, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import styled from 'styled-components';
import * as BookService from './BookService';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
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

const BookUpdate = () => {
  const navigate = useNavigate();
  const params = useParams();
  const bookId: any = params?.id;
  const [initial, setInitial] = useState({
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
  });
  const getBookDetails = async () => {
    try {
      const response = await BookService.getBook(bookId);
      if (response.success === true) {
        setInitial(response?.data);
      }
    } catch (err: any) {
      toast.error(err);
    }
  };
  useEffect(() => {
    getBookDetails();
  }, []);

  const handleSubmit = async (values: any) => {
    try {
      const response = await BookService.updateBook(initial, bookId);
      if (response?.success === true) {
        toast.success('Update Book Successfully');
        navigate(`/owner/book`);
      } else {
        toast.error(response?.message);
      }
    } catch (err: any) {
      toast.warning(err);
    }
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setInitial(preState => ({
      ...preState,
      [name]: value,
    }));
  };

  return (
    <Formik
      initialValues={{ initial }}
      onSubmit={(values: any) => handleSubmit(values)}
    >
      {({ values, initialValues, handleBlur, setFieldValue }) => {
        return (
          <StyledForm>
            <FormGroup>
              <Label htmlFor="title"> Name:</Label>
              <Field
                as={InputField}
                name="title"
                type="text"
                placeholder="Enter your title"
                value={initial?.title}
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
                placeholder="Enter your price"
                value={initial?.price}
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
                placeholder="Enter your quantity"
                value={initial?.quantity}
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
                placeholder="Enter your Book author"
                value={initial?.author}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="off"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="category">Category:</Label>
              <select id="my-dropdown" name="category" onChange={handleChange}>
                <option value="">{initial?.category}</option>
                <option value="Fiction">Fiction </option>
                <option value="Non-Fiction">Non-Fiction</option>
                <option value="Educational">Educational</option>
              </select>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="condition">Category:</Label>
              <select id="my-dropdown" name="condition" onChange={handleChange}>
                <option value="">{initial?.condition}</option>
                <option value="New">New </option>
                <option value="Used">Used</option>
                <option value="Acceptable">Acceptable</option>
              </select>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="text-area">Description:</Label>
              <Field
                as={InputField}
                name="description"
                type="text-area"
                placeholder="Enter your Book description"
                value={initial?.description}
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
                placeholder="Enter your Book language"
                value={initial?.language}
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
                placeholder="Enter your Book Edition"
                value={initial?.edition}
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
                value={initial?.publisher}
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
                value={initial?.ISBN}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="off"
              />
            </FormGroup>

            <Button style={{ marginTop: '20px' }} type="submit">
              Update Book
            </Button>
          </StyledForm>
        );
      }}
    </Formik>
  );
};

export default BookUpdate;
