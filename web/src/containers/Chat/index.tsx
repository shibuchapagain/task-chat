import React, { useCallback, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import socket from './../../socket';
import { useDispatch, useSelector } from 'react-redux';
import { setConversations, setLoading } from './../../reducers/Chat';
import { useRoot } from './../../RootProvider';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const LeftSide = styled.div`
  width: 25%;
  padding: 20px;
  border: 2px solid green;
  & > div {
    margin-bottom: 10px;
  }

  /* & > div {
    padding-bottom: 10px; 
  } */
`;

const User = styled.div`
  border: 2px solid #eee;
  border-radius: 15px;
  cursor: pointer;
  &:hover {
    background-color: #7f7f7f;
    color: black;
  }
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = styled.img`
  height: 45px;
  width: 45px;
  border-radius: 50%;
  margin-right: 10px;
  padding: 5px;
`;

const UserName = styled.div`
  font-weight: bold;
`;

const LatestChat = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 20px;
  border-radius: 8px;
`;

const RightSide = styled.div`
  flex: 2;
  padding: 20px;
`;

const MessageSection = styled.div`
  height: calc(100% - 80px);
  overflow-y: scroll;
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

interface ConversationProps {
  isOutgoing?: boolean;
}

const Conversation = styled.div<ConversationProps>`
  margin-bottom: 10px;
  display: flex;
  flex-direction: ${({ isOutgoing }) => (isOutgoing ? 'row' : 'row-reverse')};
`;

interface MessageProps {
  isOutgoing?: boolean;
}

const Message = styled.div<MessageProps>`
  background-color: ${({ isOutgoing }) => (isOutgoing ? '#f0f0f0' : '#0084ff')};
  color: ${({ isOutgoing }) => (isOutgoing ? '#000' : '#fff')};
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 5px;
  align-self: ${({ isOutgoing }) => (isOutgoing ? 'flex-end' : 'flex-start')};
`;

const MessageInputContainer = styled.form`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const MessageInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 2px solid #222;
  border-radius: 8px;
`;

const SendButton = styled.button`
  padding: 10px;
  border: none;
  border-radius: 8px;
  margin-left: 10px;
  background-color: blue;
  color: #fff;
`;

const ChatLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth } = useRoot();
  const [sendMessage, setSendMessage] = useState('');
  const [conversationId, setConversationId] = useState('');
  const loadingSelector = useSelector((state: any) => state.chat.loading);
  let chatData = useSelector((state: any) => state.chat.chatData);
  let updateChat = useSelector((state: any) => state.chat.updateChat);
  let getAllConversations = useSelector(
    (state: any) => state.chat.chatConversationData,
  );
  const messageInputRef = useRef<HTMLInputElement | null>(null);
  const messageContainerRef = useRef<HTMLDivElement | null>(null);
  interface Active {
    id: string;
    active: boolean;
  }
  const [isActive, setIsActive] = useState<Active>({
    id: '',
    active: false,
  });

  useEffect(() => {
    dispatch(setLoading(true));
    socket.getConversations();
    if (conversationId) {
      socket.getConversationChats(conversationId);
    }
    dispatch(setLoading(false));
  }, [updateChat]);

  const loadChat = (): any => {
    const fetchData = async () => {
      dispatch(setLoading(true));
      await socket.getConversations();
      if (chatData) {
        // socket.disconnectSocket();
        dispatch(setLoading(false));
      }
    };
    fetchData();
  };

  useEffect(() => {
    setTimeout(() => {
      loadChat();
    }, 800);
  }, []);

  const newData = chatData?.map(item => ({
    ...item,
    chatByMe: true,
    iam: (auth?.role).toLowerCase(),
  }));

  const handleMessageChange = e => {
    setSendMessage(e.target.value);
  };

  console.log(conversationId, 'one');

  const handleSendMessage = async e => {
    console.log(conversationId, 'wow');
    e.preventDefault();
    const authRole = (auth?.role).toLowerCase();
    const chatData = {
      conversation: conversationId,
      message: sendMessage,
      chatBy: authRole,
    };
    try {
      await socket.addChat(chatData);
      await socket.getConversations();
      await socket.getConversationChats(conversationId);
      // await socket.getConversationChats(conversationId);
      if (messageContainerRef.current) {
        messageContainerRef.current.scrollTop =
          messageContainerRef.current.scrollHeight;
      }
    } catch (err) {
      console.log(err);
    } finally {
      navigate('/chat');
    }
    if (messageInputRef.current) {
      messageInputRef.current.value = ''; // Clear the input field
    }
  };

  const handleShowAllChat = (id: any): any => {
    setIsActive(prevState => ({
      id: id,
      active: true,
    }));
    const fetchData = async (id: any) => {
      dispatch(setLoading(true));
      await socket.getConversationChats(id);
      if (getAllConversations) {
        dispatch(setLoading(false));
      }
      if (messageContainerRef.current) {
        messageContainerRef.current.scrollTop =
          messageContainerRef.current.scrollHeight;
      }
      dispatch(setLoading(false));
    };
    // fetchData(id);
    if (id) {
      fetchData(id);
    }
  };

  // useEffect(() => {
  //   handleShowAllChat(conversationId);
  // }, []);

  const chatMessages = getAllConversations?.chats
    ?.map((chat: any, index: number) => {
      const isOutgoing = chat?.chatBy === auth?.role.toLowerCase();
      const flexDirection = isOutgoing ? 'row-reverse' : 'row';
      const alignSelf = isOutgoing ? 'flex-end' : 'flex-start';
      const backgroundColor = isOutgoing ? '#0084ff' : '#f0f0f0';
      const textColor = isOutgoing ? '#fff' : '#000';
      const isLastMessage = index === getAllConversations?.chats.length - 1;
      return (
        <Conversation
          key={chat._id}
          isOutgoing={isOutgoing}
          style={{ flexDirection }}
        >
          <Message
            isOutgoing={isOutgoing}
            style={{ alignSelf, backgroundColor, color: textColor }}
          >
            <p>{chat.message}</p>
          </Message>
          {isLastMessage && <div ref={messageContainerRef} />}
        </Conversation>
      );
    })
    .reverse();

  return (
    <Container>
      <LeftSide>
        {loadingSelector
          ? 'loading.......'
          : newData?.map((item, key) => (
              <User
                onClick={() => {
                  setConversationId(item?.id);
                  handleShowAllChat(item?.id);
                }}
                key={item._id}
                // style={isActive?.id === item?.id && isActive?.active===true ? "backgroundColor":"red" : "blue"}
                style={
                  isActive?.id === item?.id && isActive?.active === true
                    ? { backgroundColor: '#eee' }
                    : { backgroundColor: '#fff' }
                }
              >
                <UserProfile>
                  <Avatar
                    src={require('./../../assets/img/aarav.jpg')}
                    alt="User Avatar"
                  />
                  <UserName>
                    {item?.iam === 'buyer'
                      ? item?.seller?.fullName
                      : item?.buyer?.fullName}
                  </UserName>
                </UserProfile>
                {item?.chats.map(chat => {
                  const ago = moment.utc(chat?.createdAt).local().fromNow();
                  return (
                    <LatestChat key={chat._id}>
                      <p>{chat?.message}</p>
                      <p>{ago}</p>
                    </LatestChat>
                  );
                })}
              </User>
            ))}
      </LeftSide>

      <RightSide>
        <MessageSection
          style={{
            display: 'flex',
            flexDirection: 'column-reverse',
          }}
        >
          <MessageContainer ref={messageContainerRef}>
            {chatMessages}
          </MessageContainer>
        </MessageSection>
        <MessageInputContainer onSubmit={handleSendMessage}>
          <MessageInput
            ref={messageInputRef}
            onChange={handleMessageChange}
            type="text"
            placeholder="Type your message"
          />
          <SendButton type="submit">Send</SendButton>
        </MessageInputContainer>
      </RightSide>
    </Container>
  );
};

export default ChatLayout;
