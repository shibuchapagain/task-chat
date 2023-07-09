// {
//   /* <LeftSide>
//         <User>
//           <UserProfile>
//             <Avatar
//               src={require('./../../assets/img/aarav.jpg')}
//               alt="User Avatar"
//             />
//             {newData?.map(item => {
//               return (
//                 <UserName>
//                   {item?.iam === 'buyer'
//                     ? item?.seller?.fullName
//                     : item?.buyer?.fullName}
//                 </UserName>
//               );
//             })}
//           </UserProfile>
//           {newData?.map(item => {
//             const ago = moment.utc(item?.chats[0]?.createdAt).local().fromNow();
//             return (
//               <LatestChat>
//                 <p>{item?.chats[0]?.message}</p>
//                 <p>{ago}</p>
//               </LatestChat>
//             );
//           })}
//         </User>
//       </LeftSide> */
// }
// export {};

/////////////////////////////////////

//  {/* <RightSide>
//         <MessageSection>
//           <MessageContainer>
//             <Conversation isOutgoing>
//               <Message isOutgoing>
//                 <p>Outgoing message 113333</p>
//               </Message>
//             </Conversation>
//             <Conversation>
//               <Message>
//                 <p>Incoming message 11</p>
//               </Message>
//             </Conversation>
//           </MessageContainer>
//           <MessageContainer>
//             <Conversation isOutgoing>
//               <Message isOutgoing>
//                 <p>Outgoing message 21222</p>
//               </Message>
//             </Conversation>
//             <Conversation>
//               <Message>
//                 <p>Incoming message 222</p>
//               </Message>
//             </Conversation>
//             <Conversation isOutgoing>
//               <Message isOutgoing>
//                 <p>Outgoing message 322</p>
//               </Message>
//             </Conversation>
//           </MessageContainer>
//         </MessageSection>
//         <MessageInputContainer>
//           <MessageInput
//             onChange={handleMessageChange}
//             type="text"
//             placeholder="Type your message"
//           />
//           <SendButton onClick={handleSendMessage}>Send</SendButton>
//         </MessageInputContainer>
//       </RightSide> */}

////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////

//   const handleShowAllChat = (id: any): any => {
//     alert(id);
//     const fetchData = async (id: any) => {
//       dispatch(setLoading(true));
//       await socket.getConversationChats(id);
//       if (getAllConversations) {
//         dispatch(setLoading(false));
//       }
//       dispatch(setLoading(false));
//     };

//     if (id) {
//       fetchData(id);
//     }
//   };

//   console.log(chatData && chatData, 'zero');
//   console.log(getAllConversations && getAllConversations, 'one');

//   let chatMessages = ''; // Initialize an empty string to store the formatted messages

//   // Iterate through each chat object in the chats array
//   getAllConversations?.chats?.forEach((chat: any) => {
//     // Check if the chat is outgoing or incoming based on the chatBy property
//     const isOutgoing = chat.chatBy === 'buyer' ? 'isOutgoing' : '';

//     // Create the formatted message section for each chat
//     const messageSection = `
//     <MessageSection>
//       <MessageContainer>
//         <Conversation ${isOutgoing}>
//           <Message ${isOutgoing}>
//             <p>${chat.message}</p>
//           </Message>
//         </Conversation>
//       </MessageContainer>
//     </MessageSection>
//   `;

//     // Append the formatted message section to the chatMessages string
//     chatMessages += messageSection;
//   });

//   // Construct the final formatted chat content
//   const formattedChatContent = `
//   <RightSide>
//     ${chatMessages}
//     <MessageInputContainer>
//       <MessageInput
//         onChange={handleMessageChange}
//         type="text"
//         placeholder="Type your message"
//       />
//       <SendButton onClick={handleSendMessage}>Send</SendButton>
//     </MessageInputContainer>
//   </RightSide>
// `;

//   // Now you can use the formattedChatContent string wherever you need it
//   console.log(formattedChatContent);

//   return (
//     <Container>
//       <LeftSide>
//         {loadingSelector
//           ? 'loading.......'
//           : newData?.map(item => (
//               <User
//                 onClick={() => {
//                   handleShowAllChat(item?.id);
//                 }}
//                 key={item._id}
//               >
//                 <UserProfile>
//                   <Avatar
//                     src={require('./../../assets/img/aarav.jpg')}
//                     alt="User Avatar"
//                   />
//                   <UserName>
//                     {item?.iam === 'buyer'
//                       ? item?.seller?.fullName
//                       : item?.buyer?.fullName}
//                   </UserName>
//                 </UserProfile>
//                 {item?.chats.map(chat => {
//                   const ago = moment.utc(chat?.createdAt).local().fromNow();
//                   return (
//                     <LatestChat key={chat._id}>
//                       <p>{chat?.message}</p>
//                       <p>{ago}</p>
//                     </LatestChat>
//                   );
//                 })}
//               </User>
//             ))}
//       </LeftSide>

//       <RightSide dangerouslySetInnerHTML={{ __html: formattedChatContent }} />
//     </Container>
//   );
// };

// export default ChatLayout;

//// -->

// {
//   /* <RightSide>
//   <MessageSection>
//     <MessageContainer>
//       {getAllConversations?.chats?.map((chat: any) => {
//         const isOutgoing = chat.chatBy === 'buyer' ? 'isOutgoing' : '';

//         return (
//           <Conversation key={chat._id} className={isOutgoing}>
//             <Message className={isOutgoing}>
//               <p>{chat.message}</p>
//             </Message>
//           </Conversation>
//         );
//       })}
//     </MessageContainer>
//   </MessageSection>

//   <MessageInputContainer>
//     <MessageInput
//       onChange={handleMessageChange}
//       type="text"
//       placeholder="Type your message"
//     />
//     <SendButton onClick={handleSendMessage}>Send</SendButton>
//   </MessageInputContainer>
// </RightSide>; */
// }

export {};
