import CheckoutForm from './CheckoutForm';
import CheckoutBill from './CheckoutBill';

import styles from './Checkout.module.css';

// ==================================================

const Checkout = () => {
  return (
    <div className={styles['checkout-container']}>
      <h2>Billing details</h2>

      <div className={styles['checkout-form--container']}>
        <CheckoutForm />

        <CheckoutBill />
      </div>
    </div>
  );
};

export default Checkout;
