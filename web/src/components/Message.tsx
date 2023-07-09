import { Button } from 'antd';
import styled from 'styled-components';

const MessageContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 80%;
  background-color: #eee;
  height: 90vh;
  margin: auto;
`;

const MessageUser = styled.div`
  width: 30%;
  background-color: #f5f5f5;
  position: sticky;
  top: 0;
  border: 5px solid green;
`;

const MessageContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  background-color: #f4f4f4;
`;

const IncomingMessage = styled.div`
  //   display: block;
  background-color: #0084ff;
  color: white;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 10px;
  max-width: 300px;
  float: left;
  border: 5px solid green;
`;

const OutgoingMessage = styled.div`
  background-color: #f6f7f9;
  color: black;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 10px;
  max-width: 300px;
  float: right;
  border: 5px solid blue;
`;

// const MessageBox = () => {
//   const TestMessageSender = 'Hello, how are you?';
//   const TestMessageReceiver = 'I am good. How about you?';

//   return (
//     <>
//       <MessageContainer>
//         <MessageUser>
//           <h2>Sender Name:</h2>
//         </MessageUser>
//         <MessageContent>
//           <div className="sellerProfile">
//             <h2>Sender Profile:</h2>
//           </div>
//           <div
//             style={{ width: '100%', height: '80vh', backgroundColor: '#eee' }}
//             className="messageContent"
//           >
//             <IncomingMessage>
//               <p>Hello</p>
//             </IncomingMessage>
//             <OutgoingMessage>Hi</OutgoingMessage>
//           </div>
//           <div
//             style={{
//               display: 'flex',
//               justifyContent: 'space-evenly',
//               width: '100%',
//               padding: '20px',
//             }}
//             className="inputField"
//           >
//             <input style={{ padding: '10px', width: '80%' }} type="text" />
//             <Button
//               style={{
//                 backgroundColor: 'blue',
//                 color: '#fff',
//               }}
//             >
//               Send
//             </Button>
//           </div>
//         </MessageContent>
//       </MessageContainer>
//     </>
//   );
// };

const MessageBox = () => {
  const TestMessageSender = 'Hello, how are you?';
  const TestMessageReceiver = 'I am good. How about you?';

  return (
    <>
      <MessageContainer>
        <MessageUser>
          <h2>Sender Name:</h2>
        </MessageUser>
        <MessageContent>
          <div className="sellerProfile">
            <h2>Sender Profile:</h2>
          </div>
          <div
            style={{ width: '100%', height: '80vh', backgroundColor: '#eee' }}
            className="messageContent"
          >
            <div style={{ backgroundColor: 'red' }}>
              <IncomingMessage>
                <p>Hello</p>
              </IncomingMessage>
            </div>
            <div>
              <OutgoingMessage>Hi</OutgoingMessage>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-evenly',
              width: '100%',
              padding: '20px',
            }}
            className="inputField"
          >
            <input style={{ padding: '10px', width: '80%' }} type="text" />
            <Button
              style={{
                backgroundColor: 'blue',
                color: '#fff',
              }}
            >
              Send
            </Button>
          </div>
        </MessageContent>
      </MessageContainer>
    </>
  );
};

export default MessageBox;
