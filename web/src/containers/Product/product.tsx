import { useCallback, useEffect, useState } from 'react';
import Heading from '../App/Layouts/main/header';
import ProductView from './../../components/Product-view';
import { getProduct, getSimilarProduct } from '../Owner/category-service';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
// import { CommentSection } from './comment';

const DisplayProduct = () => {
  const [loading, setLoading] = useState(false);
  const [ProductData, setProductData] = useState([]);
  const [SimilarProductData, setSimilarProductData] = useState([]);
  const params = useParams();
  const productId: any = params?.id;

  const getProductDetails = useCallback(async productId => {
    try {
      setLoading(true);
      const product: any = await getProduct(productId);
      const productData = product?.data;
      setProductData(productData);
    } catch (err: any) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getProductDetails(productId);
  }, [productId]);

  const getSimilarProducts = async productId => {
    try {
      setLoading(true);
      const similarProduct: any = await getSimilarProduct(productId);
      const similarProductData = similarProduct?.data;
      setSimilarProductData(similarProductData);
    } catch (err: any) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSimilarProducts(productId);
  }, [productId]);
  return (
    <>
      <Heading />
      <ProductView
        // {...ProductData}
        productData={ProductData}
        similarProductData={SimilarProductData}
      />
    </>
  );
};

export default DisplayProduct;
