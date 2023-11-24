import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import useHttp from '../../hooks/use-http';
import { productActions } from '../../store/product/product-slice';
import { host } from '../../store/store';

import styles from './RelateList.module.css';

// ==================================================

const RelateList = (props) => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const sendRequest = useHttp();

  const totalRelatedProduct = useSelector((state) => state.product.total);
  const products = useSelector((state) => state.product.items);

  useEffect(() => {
    sendRequest({
      url: `${host}/products/category?category=${props.category}`,
    })
      .then((result) => {
        if (result.error) {
          return alert(result.message);
        }

        const relatedProduct = result.data.filter(
          (prod) => prod._id !== productId
        );

        dispatch(
          productActions.replaceProductSate({
            total: result.total - 1,
            result: relatedProduct,
          })
        );
      })
      .catch((err) => console.log(err));
  }, [props.category, sendRequest, dispatch, productId]);

  return (
    <div className={styles['list-container']}>
      {totalRelatedProduct === 0 && (
        <h3 className={styles.error}>There's no related to this product!</h3>
      )}

      {totalRelatedProduct > 0 &&
        products.map((product, index) => (
          <div key={index} className={styles['product-container']}>
            <Link to={`/product/${product._id}`}>
              <img src={product.img1} alt={product.name} />
            </Link>

            <p className={styles['product-name']}>{product.name}</p>

            <p className={styles['product-price']}>
              {product.price?.toLocaleString('de-DE')} VND
            </p>
          </div>
        ))}
    </div>
  );
};

export default RelateList;
