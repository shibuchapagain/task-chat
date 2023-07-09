// import React, { useState } from 'react';
// import styled from 'styled-components';

// const CategoryContainer = styled.div`
//   margin: 0 auto;
// `;

// const CategoryTitle = styled.p`
//   display: block;
//   cursor: pointer;
//   background-color: yellow;
//   padding: 8px;
//   margin: 5px 0;
// `;

// const SubCategoryContainer = styled.div`
//   margin: 5px 0;
//   padding-left: 16px;
// `;

// const SubCategoryItem = styled.p`
//   display: block;
//   cursor: pointer;
//   background-color: lightblue;
//   padding: 8px;
//   margin: 5px 0;
// `;

// const CategoryList = ({ categories }) => {
//   const [selectedCategory, setSelectedCategory] = useState(null);

//   const handleCategoryClick = categoryId => {
//     setSelectedCategory(categoryId);
//   };

//   return (
//     <CategoryContainer>
//       <h2>Category</h2>
//       {categories.map(category => (
//         <div key={category.id}>
//           <CategoryTitle onClick={() => handleCategoryClick(category.id)}>
//             {category.title}
//           </CategoryTitle>
//           {selectedCategory === category.id && (
//             <SubCategoryContainer>
//               {category.subcategories.map(subcategory => (
//                 <SubCategoryItem key={subcategory.id}>
//                   {subcategory.title}
//                 </SubCategoryItem>
//               ))}
//             </SubCategoryContainer>
//           )}
//         </div>
//       ))}
//     </CategoryContainer>
//   );
// };

// export default CategoryList;

// {
//   /* <BookWrapper>
//             {Books?.map((book: any) => {
//               const bookImageArray = book?.bookImages;
//               const imageURL = bookImageArray?.map((item: any) => {
//                 return `http://localhost:5000/images/book/${item?.url}`;
//               });
//               return (
//                 <>
//                   <BookCard
//                     images={imageURL}
//                     title={book?.title}
//                     price={book?.price}
//                     author={book?.author}
//                     language={book?.language}
//                     description={book?.description}
//                   />
//                 </>
//               );
//             })}
//           </BookWrapper> */
// }

// {
//   /* <BookWrapper>
//         {Books?.map((book: any) => {
//           const bookImageArray = book?.bookImages;
//           const imageURL = bookImageArray?.map((item: any) => {
//             return `http://localhost:5000/images/book/${item?.url}`;
//           });
//           return (
//             <>
//               <BookCard
//                 images={imageURL}
//                 title={book?.title}
//                 price={book?.price}
//                 author={book?.author}
//                 language={book?.language}
//                 description={book?.description}
//               />
//             </>
//           );
//         })}
//       </BookWrapper> */
// }

export {};
