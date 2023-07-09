import styled from 'styled-components';
import ThemeType from './../../../../utils/theme';
// import image1 from './../../../../assets/img/leo.jpg';
const Container = styled.div`
  margin-top: 10px;
  position: relative;
  width: 100%;
  height: 400px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Text = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  color: #fff;
  font-size: 24px;
`;
const Body = () => {
  return (
    <>
      <Container>
        <Image
          src={require('./../../../../assets/img/new-tour-4.jpg')}
          alt="Nature"
        />
        <Text>Some Text Over the Image</Text>
        {/* <ThemeType size={10}>HI IAM SHIVA</ThemeType> */}
      </Container>
    </>
  );
};

export default Body;
