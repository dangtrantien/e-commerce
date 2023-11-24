import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import useHttp from '../../hooks/use-http';
import { userActions } from '../../store/user/user-slice';
import { host } from '../../store/store';

import styles from './ProductDetailForm.module.css';
import { MdArrowLeft, MdArrowRight } from 'react-icons/md';

// ==================================================

const ProductDetailForm = (props) => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const sendRequest = useHttp();
  const navigate = useNavigate();

  const userCartItems = useSelector((state) => state.user.cart.items);
  const [productQuantity, setProductQuantity] = useState(0);

  // Tăng số lượng product
  const increaseHandler = () => {
    setProductQuantity((prevQuantity) => prevQuantity + 1);
  };

  // Giảm số lượng product
  const decreaseHandler = () => {
    setProductQuantity((prevQuantity) => prevQuantity - 1);
  };

  // Thêm product vào cart
  const submitHandler = (e) => {
    e.preventDefault();

    if (props.product?.count === 0) {
      return alert('This product already sold out, please choose another one!');
    }

    if (props.product.count < productQuantity) {
      return alert(
        `There's only ${props.product.count} left, please select again!`
      );
    }

    sendRequest({
      url: `${host}/cart`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: { product: props.product, quantity: productQuantity },
    }).then((result) => {
      if (result.error) {
        return alert(result.message);
      }

      dispatch(
        userActions.replaceUserState({
          name: 'cart',
          value: result.result.cart,
        })
      );

      return navigate('/cart', { replace: true });
    });
  };

  useEffect(() => {
    userCartItems.map((item) => {
      if (item.product._id === productId) {
        setProductQuantity(item.quantity);
      }

      return null;
    });
  }, [userCartItems, productId]);

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div className={styles.input}>
        <input
          type='number'
          name='quantity'
          value={productQuantity}
          min={0}
          disabled
        />
        {productQuantity > 0 && (
          <MdArrowLeft className={styles.icon} onClick={decreaseHandler} />
        )}
        {productQuantity}
        <MdArrowRight className={styles.icon} onClick={increaseHandler} />
      </div>

      <button type='submit' className='button'>
        Add to cart
      </button>
    </form>
  );
};

export default ProductDetailForm;
