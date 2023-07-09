import styled from 'styled-components';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Spin } from 'antd';
import { getProduct } from './../containers/Owner/category-service';
import ProductCard from './product-card';
import { useRoot } from './../RootProvider';
import { createMessage } from './../services/commonService';
import socket from './../socket';
import { addChat } from './../socket/functions';
// import CommentComponent from './../containers/Product/comment';
import CommentComponent from './../containers/Product/comment';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

const ProductContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 100%;
  background-color: #eee;
  margin-top: 5px;
`;

const ProductImage = styled.div`
  display: flex;
  width: 27%;
  flex-direction: column;
`;

const ProductContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
`;

const SimilarProduct = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #eee;
  border-left: 1px solid green;
  width: 22%;
`;

const GeneralContent = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #eee;
  margin: 10px;
  padding: 4px;
`;

const Title = styled.p`
  font-size: 15px;
  color: #777777;
`;

const Paragraph = styled.p`
  padding: 6px;
  font-size: 15px;
  color: #454545;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  height: 12px;
  padding: 20px;
  justify-content: space-around;
  border-bottom: 1px solid #bdbdbd;
`;

const Section1 = styled.div`
  width: 85%;
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
`;

const Price = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Price1 = styled.p`
  color: green;
  font-size: 20px;
  font-weight: bold;
`;

const Price2 = styled.p`
  text-decoration: line-through;
  color: red;
  font-size: 20px;
  font-weight: bold;
  padding-left: 5px;
`;

const Brand = styled.p`
  display: inline-block;
  padding: 5px 10px;
  border-radius: 20px;
  background-color: green;
  color: #ffffff;
  font-family: Arial, sans-serif;
  font-weight: bold;
`;

const Name = styled.p`
  font-size: 18px;
  font-weight: 600;
`;

