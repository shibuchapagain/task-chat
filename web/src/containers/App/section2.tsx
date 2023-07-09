import { Button } from 'antd';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  //   justify-content: space-between;
  background-color: #eee;
  margin-top: 10px;
  height: 53px;
  align-items: center;
`;

const Link = styled.p`
  font-weight: 700;
  font-size: 16px;
  font-family: Poppins;
  text-align: center;
  color: #000;
`;

const Main = styled.div`
  margin-top: 10px;
  position: relative;
  width: 100%;
  height: 90vh;
`;

const Image = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const TextCard = styled.div`
  position: absolute;
  z-index: 1;
  top: 20%;
  margin-top: 40px;
  left: 10%;
  background-color: #000;
  width: 40%;
`;

const Cards = styled.div`
  background-color: red;
  padding: 50px;
  width: 50px;
  height: 50px;
`;

const Trekking = styled.div`
  margin-top: 40px;
  background-color: #eee;
`;

const Title = styled.p`
  display: flex;
  justify-content: center;
  font-size: 2rem;
  color: green;
  font-weight: 900;
`;

const Paragraph = styled.p`
  padding: 1px;
  display: flex;
  justify-content: center;
  font-color: black;
  font-size: 1rem;
`;

const ImageSection = styled.div`
  display: flex;
  margin: 10px;
  padding: 10px;
  justify-content: space-around;
`;

const Section2 = () => {
  return (
    <>
      <Container>
        <div
          style={{
            // backgroundColor: 'black',
            flex: '50%',
            color: '#008CDC',
            marginLeft: '80px',
            fontSize: '20px',
            alignItems: 'center',
            fontWeight: 700,
          }}
        >
          Shibu chapagain
        </div>
        <div
          style={{
            flex: '60%',
            display: 'flex',
            justifyContent: 'space-around',
          }}
        >
          <Link>Home</Link>
          <Link>About</Link>
          <Link>Trekking In Nepal</Link>
          <Link>Events</Link>
          <Link>Blog</Link>
          <Link>Contact</Link>
        </div>
      </Container>
      <Main>
        <Image src={require('./../../assets/img/scene2.jpg')} alt="Nature" />
        <TextCard>
          <h2
            style={{
              color: '#fff',
              marginTop: '45px',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            READY FOR ADVENTURE
          </h2>
          <p
            style={{
              color: '#fff',
              maxWidth: '82%',
              margin: '30px auto',
            }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Est ipsa
            fuga debitis velit laudantium adipisci repellendus quasi minus
            aliquam, officiis porro qui natus saepe magnam ad laboriosam
            facilis, nemo eum cum. Sequi voluptate.
          </p>
          <Button
            style={{
              backgroundColor: 'green',
              color: '#fff',
              display: 'block',
              height: '40px',
              borderRadius: '5%',
              margin: '20px 30px',
              fontWeight: 600,
              fontSize: '17px',
            }}
          >
            Book now
          </Button>
        </TextCard>
      </Main>
      <Trekking>
        <Title>Trekking in Nepal</Title>
        <Paragraph>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
          voluptate molestiae unde consectetur.
        </Paragraph>
      </Trekking>
      <ImageSection>
        <Image src={require('./../../assets/img/scene3.jpg')} alt="image" />
        {/* <Image src={require('./../../assets/img/injection.webp')} alt="image" />
        <Image src={require('./../../assets/img/injection.webp')} alt="image" />
        <Image src={require('./../../assets/img/injection.webp')} alt="image" /> */}
      </ImageSection>
    </>
  );
};

export default Section2;
