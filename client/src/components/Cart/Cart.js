import { Link } from 'react-router-dom';

import CartBill from './CartBill';
import CartList from './CartList';

import styles from './Cart.module.css';
import { FaLongArrowAltLeft, FaLongArrowAltRight } from 'react-icons/fa';

// ==================================================

const Cart = () => {
  return (
    <div className={styles['cart-container']}>
      <h2>Shopping cart</h2>

      <div className={styles.cart}>
        <div className={styles['list-container']}>
          <CartList />

          <div className={styles['action-container']}>
            <Link to='/shop' className={styles.link}>
              <FaLongArrowAltLeft />
              Continue shopping
            </Link>

            <Link to='/cart/checkout' className={styles['checkout-btn']}>
              Proceed to checkout
              <FaLongArrowAltRight />
            </Link>
          </div>
        </div>

        <CartBill />
      </div>
    </div>
  );
};

export default Cart;
