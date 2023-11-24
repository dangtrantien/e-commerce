import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import useHttp from '../../hooks/use-http';
import { productActions } from '../../store/product/product-slice';
import { host } from '../../store/store';

import styles from './ProductList.module.css';

// ==================================================

const ProductList = (props) => {
  const dispatch = useDispatch();
  const sendRequest = useHttp();

  const totalProduct = useSelector((state) => state.product.total);
  const products = useSelector((state) => state.product.items);
  const [page, setPage] = useState(1);

  // Tổng số page
  let totalPage = 1;

  if (totalProduct > 8) {
    while (totalPage <= Math.round(totalProduct / 8)) {
      totalPage++;
    }
  }

  const changePageHandler = (direction) => {
    if (direction === 'next') {
      setPage((prev) => (prev === totalPage ? 1 : prev + 1));
    } else {
      setPage((prev) => (prev === 1 ? totalPage : prev - 1));
    }
  };

  useEffect(() => {
    sendRequest({
      url:
        props.category === 'all'
          ? host
          : `${host}/products/category?category=${props.category}&page=${page}&limit=8`,
    })
      .then((result) => {
        if (result.error) {
          return alert(result.message);
        }

        dispatch(
          productActions.replaceProductSate({
            total: result.total,
            result: result.data,
          })
        );
      })
      .catch((err) => console.log(err));
  }, [props.category, page, sendRequest, dispatch]);

  return (
    <>
      <div className={styles['list-container']}>
        {totalProduct === 0 && (
          <h3 className={styles.error}>Can not find any available product!</h3>
        )}

        {totalProduct > 0 &&
          products.map((product) => (
            <div key={product._id} className={styles['product-container']}>
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

      <div className={styles['pagination-container']}>
        <div>
          <button type='button' onClick={changePageHandler.bind(null, 'prev')}>
            &laquo;
          </button>

          <button type='button' className={styles.active}>
            {page}
          </button>

          <button type='button' onClick={changePageHandler.bind(null, 'next')}>
            &raquo;
          </button>
        </div>

        <p>
          {totalProduct > 0
            ? `Showing 1${
                products.length > 1 ? `-${products.length}` : ''
              } of ${totalProduct} results`
            : 'Showing 0 result'}
        </p>
      </div>
    </>
  );
};

export default ProductList;
