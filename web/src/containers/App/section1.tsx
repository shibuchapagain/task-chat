import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  // margin-top: 20px;
  // display: flex;
  // justify-content: space-around;
  // max-width: 80%;
  // margin-top: 1.5rem;
  display: flex;
  width: 80%;
  margin: 1rem auto;
  justify-content: space-around;
  background-color: #fff;
`;

const Image = styled.img`
  width: 550px;
  margin-right: 20px;
  align-items: center;
`;

const Content = styled.div`
  flex: 1;
  // align-items: center;
  // justify-content: center;
`;

const Title = styled.p`
  display: flex;
  justify-content: center;
  font-weight: 900;
  font-size: 1.5rem;
  // color: green;
  color: #000;
`;

const Paragraph = styled.p`
  margin: 0 auto;
  margin-left: 50px;
  font-size: 1.2rem;
  // color: #eee;
  color: green;
  font-weight: 900;
  display: flex;
  justify-content: center;
`;

const Section1 = () => {
  return (
    <Container>
      <Image src={require('./../../assets/img/scene1.jpg')} alt="My Image" />
      <Content>
        <Title>My Content</Title>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut
          ultricies odio. Nullam congue, dolor vel feugiat tincidunt, arcu est
          commodo tellus, vitae iaculis mi erat sit amet massa. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Sed ut ultricies odio.
          Nullam congue, dolor vel feugiat tincidunt, arcu est commodo tellus,
          vitae iaculis mi erat sit amet massa.
        </Paragraph>
      </Content>
    </Container>
  );
};

export default Section1;
