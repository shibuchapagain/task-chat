import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Home } from './Home';
import Login from '../Auth/login';
import Register from '../Auth/register';
import {
  PrivateComponent,
  PublicComponent,
} from './../../Private/privateRoute';
// import OwnerDashboard from '../Owner/owner-components';
// import OwnerDashboard from './../Layout/owner-layout';
// import VerifyAccount from '../Auth/onboarding/verifyAccount';
// import UpdateRole from '../Auth/onboarding/updateRole';
// import UpdateProfile from '../Auth/onboarding/updateProfile';
import { useSelector } from 'react-redux';
// import { OwnerSidebar } from './../Owner/owner-components';
import OwnerDashboard from './../Layout/owner-layout';
import BookCreate from '../Owner/Book/book-create';
import BookList from '../Owner/Book/book-list';
import BookUpdate from '../Owner/Book/book-update';
import OwnerLayout from './../Layout/owner-layout';
import ProductCreate from '../Owner/Product/product-create';
import { OwnerBreadCrumb } from '../Owner/owner-components';
import DisplayProduct from '../Product/product';
import VerifyAccount from '../Auth/onboarding/verifyAccount';
import RootProvider from './../../RootProvider';
import MessageBox from './../../components/Message';
import ChatLayout from '../Chat';

const App = () => {
  const categoryData: any = useSelector((state: any) => {
    return state?.product;
  });
  return (
    <BrowserRouter>
      <RootProvider>
        <Routes>
          <Route path="/" element={<PublicComponent />}>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            {/* <Route path="product-view/:id" element={<DisplayProduct />} /> */}
          </Route>
          <Route path="/" element={<PrivateComponent component={<Outlet />} />}>
            <Route path="/verify-account" element={<VerifyAccount />} />
          </Route>

          {/* <Route path="/" element={<Home />} /> */}
          {/* <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> */}
          {/* <Route path="/" element={<Home />}>
          <Route path="home" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          {loggedInUser ? (
            <>
              <Route path="/dashboard" element={<> Dashboard </>} />
            </>
          ) : (
            <></>
          )}
        </Route> */}

          <Route
            path="/seller"
            element={<PrivateComponent component={<OwnerLayout />} />}
          >
            <Route index element={<OwnerBreadCrumb />} />
            {/* PRODUCT MANAGEMENT */}
            <Route path="product" element={<BookList />} />
            <Route path="product/create" element={<ProductCreate />} />
            <Route path="product/:id" element={<BookUpdate />} />
            {/* BOOK MANAGEMENT */}
            <Route path="book" element={<BookList />} />
            <Route path="book/create" element={<BookCreate />} />
            <Route path="book/:id" element={<BookUpdate />} />

            {/* MESSAGE */}

            {/* OTHERS MANAGEMENT */}
          </Route>
          <Route path="/" element={<PrivateComponent component={<Outlet />} />}>
            <Route path="message" element={<MessageBox />} />
            <Route path="chat" element={<ChatLayout />} />
            <Route path="product-view/:id" element={<DisplayProduct />} />
          </Route>
          {/* <Route path="product-view/:id" element={<DisplayProduct />} /> */}
        </Routes>
      </RootProvider>
    </BrowserRouter>
  );
};

export default App;
