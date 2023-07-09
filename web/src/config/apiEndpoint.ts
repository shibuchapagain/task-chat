const ApiEndPoint: any = {
  login: '/auth/login',
  getMyProfile: '/auth/getMyProfile',
  verifyToken: '/auth/verifyToken',
  verifyAccount: '/auth/verifyAccount',

  getAllCategory: '/product/getAllCategory',
  getAllSubCategory: '/product/getSubCategoryByCategoryId',
  createProduct: '/product/createProduct',
  getProduct: '/product/getProduct',
  updateProductImage: '/product/updateProductImage',
  getAllProducts: '/product/searchProduct',
  getSimilarProduct: '/product/similarProduct',

  createBook: '/book/createBook',
  getMyBooks: '/book/getMyBooks',
  getBook: '/book/getBook',
  updateBook: '/book/updateBook',
  deleteBook: '/book/deleteBook',

  getAllComments: '/common/getAllComments',
  createComment: '/common/createComment',

  createMessage: '/common/createMessage',
  readAllNotification: '/common/readAllNotification',
  readNotification: '/common/readNotification',
};

export default ApiEndPoint;
