import { useSelector } from 'react-redux';

import styles from './CartBill.module.css';
import { GiPresent } from 'react-icons/gi';
import { useEffect, useState } from 'react';

// ==================================================

const CartBill = () => {
  const userCartItems = useSelector((state) => state.user.cart.items);
  const [totalPrice, setTotalPrice] = useState(0);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    let total = 0;

    userCartItems.map((item) => (total += item.total));

    setTotalPrice(total);
  }, [userCartItems]);

  return (
    <div className={styles['cart-bill--container']}>
      <h2>Cart total</h2>

      <div>
        <div className={styles.subtotal}>
          <p>Subtotal</p>

          <span>{totalPrice.toLocaleString('de-DE')} VND</span>
        </div>

        <div className={styles.total}>
          <p>Total</p>

          <span>{totalPrice.toLocaleString('de-DE')} VND</span>
        </div>
      </div>

      <form className={styles.form} onSubmit={submitHandler}>
        <input type='text' placeholder='Enter your coupon' />
        <button type='submit' className='button'>
          <GiPresent className={styles.icon} /> Apply coupon
        </button>
      </form>
    </div>
  );
};

export default CartBill;
