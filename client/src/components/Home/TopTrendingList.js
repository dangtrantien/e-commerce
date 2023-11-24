import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useHttp from '../../hooks/use-http';
import { productActions } from '../../store/product/product-slice';
import { host } from '../../store/store';

import styles from './TopTrendingList.module.css';

// ==================================================

const TopTrendingList = (props) => {
  const dispatch = useDispatch();
  const sendRequest = useHttp();

  const products = useSelector((state) => state.product.items);

  const showDetailHandler = (prodDetail) => {
    props.onShowDetail(prodDetail);
  };

  useEffect(() => {
    sendRequest({
      url: `${host}/products/top-trending`,
    })
      .then((result) => {
        if (result.error) {
          return alert(result.message);
        }

        dispatch(productActions.replaceProductSate({ result: result }));
      })
      .catch((err) => console.log(err));
  }, [sendRequest, dispatch]);

  return (
    <section id='top-trending' className={styles['top-trending--container']}>
      <div>
        <p className='text-uppercase'>Made the hard way</p>
        <h2>Top trending products</h2>
      </div>

      <div className={styles['product-list--container']}>
        {products.map((product, index) => (
          <div key={index} className={styles['product-container']}>
            <img
              src={product.img1}
              alt={product.name}
              onClick={showDetailHandler.bind(null, product)}
            />

            <div>
              <p className={styles['product-name']}>{product.name}</p>

              <p className={styles['product-price']}>
                {product.price?.toLocaleString('de-DE')} VND
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopTrendingList;
