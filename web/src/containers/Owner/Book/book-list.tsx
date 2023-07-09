import React, { useCallback, useEffect, useState } from 'react';
import { Button, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import styled from 'styled-components';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteBook, getMyBooks } from './BookService';
// import { Navigate, useNavigate } from 'react-router-dom';
import { Spin } from 'antd';

interface DataType {
  key: string;
  name: string;
  price: number;
  author: string;
  tags: string[];
}

const Container = styled.div`
  width: 90%;
  height: 90vh;
`;

const BookList = () => {
  const navigate = useNavigate();
  const [bookData, setBookData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getBookData = useCallback(async () => {
    try {
      // setLoading(true);
      let response = await getMyBooks();
      setBookData(response?.data);
    } catch (err: any) {
      toast.error(err);
    }
    // setLoading(false);
    // setTimeout(() => {
    //   setLoading(false);
    // }, 3000);
  }, []);

  const deleteBookById = async (id: string) => {
    try {
      const response: any = await deleteBook(id);
      if (response?.success === true) {
        toast.success('Delete Successfully');
        getBookData();
        navigate('/owner/book');
      }
    } catch (err: any) {
      toast.error(err);
    }
  };

  const EditBookById = async (id: string) => {
    try {
      const response: any = await deleteBook(id);
      if (response?.success === true) {
        toast.success('Delete Successfully');
        getBookData();
        navigate('/owner/book');
      }
    } catch (err: any) {
      toast.error(err);
    }
  };

  useEffect(() => {
    setLoading(true);
    getBookData();
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [getBookData]);

  const test: any =
    bookData &&
    bookData?.map((book: any) => {
      return {
        key: book?._id,
        title: book?.title,
        price: book?.price,
        author: book?.author,
        status: book?.status,
        edition: book?.edition,
        category: book?.category,
        publisher: book?.publisher,
        language: book?.language,
      };
    });

  const Text = styled.p<{ status: string }>`
    color: ${({ status }) => (status === 'Active' ? 'green' : 'red')};
    font-weight: 700;
  `;

  const DeleteBtn = styled.button`
    color: red;
    font-weight: 700;
  `;

  const EditBtn = styled.button`
    color: green;
    font-weight: 700;
  `;

  const columns: ColumnsType<DataType> = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: text => <Text status={text}>{text}</Text>,
    },
    {
      title: 'Edition',
      key: 'edition',
      dataIndex: 'edition',
    },
    {
      title: 'Category',
      key: 'category',
      dataIndex: 'category',
    },
    {
      title: 'Publisher',
      key: 'publisher',
      dataIndex: 'publisher',
    },
    {
      title: 'Language',
      key: 'language',
      dataIndex: 'language',
    },
    {
      title: 'Action',
      key: 'action',
      // render: (_, record, id) => (
      //   <Space size="middle">
      //     <a>id</a>
      //     {/* <a>Delete</a> */}
      //     <ActionBtn onClick={deleteBook(id)}>Delete</ActionBtn>
      //   </Space>
      // ),
      render: (_, record) => (
        <Space size="middle">
          {/* <a>{record.key}</a> */}

          {/* <ActionBtn onClick={() => deleteBook(record.key)}>Delete</ActionBtn> */}
          {/* <EditBtn onClick={() => EditBookById(record.key)}>Edit</EditBtn> */}
          <EditBtn onClick={() => navigate('/owner/book/' + record?.key)}>
            Edit
          </EditBtn>
          <DeleteBtn onClick={() => deleteBookById(record.key)}>
            Delete
          </DeleteBtn>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Container>
        <Link to="/owner/book/create">
          <Button
            style={{
              display: 'block',
              float: 'right',
              margin: '20px',
              backgroundColor: 'green',
              color: 'white',
            }}
          >
            Add More
          </Button>
        </Link>
        <Table columns={columns} dataSource={test} />
      </Container>
    </>
  );
};

export default BookList;
