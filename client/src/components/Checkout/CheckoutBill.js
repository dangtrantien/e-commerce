import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import styles from './CheckoutBill.module.css';

// ==================================================

const CheckoutBill = () => {
  const userCartItems = useSelector((state) => state.user.cart.items);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let total = 0;

    userCartItems.map((item) => (total += item.total));

    setTotalPrice(total);
  }, [userCartItems]);

  return (
    <div className={styles['bill-container']}>
      <h2>Your order</h2>

      <ul>
        {userCartItems.map((item) => (
          <li key={item._id} className={styles.product}>
            <p>{item.product.name}</p>
            <span>
              {item.product.price?.toLocaleString('de-DE')} VND x{' '}
              {item.quantity}
            </span>
          </li>
        ))}
      </ul>

      <div className={styles.total}>
        <p>Total</p>

        <span>{totalPrice.toLocaleString('de-DE')} VND</span>
      </div>
    </div>
  );
};

export default CheckoutBill;