const Phone = styled.p`
  font-size: 18px;
  font-weight: 600;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
  margin-top: 5px;
  border: 10px solid #eee;
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

const Image = styled.img`
  display: flex;
  justify-content: center;
  float: center;
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const ProductView = ({ productData, similarProductData }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { auth } = useRoot();
  const images = productData?.productImages;
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

  const [message, setMessage] = useState();
  const handleMessage = e => {
    setMessage(e.target.value);
  };
  const handleMessageClick = async () => {
    try {
      const payload = {
        buyer: auth?._id,
        seller: productData?.user?._id,
        chatType: 'booking',
        product: productData?._id,
      };
      const data = await createMessage(payload);
      if (data?.success === true) {
        const conversationId = data?.data;
        const chatBy = auth?.role;
        const chatData = {
          conversation: conversationId,
          message: message,
          chatBy: 'buyer' || auth?.role,
        };
        await socket.addChat(chatData);
        navigate('/chat');
      }
    } catch (err) {
      console.log('ERROR ON CREATE MESSAGE AT ADD CHAT', err);
    }
  };

  const ProductContentComponent: any = () => {
    return (
      <>
        <ProductContent>
          <h1>{productData?.title}</h1>
          <p style={{ fontSize: '16px', paddingTop: '10px' }}>
            {productData?.description}
          </p>
          <p
            style={{
              fontSize: '20px',
              fontWeight: 'bold',
              padding: '15px 5px 5px',
            }}
          >
            General
          </p>
          <GeneralContent>
            <div style={{ width: '80%' }}>
              <Content>
                <Title>AD ID:</Title>
                <Paragraph>{'HB-6bde6f'}</Paragraph>
              </Content>
              <Content>
                <Title>Location:</Title>
                <Paragraph>{productData?.address}</Paragraph>
              </Content>
              <Content>
                <Title>Delivery:</Title>
                <Paragraph>{productData?.delivery}</Paragraph>
              </Content>
              <Content>
                <Title>Negotiable:</Title>
                <Paragraph>{productData?.negotiable}</Paragraph>
              </Content>
              <Content>
                <Title>Ads Posted:</Title>
                <Paragraph>{productData?.adsPosted}</Paragraph>
              </Content>
              <Content>
                <Title>Ads Expiry:</Title>
                <Paragraph>{productData?.adsPosted}</Paragraph>
              </Content>
            </div>
          </GeneralContent>
          <p
            style={{
              fontSize: '20px',
              fontWeight: 'bold',
              padding: '10px 5px 5px',
            }}
          >
            Specification
          </p>
          <GeneralContent>
            <div style={{ width: '80%' }}>
              <Content>
                <Title>AD ID:</Title>
                <Paragraph>{'HB-6bde6f'}</Paragraph>
              </Content>
              <Content>
                <Title>Location:</Title>
                <Paragraph>{productData?.address}</Paragraph>
              </Content>
            </div>
          </GeneralContent>
        </ProductContent>
      </>
    );
  };

  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Description',
      children: <ProductContentComponent />,
    },
    {
      key: '2',
      label: 'Comment',
      children: (
        <CommentComponent id={productData?._id} productDetails={productData} />
      ),
    },
  ];

  return (
    <>
      <>
        <Spin spinning={loading}>
          <ProductContainer>
            <ProductImage>
              <ImageContainer>
                {images &&
                  images.map((image, index) => {
                    return (
                      <Image
                        key={index}
                        src={`http://localhost:5000/images/product/${image?.url}`} // || require('./../assets/img/scene1.jpg')
                        alt={'image'}
                        style={{
                          display:
                            index === currentImageIndex ? 'block' : 'none',
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
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  width: '60%',
                }}
              >
                <h3>Owner Name</h3>
                <h3>9864423595</h3>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  alignContent: 'center',
                  // backgroundColor: 'green',
                  backgroundColor: '#f9f9f9',
                  marginTop: '10px',
                }}
              >
                <h4 style={{ marginTop: '4px' }}>Auto Mobiles</h4>
                <span
                  style={{
                    padding: '4px 12px 5px',
                    borderRadius: '15px',
                    backgroundColor: '#454545',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: '#fff',
                  }}
                >
                  Bike
                </span>
              </div>
              {auth ? (
                <>
                  {auth && auth?.role === 'Buyer' ? (
                    <div
                      style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        margin: '20px',
                      }}
                      className="message"
                    >
                      <h4>Send Message</h4>
                      <textarea
                        style={{
                          height: '80px',
                          fontSize: '16px',
                          padding: '8px',
                        }}
                        onChange={handleMessage}
                        // value={setMessage}
                        placeholder="Hi there, is still available?"
                      ></textarea>
                      <Button
                        style={{
                          marginTop: '20px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: '50%',
                          backgroundColor: 'blue',
                          color: '#fff',
                          border: '2px solid #eee',
                          padding: '20px',
                          fontSize: '16px',
                          fontWeight: 700,
                        }}
                        onClick={handleMessageClick}
                      >
                        Send Message
                      </Button>
                    </div>
                  ) : (
                    <> </>
                  )}
                  {/* <h2>Okay</h2> */}
                </>
              ) : (
                <>
                  <h4>You can't before login.</h4>
                </>
              )}
            </ProductImage>
            <div style={{ width: '40%' }}>
              <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
              {/* <h1>{productData?.title}</h1>
              <p style={{ fontSize: '16px', paddingTop: '10px' }}>
                {productData?.description}
              </p>
              <p
                style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  padding: '15px 5px 5px',
                }}
              >
                General
              </p>
              <GeneralContent>
                <Content>
                  <Title>AD ID:</Title>
                  <Paragraph>{'HB-6bde6f'}</Paragraph>
                </Content>
                <Content>
                  <Title>Location:</Title>
                  <Paragraph>{productData?.address}</Paragraph>
                </Content>
                <Content>
                  <Title>Delivery:</Title>
                  <Paragraph>{productData?.delivery}</Paragraph>
                </Content>
                <Content>
                  <Title>Negotiable:</Title>
                  <Paragraph>{productData?.negotiable}</Paragraph>
                </Content>
                <Content>
                  <Title>Ads Posted:</Title>
                  <Paragraph>{productData?.adsPosted}</Paragraph>
                </Content>
                <Content>
                  <Title>Ads Expiry:</Title>
                  <Paragraph>{productData?.adsPosted}</Paragraph>
                </Content>
              </GeneralContent>
              <p
                style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  padding: '10px 5px 5px',
                }}
              >
                Specification
              </p>
              <GeneralContent>
                <Content>
                  <Title>AD ID:</Title>
                  <Paragraph>{'HB-6bde6f'}</Paragraph>
                </Content>
                <Content>
                  <Title>Location:</Title>
                  <Paragraph>{productData?.address}</Paragraph>
                </Content>
                <Content>
                  <Title>Delivery:</Title>
                  <Paragraph>{productData?.delivery}</Paragraph>
                </Content>
                <Content>
                  <Title>Negotiable:</Title>
                  <Paragraph>{productData?.negotiable}</Paragraph>
                </Content>
                <Content>
                  <Title>Ads Posted:</Title>
                  <Paragraph>{productData?.adsPosted}</Paragraph>
                </Content>
                <Content>
                  <Title>Ads Expiry:</Title>
                  <Paragraph>{productData?.adsPosted}</Paragraph>
                </Content>
              </GeneralContent> */}
              {/* <h3>Hello</h3> */}
            </div>
            <SimilarProduct>
              <h4>SIMILAR PRODUCT</h4>
              <ProductCard similarProduct={similarProductData} />
            </SimilarProduct>
          </ProductContainer>
        </Spin>
      </>
    </>
  );
};

export default ProductView;
