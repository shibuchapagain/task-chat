import { Card } from 'antd';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const CardComponent = styled(Card)`
  margin-top: 20px;
  &:hover {
    border: 2px solid #f4f4f4;
  }
`;

const ProductCard = ({ similarProduct }) => {
  const navigate = useNavigate();
  return (
    <>
      {similarProduct &&
        similarProduct?.map(product => (
          <CardComponent
            key={product?._id}
            onClick={() => navigate(`/product-view/${product?._id}`)}
            bodyStyle={{
              display: 'flex',
              justifyContent: 'center',
              height: '35px',
              margin: 0,
              padding: '5px',
              backgroundColor: '#E6E4E4',
            }}
            hoverable
            style={{ width: '90%' }}
            cover={
              <img
                style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                alt="example"
                src={`http://localhost:5000/images/product/1684491570564new-tour-2.jpg`} // || require('./../assets/img/scene1.jpg')
              />
            }
          >
            <div
              style={{
                display: 'flex',
                width: '90%',
                justifyContent: 'space-around',
              }}
            >
              <h4>{product?.title}</h4>
              <h4>NRs. {product?.price}</h4>
            </div>
          </CardComponent>
        ))}

      {/* <CardComponent
        bodyStyle={{
          display: 'flex',
          justifyContent: 'center',
          height: '35px',
          margin: 0,
          padding: '5px',
          backgroundColor: '#E6E4E4',
        }}
        hoverable
        style={{ width: '90%' }}
        cover={
          <img
            style={{ width: '100%', height: '150px', objectFit: 'cover' }}
            alt="example"
            src={`http://localhost:5000/images/product/1684491570564new-tour-2.jpg`} // || require('./../assets/img/scene1.jpg')
          />
        }
      >
        <div
          style={{
            display: 'flex',
            width: '90%',
            justifyContent: 'space-around',
          }}
        >
          <h4>Product Name</h4>
          <h4>NRs. 400</h4>
        </div>
      </CardComponent> */}
    </>
  );
};

export default ProductCard;
