import { Button } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';

const ProductContainer = styled.div`
  margin: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px 10px 5px;
  width: 285px;
  height: 300px; /* Set a fixed height */
  overflow: auto; /* Add scroll bar if content overflows */
  border: 1px solid #ccc;
  border-radius: 15px;
  background-color: #eee;
  cursor: pointer;
`;

const Image = styled.img`
  display: flex;
  justify-content: center;
  float: center;
  width: 100%;
  height: 150px;
`;

const Title = styled.p`
  font-size: 14px;
  font-weight: 550;
  color: #777777;
`;

const Paragraph = styled.p`
  padding: 6px;
  font-size: 14px;
  font-weight: 600;
  color: #454545;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  height: 12px;
  padding: 10px;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 150px;
  overflow: hidden;
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: transparent;
  border: none;
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  outline: none;
  cursor: pointer;
`;

const LeftArrowButton = styled(ArrowButton)`
  left: 10px;
`;

const RightArrowButton = styled(ArrowButton)`
  right: 10px;
`;

const ContentContainer = styled.div``;

const BookCard = ({
  images,
  title,
  price,
  address,
  condition,
  owner,
  description,
  handleClick,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleLeftArrowClick = () => {
    setCurrentImageIndex(
      currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1,
    );
  };

  const handleRightArrowClick = () => {
    setCurrentImageIndex(
      currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1,
    );
  };

  // const handleClick = () => {
  //   alert('you click on product');
  // };
  return (
    <ProductContainer onClick={handleClick}>
      <ImageContainer>
        {images.map((image, index) => {
          return (
            <Image
              key={index}
              src={`http://localhost:5000/images/product/${image}`} // || require('./../assets/img/scene1.jpg')
              alt={title}
              style={{
                display: index === currentImageIndex ? 'block' : 'none',
              }}
            />
          );
        })}
        <LeftArrowButton onClick={handleLeftArrowClick}>
          &#8249;
        </LeftArrowButton>
        <RightArrowButton onClick={handleRightArrowClick}>
          &#8250;
        </RightArrowButton>
      </ImageContainer>
      <ContentContainer>
        <Content style={{ marginTop: '6px' }}>
          <Title>Title:</Title>
          <Paragraph>{title}</Paragraph>
        </Content>
        <Content>
          <Title>Price:</Title>
          <Paragraph>Npr. {price}</Paragraph>
        </Content>
        <Content>
          <Title>Address:</Title>
          <Paragraph>{address}</Paragraph>
        </Content>
        <Content>
          <Title>Condition:</Title>
          <Paragraph>{condition}</Paragraph>
        </Content>
        <Content>
          <Title>Owner:</Title>
          <Paragraph>{owner}</Paragraph>
        </Content>
        <Content>
          <Title>Description:</Title>
          <Paragraph>{description}</Paragraph>
        </Content>
        <Button
          style={{
            backgroundColor: 'green',
            color: '#fff',
            display: 'block',
            margin: '4px auto 1px',
            fontWeight: '600',
          }}
        >
          Buy Now
        </Button>
      </ContentContainer>
    </ProductContainer>
  );
};

export default BookCard;
