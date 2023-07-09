import Section1 from '../../section1';
import Body from './body';
import React, { useContext } from 'react';
// import { UserContext } from './../../../../RootProvider';
import Header from './header';
import { useState, useCallback, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getMyProfile } from './../../../../services/authService';
import { toast } from 'react-toastify';
import { userStore } from './../../../../reducers/User';
import BookCard from './../../../../components/Book-card';
import { Spin } from 'antd';
import { useDispatch } from 'react-redux';

import {
  productStore,
  categoryStore,
  subCategoryStore,
} from './../../../../reducers/Products';

import {
  getAllCategory,
  getAllProducts,
  getAllSubCategory,
} from './../../../../containers/Owner/category-service';
import styled from 'styled-components';
// import { UserContext } from './../../../../RootProvider';
// import { useRoot } from './../../../../RootProvider';
import { useRoot } from './../../../../RootProvider';
// const Image = require('./../../../../assets/img/scene1.jpg');

const Container = styled.div`
  // padding-top: 5px;
  display: flex;
  margin: 10px 15px;
  // border: 10px solid green;
  padding: 10px;
`;

const CategoryTitle = styled.p`
  display: block;
  cursor: pointer;
  background-color: yellow;
  padding: 8px;
  margin: 10px 0;
`;

const SubCategoryContainer = styled.div`
  margin: 10px 0;
  padding-left: 16px;
`;

const SubCategoryItem = styled.p`
  display: block;
  cursor: pointer;
  background-color: lightblue;
  padding: 8px;
  margin: 5px 0;
`;

const HomeLayout = () => {
  const { auth } = useRoot();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [Category, setCategory] = useState([]);
  const CategoryData = useCallback(async () => {
    try {
      setLoading(true);
      const Categories = await getAllCategory();
      const CategoriesData = Categories?.data;
      dispatch(categoryStore(CategoriesData));
      setCategory(CategoriesData);
    } catch (err: any) {
      toast.error(err);
    } finally {
    }
  }, []);

  useEffect(() => {
    CategoryData();
  }, []);

  const pathname = window.location.pathname;
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [pathname]);
  return (
    <>
      <Header />
      <Container>
        <div
          style={{
            width: '22%',
            height: '100vh',
            position: 'fixed',
            overflow: 'auto',
          }}
        >
          <div>
            <h2 style={{ margin: '5px auto' }}>Category</h2>
            {Category.map((category: any) => {
              return (
                <div key={category?.id}>
                  <RenderCategory category={category}></RenderCategory>
                </div>
              );
            })}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            width: '75%',
            height: '100%',
            overflow: 'auto',
            position: 'relative',
            border: '1px solid #f4f4f4',
            left: '25%',
          }}
        >
          {loading ? <div>Loading...</div> : <RenderContent />}
        </div>
      </Container>
    </>
  );
};

const RenderCategory = ({ category }) => {
  const [SubCategory, setSubCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [openCategory, setOpenCategory] = useState(false);

  const SubCategoryData = useCallback(async (id: any) => {
    try {
      const Categories = await getAllSubCategory(id);
      setSubCategory(Categories?.data);
    } catch (err: any) {
      toast.error(err);
    }
  }, []);
  const handleCategoryClick = async categoryId => {
    const data: any = await SubCategoryData(categoryId);
    setOpenCategory(true);
    if (openCategory === true) {
      setOpenCategory(false);
    }
    setSelectedCategory(categoryId);
  };
  const handleSubCategoryData = () => {
    alert('done');
  };
  return (
    <>
      <CategoryTitle onClick={() => handleCategoryClick(category?._id)}>
        {category.title}
      </CategoryTitle>
      {
        <SubCategoryContainer>
          {openCategory &&
            SubCategory.map((subcategory: any) => (
              <SubCategoryItem
                onClick={handleSubCategoryData}
                key={subcategory?._id}
              >
                {subcategory?.title}
              </SubCategoryItem>
            ))}
        </SubCategoryContainer>
      }
    </>
  );
};

export const RenderContent = () => {
  const navigate = useNavigate();
  const [productData, setProductData] = useState([]);
  const getAllProduct = useCallback(async () => {
    try {
      const Products = await getAllProducts();
      setProductData(Products?.data);
    } catch (err: any) {
      toast.error(err);
    }
  }, []);
  useEffect(() => {
    getAllProduct();
  }, []);
  return (
    <>
      {productData &&
        productData?.map((item: any) => {
          const imgs: any[] = item?.productImages;
          const images = imgs && imgs?.map(img => img?.url);
          return (
            <>
              <BookCard
                images={images}
                title={item?.title}
                price={item?.price}
                address={item?.address}
                condition={item?.condition}
                owner={`${item?.user?.firstName} ${item?.user?.lastName}`}
                description={item?.description}
                handleClick={() => navigate(`product-view/${item?._id}`)}
              />
            </>
          );
        })}
    </>
  );
};

export default HomeLayout;
