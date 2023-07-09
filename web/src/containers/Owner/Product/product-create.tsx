import React, { useCallback, useEffect, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import styled from 'styled-components';
// import * as BookService from './BookService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import {
  getAllCategory,
  getAllSubCategory,
  createProduct,
  updateProductImage,
} from '../category-service';

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #eee;
  width: 90%;
  overflow-y: scroll;
`;

const FormGroup = styled.div`
  width: 90%;
  // background-color: green;
  display: flex;
  margin: 5px;
  // justify-content: space-around;
`;

const Label = styled.label`
  // font-size: 0.5rem;
  font-size: ${({ theme }) => theme.fontSizes.sm}px;
  font-weight: 600;
  padding: 10px;
  margin-right: 30px;
`;

const InputField = styled(Field)`
  margin-left: 20px;
  width: 100%;
  padding: 10px;
`;

const Button = styled.button<{ color: any }>`
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  border: none;
  // background-color: #0077cc;
  background-color: ${({ theme }) => theme.colors.black};
  color: ${({ color }) => color};
  // color: #fff;
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

const ProductStatus = [
  { value: 'Active', label: 'Active' },
  { value: 'Booking', label: 'Booking' },
  { value: 'Sold', label: 'Sold' },
  { value: 'Deactivate', label: 'Deactivate' },
];

const ProductCondition = [
  { value: 'Brand New', label: 'Brand New' },
  { value: 'Used', label: 'Used' },
  { value: 'Like New', label: 'Like New' },
];

const ProductNegotiable = [
  { value: 'Not Negotiable', label: 'Not Negotiable' },
  { value: 'Negotiable', label: 'Negotiable' },
];

const ProductDelivery = [
  { value: 'Not Available', label: 'Not Available' },
  { value: 'Available', label: 'Available' },
];

const ProductCreate = () => {
  const [category, setCategory] = useState([]);
  const [CategoryId, setCategoryId] = useState('');
  const [SubCategory, setSubCategory] = useState([]);

  const CategoryData = useCallback(async () => {
    try {
      const data: any = await getAllCategory();
      setCategory(data?.data);
    } catch (err: any) {
      console.log(err, 'check err');
    }
  }, []);

  const handleSetSubCategory = async (id: string) => {
    const data: any = await getAllSubCategory(id);
    setSubCategory(data?.data);
  };

  useEffect(() => {
    CategoryData();
  }, []);

  const [startDate, setStartDate] = useState(new Date());
  const [image, setImage] = useState([]);
  const navigate = useNavigate();
  const handleSubmit = async (values: any) => {
    try {
      const productResponse: any = await createProduct(values);
      if (productResponse?.success === true) {
        try {
          const formData = new FormData();
          let images = values?.images;
          for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i]);
          }
          const response: any = await updateProductImage(
            productResponse?.data?._id,
            formData,
          );
          if (response?.success === true) {
            toast.success('Product create successfully');
            navigate('/');
          }
        } catch (err: any) {
          toast.error(err);
        }
      }
    } catch (err: any) {
      toast.error(err);
    }
  };

  return (
    // <Container>
    <Formik
      initialValues={{
        title: '',
        price: '',
        quantity: '',
        category: '',
        subCategory: '',
        address: '',
        delivery: '',
        negotiable: '',
        status: '',
        condition: '',
        description: '',
        specification: '',
        adsExpiry: '',
        images: [],
      }}
      onSubmit={values => handleSubmit(values)}
    >
      {({ values, handleChange, handleBlur, setFieldValue }) => {
        return (
          <StyledForm encType="multipart/form-data">
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
              <Label htmlFor="address"> Address:</Label>
              <Field
                as={InputField}
                name="address"
                type="text"
                required={true}
                placeholder="Enter address"
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="off"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="price">Category:</Label>
              <InputField
                as="select"
                name="category"
                onChange={e => {
                  setFieldValue('category', e.target.value);
                  handleSetSubCategory(e.target.value);
                }}
              >
                <option value={values.category}>Select a Book Category</option>
                {category &&
                  category.map((option: any) => (
                    <option key={option._id} value={option._id}>
                      {option.title}
                    </option>
                  ))}
              </InputField>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="subCategory">Sub Category:</Label>
              <InputField
                as="select"
                name="subCategory"
                onChange={(e: any) => {
                  setFieldValue('subCategory', e.target.value);
                }}
              >
                <option value={values.category}>
                  Select a product sub category
                </option>
                {SubCategory &&
                  SubCategory.map((option: any) => (
                    <option
                      key={option._id}
                      value={option._id}
                      onChange={handleChange}
                    >
                      {option.title}
                    </option>
                  ))}
              </InputField>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="status">Status:</Label>
              <InputField
                as="select"
                name="status"
                onChange={(e: any) => setFieldValue('status', e.target.key)}
              >
                <option value={values.condition}>
                  Select a Product Status
                </option>
                {ProductStatus.map(option => (
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
              <InputField
                as="select"
                name="condition"
                onChange={(e: any) => setFieldValue('condition', e.target.key)}
              >
                <option value={values.condition}>
                  Select a Product Condition
                </option>
                {ProductCondition.map(option => (
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
              <Label htmlFor="negotiable">Negotiable:</Label>
              <InputField
                as="select"
                name="negotiable"
                onChange={(e: any) => setFieldValue('negotiable', e.target.key)}
              >
                <option value={values.condition}>
                  Select a Product Negotiable
                </option>
                {ProductNegotiable.map(option => (
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
              <Label htmlFor="delivery">Delivery:</Label>
              <InputField
                as="select"
                name="delivery"
                onChange={(e: any) => setFieldValue('delivery', e.target.key)}
              >
                <option value={values.condition}>
                  Select a Product Delivery
                </option>
                {ProductDelivery.map(option => (
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
              <Label htmlFor="adsExpiry">Ads Expiry:</Label>
              <DatePicker
                selected={startDate}
                onChange={date => setStartDate(date)}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="text-area">Image:</Label>
              <input
                id="file"
                name="images"
                type="file"
                multiple
                onChange={(event: any) => {
                  const files: any = event?.currentTarget?.files;
                  setFieldValue('images', [...files]);
                }}
              />
            </FormGroup>

            <Button style={{ marginTop: '15px' }} color="red" type="submit">
              Submit
            </Button>
          </StyledForm>
        );
      }}
    </Formik>
    // </Container>
  );
};

export default ProductCreate;
