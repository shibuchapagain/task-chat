// const Dashboard = () => {
//   return <>THIS IS OWNER DASHBOARD AND ITS SHOULD BE PRIVATE ROUTE.</>;
// };

// export default Dashboard;
import styled from 'styled-components';
import Heading from '../App/Layouts/main/header';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import DisplayProduct from '../Product/product';
import { RenderContent } from '../App/Layouts/main';

export const OwnerNavbar = () => {
  return (
    <>
      <Heading />
    </>
  );
};

const Container = styled.div`
  display: flex;
  // width: 30%;
`;

const Main = styled.div`
  background-color: #eee;
  margin: 10px;
  padding: 10px;
  width: 90%;
`;

const SidebarContainer = styled.div`
  margin-top: 2px;
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 75vh;
  align-items: center;
  padding: 20px;
  background-color: #333;
  color: #fff;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0px 10px;
  text-decoration: none;
`;

const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-size: 18px;
  font-weight: 700;
  padding: 20px;
  &:hover {
    background-color: #fff;
    padding: 12px;
    color: #000;
  }
`;

export const OwnerSidebar = () => {
  return (
    <>
      <Container>
        <SidebarContainer>
          <List>
            <StyledLink to="/seller/product/create">
              Product Management
            </StyledLink>
            <StyledLink to="/seller/book">Book Management</StyledLink>
            <StyledLink to="/book-list">Vehicle Management</StyledLink>
            <StyledLink to="/book-list">Booking Management</StyledLink>
          </List>
          {/* </SidebarContent> */}
        </SidebarContainer>
      </Container>
    </>
  );
};

export const OwnerBreadCrumb = () => {
  return (
    <>
      <Breadcrumb
        items={[
          {
            title: 'Dashboard',
          },
        ]}
      />
    </>
  );
};

export const OwnerContent = () => {
  return (
    <>
      <h4>OWNER CONTENT IS HERE:</h4>
      {/* <DisplayProduct /> */}
      <RenderContent />
    </>
  );
};

export const OwnerFooter = () => {
  return <>THIS IS FOOTER</>;
};
