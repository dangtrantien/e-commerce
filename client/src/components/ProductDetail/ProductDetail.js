import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import useHttp from '../../hooks/use-http';
import ProductDetailForm from './ProductDetailForm';
import RelateList from './RelateList';
import { host } from '../../store/store';

import styles from './ProductDetail.module.css';

// ==================================================

const ProductDetail = () => {
  const { productId } = useParams();
  const sendRequest = useHttp();

  const [product, setProduct] = useState({});
  const [selectedImg, setSelectedImg] = useState('');

  const selectImageHandler = (src) => {
    setSelectedImg(src);
  };

  useEffect(() => {
    // Lấy thông tin chi tiết của product theo id
    sendRequest({
      url: `${host}/product/${productId}`,
    }).then((result) => {
      if (result.error) {
        return alert(result.message);
      }

      setProduct(result);
    });
  }, [productId, sendRequest]);

  return (
    <div className={styles['product-container']}>
      <div className={styles['product-detail--container']}>
        <div className={styles['product-detail--img-group']}>
          <img
            src={product.img1}
            alt={product.name}
            onClick={selectImageHandler.bind(null, product.img1)}
          />
          <img
            src={product.img2}
            alt={product.name}
            onClick={selectImageHandler.bind(null, product.img2)}
          />
          <img
            src={product.img3}
            alt={product.name}
            onClick={selectImageHandler.bind(null, product.img3)}
          />
          <img
            src={product.img4}
            alt={product.name}
            onClick={selectImageHandler.bind(null, product.img4)}
          />
        </div>

        <div>
          <img
            src={selectedImg ? selectedImg : product.img1}
            alt={product.name}
          />
        </div>

        <div className={styles['product-detail--content-container']}>
          <h1>{product.name}</h1>

          <p>{product.price?.toLocaleString('de-DE')} VND</p>

          <span>{product.short_desc}</span>

          <p className={styles['product-detail--category']}>
            Category: <span>{product.category}</span>
          </p>

          <ProductDetailForm product={product} />
        </div>
      </div>

      <div className={styles['product-description--container']}>
        <p className={styles.title}>Description</p>

        <h3>Product Description</h3>

        <p>{product.long_desc}</p>
      </div>

      <div className={styles['product-related--container']}>
        <h3>Related products</h3>

        <RelateList category={product.category} />
      </div>
    </div>
  );
};

export default ProductDetail;
