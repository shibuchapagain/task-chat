// export const CommentSection = () => {
//   return <>comment section</>;
// };
// //

import { Button } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { createComment, getAllComments } from './commentService';
import { toast } from 'react-toastify';
// import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import socket from './../../socket';

const CommentContainers = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 15px 15px 5px;
  border: 1px solid #ccc;
  border-radius: 15px;
  background-color: #f6f7f8;
  margin-block: 15px;
`;

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 16px;
  overflow-y: auto;
  max-height: 400px;
  border: 4px solid #ccc;
  border-radius: 15px;
  padding: 5px 10px;
`;

const CommentContentss = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 16px;
  margin: 10px 20px;
`;

const CommentAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 12px;
`;

const CommentContent = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid #fff;
  padding: 5px;
  margin: 5px 5px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  width: 95%;
`;

const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
  padding: 8px;
  background-color: #f6f7f8;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

const CommentAuthor = styled.span`
  font-weight: bold;
  margin-right: 8px;
  font-weight: bold;
  font-size: 14px;
  color: #385898;
`;

const CommentText = styled.p`
  line-height: 1.4;
  margin: 8px;
  font-size: 14px;
`;

const CommentComponent = ({ id, productDetails }) => {
  const navigate = useNavigate();
  const messageInputRef = useRef<HTMLTextAreaElement | null>(null);
  const [commentActive, setCommentActive] = useState(false);
  const [refreshComments, setRefreshComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentPayload, setCommentPayload]: any = useState({
    parentId: '',
    replyTo: '',
  });
  const [replyId, setReplyId] = useState('');

  const [showReplyBox, setShowReplyBox] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsData = await getAllComments(id);
        setComments(commentsData?.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    fetchComments();
    setRefreshComments(false);
  }, [id, refreshComments]);

  const ReplyComment = ({ comment, isChild, parentId, replyTo, onReply }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [showReplyBox, setShowReplyBox] = useState(false);
    const handleReplyClick = () => {
      setCommentPayload({
        parentId,
        replyTo,
      });
      setReplyId(parentId);
      // alert(parentId);
      // setActiveReplyId(replyId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setShowReplyBox(prevState => !prevState);
      setCommentActive(true);
    };
    return (
      <>
        <div>
          {/* {comment?.map((comment, index) => {
          return (
            <CommentContent style={{ margin: '5px 10px' }}>
              <CommentHeader>
                <CommentAvatar src={comment?.avatar} alt="Avatar" />
                <CommentAuthor>{comment?.author}</CommentAuthor>
              </CommentHeader>
              <CommentText>{comment?.text}</CommentText>
              <div>
                <button>Like</button>
                <button>Reply</button>
              </div>
              {comment.replies && (
                <div>
                  {Array(comment?.replies)?.map((reply, index) => (
                    <ReplyComment key={index} comment={reply} isChild={false} />
                  ))}
                </div>
              )}
            </CommentContent>
          );
        })} */}
          {isChild ? (
            <>
              {comment &&
                comment?.map((comment, index) => {
                  return (
                    <CommentContent style={{ margin: '10px 25px' }}>
                      <CommentHeader>
                        {/* <CommentAvatar src={comment?.avatar} alt="Avatar" /> */}
                        {/* <CommentAvatar
                        src={require('https://www.shutterstock.com/image-vector/male-user-icon-vector-260nw-175066871.jpg')}
                        alt="Avatar"
                      /> */}
                        <CommentAvatar
                          src={require('./../../assets/img/aarav.jpg')}
                          alt="Avatar"
                        />
                        {/* <CommentAuthor>{comment?.author}</CommentAuthor> */}
                        {/* <CommentAuthor>{'SHIBU'}</CommentAuthor> */}
                        <CommentAuthor>{`${comment?.user?.firstName} ${comment?.user?.lastName}`}</CommentAuthor>
                      </CommentHeader>
                      {/* <CommentText>{comment?.text}</CommentText> */}
                      <CommentText>{comment?.comment}</CommentText>
                      <div>
                        {/* <button>Like</button> */}
                        <button
                          style={{
                            margin: '0 15px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            background: 'transparent',
                            cursor: 'pointer',
                            padding: '2px 4px',
                            fontSize: '12px',
                          }}
                          onClick={handleReplyClick}
                        >
                          Reply
                        </button>
                      </div>
                      {comment?.replies && (
                        <div>
                          {Array(comment?.replies)?.map((reply, index) => (
                            <ReplyComment
                              key={index}
                              comment={reply}
                              isChild={false}
                              parentId={comment?.parentId}
                              replyTo={comment?.user}
                              onReply={handleReplyClick}
                            />
                          ))}
                        </div>
                      )}
                    </CommentContent>
                  );
                })}
            </>
          ) : (
            <>
              {comment?.map((comment, index) => {
                return (
                  <CommentContent style={{ margin: '5px 0px' }}>
                    <CommentHeader>
                      {/* <CommentAvatar src={comment?.avatar} alt="Avatar" /> */}
                      <CommentAvatar
                        src={require('https://www.shutterstock.com/image-vector/male-user-icon-vector-260nw-175066871.jpg')}
                        alt="Avatar"
                      />
                      {/* <CommentAuthor>{comment?.author}</CommentAuthor> */}
                      <CommentAuthor>{`${comment?.user?.firstName} ${comment?.user?.lastName}`}</CommentAuthor>
                    </CommentHeader>
                    <CommentText>{comment?.comment}</CommentText>
                    <div>
                      {/* <button>Like</button> */}
                      <button onClick={handleReplyClick}>Reply</button>
                    </div>
                  </CommentContent>
                );
              })}
            </>
          )}
        </div>
      </>
    );
  };

  const Comment = ({ comments }: any) => {
    const [activeReplyId, setActiveReplyId] = useState(null);
    const handleReply = (parentId, replyTo) => {
      setCommentPayload({
        parentId,
        replyTo,
      });
      console.log(parentId, 'you click on here');
      setCommentActive(true);
      // setActiveReplyId(replyId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    return (
      <CommentContainer>
        {comments &&
          comments.map((comment, index) => {
            return (
              <CommentContent key={index}>
                <CommentHeader>
                  <CommentAvatar
                    src={require('./../../assets/img/aarav.jpg')}
                    alt="Avatar"
                  />
                  {/* <CommentAuthor>{'SHIBU'}</CommentAuthor> */}
                  <CommentAuthor>{`${comment?.user?.firstName} ${comment?.user?.lastName}`}</CommentAuthor>
                </CommentHeader>
                <CommentText>{comment?.comment}</CommentText>
                <div>
                  {/* <button>Like</button> */}
                  <button
                    style={{
                      margin: '0 15px',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      background: 'transparent',
                      cursor: 'pointer',
                      padding: '2px 4px',
                      fontSize: '12px',
                    }}
                    onClick={() => handleReply(comment?._id, comment?.user)}
                  >
                    Reply
                  </button>
                </div>
                {comment?.replies && (
                  <div>
                    {Array(comment?.replies)?.map((reply: any, index: any) => {
                      return (
                        <ReplyComment
                          key={index}
                          comment={reply}
                          isChild={true}
                          parentId={comment?._id}
                          replyTo={comment?.user}
                          onReply={handleReply}
                        />
                      );
                    })}
                  </div>
                )}
              </CommentContent>
            );
          })}
      </CommentContainer>
    );
  };

  // const CommentComponent = () => {
  // };
  const sampleComment = [
    {
      avatar:
        'https://www.shutterstock.com/image-vector/male-user-icon-vector-260nw-175066871.jpg',
      author: 'John',
      text: 'This is a great post! Keep up the good work!',
      replies: [
        {
          avatar:
            'https://www.shutterstock.com/image-vector/male-user-icon-vector-260nw-175066871.jpg',
          author: 'Hello smith',
          text: 'Thank you!',
          replies: [],
        },
        {
          avatar:
            'https://www.shutterstock.com/image-vector/male-user-icon-vector-260nw-175066871.jpg',
          author: 'Nested Nested smith',
          text: 'Thank you!',
        },
      ],
    },
    {
      avatar:
        'https://www.shutterstock.com/image-vector/male-user-icon-vector-260nw-175066871.jpg',
      author: 'John Doe',
      text: 'This is a great post! Keep up the good work!',
    },
    {
      avatar:
        'https://www.shutterstock.com/image-vector/male-user-icon-vector-260nw-175066871.jpg',
      author: 'John Doe',
      text: 'This is a great post! Keep up the good work!',
    },
    {
      avatar:
        'https://www.shutterstock.com/image-vector/male-user-icon-vector-260nw-175066871.jpg',
      author: 'John Doe',
      text: 'This is a great post! Keep up the good work!',
    },
    {
      avatar:
        'https://www.shutterstock.com/image-vector/male-user-icon-vector-260nw-175066871.jpg',
      author: 'John Doe',
      text: 'This is a great post! Keep up the good work!',
    },
    {
      avatar:
        'https://www.shutterstock.com/image-vector/male-user-icon-vector-260nw-175066871.jpg',
      author: 'John Doe',
      text: 'This is a great post! Keep up the good work!',
    },
  ];

  const [comment, setComment] = useState('');
  const handleChangeComment = e => {
    setComment(e.target.value);
  };
  const handleCommentClick = async e => {
    e.preventDefault();
    // alert(productDetails?.user?._id);
    // console.log(commentPayload, 'check comment payload');
    const payload = {
      // ...commentPayload,
      parentId: commentPayload?.parentId ? commentPayload?.parentId : '',
      replyTo: commentPayload?.replyTo
        ? commentPayload?.replyTo
        : productDetails?.user?._id,
      comment,
      product: productDetails?._id,
    };
    console.log(refreshComments, 'check');
    console.log(payload, 'check payload');

    try {
      const data = await createComment(payload);
      // console.log(data, 'success data');
      if (data?.success === true) {
        setCommentActive(false);
        socket.getUserNotifications();
        console.log('iam in create comment send btn');
        toast.success('Comment successfully');
        setRefreshComments(true);
        // setCommentPayload({});
        navigate(`/product-view/${productDetails?._id}`);
      }
    } catch (err: any) {
      toast.warning(err);
    } finally {
      setRefreshComments(true);
      setCommentActive(false);
      // setRefreshComments(true);
      setCommentPayload({});
      navigate(`/product-view/${productDetails?._id}`);
      if (messageInputRef.current) {
        messageInputRef.current.value = ''; // Clear the input field
      }
    }
  };
  return (
    <>
      <CommentContainers>
        <form
          onSubmit={handleCommentClick}
          style={{
            width: '90%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <textarea
            style={{
              width: '85%',
              height: '12vh',
              fontSize: '16px',
              padding: '12px 8px',
              backgroundColor: commentActive ? '#E6F2FF' : 'initial',
              border: commentActive ? '2px solid #4285F4' : '1px solid #CCC',
              boxShadow: commentActive ? '0 0 4px rgba(0, 0, 0, 0.2)' : 'none',
              color: commentActive ? '#333' : '#555',
              borderRadius: '10px',
            }}
            onChange={handleChangeComment}
            placeholder="Write your comment"
            disabled={!setCommentActive}
            ref={messageInputRef}
          />
          <button
            style={{
              backgroundColor: 'blue',
              fontSize: '14px',
              color: '#fff',
              width: '12%',
              margin: '10px 0',
              padding: '8px 5px',
              borderRadius: '5px',
              border: '1px solid #fff',
              cursor: 'pointer',
            }}
            type="submit"
            // onClick={handleCommentClick}
          >
            Send
          </button>
        </form>
      </CommentContainers>
      {/* <Comment comments={sampleComment} /> */}
      <Comment comments={comments} />
    </>
  );
};

export default CommentComponent;
