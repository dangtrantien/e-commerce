import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import useHttp from '../../hooks/use-http';
import { userActions } from '../../store/user/user-slice';
import { host } from '../../store/store';

import styles from './CheckoutForm.module.css';

// ==================================================

const CheckoutForm = () => {
  const dispatch = useDispatch();
  const sendRequest = useHttp();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  const inputChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    dispatch(userActions.replaceUserState({ name: name, value: value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const updateUser = {
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      address: user.address,
    };

    let totalPrice = 0;

    user.cart.items?.map((item) => (totalPrice += item.total));

    // Update user
    sendRequest({
      url: `${host}/user`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: updateUser,
    })
      .then((result) => {
        if (result.error) {
          return alert(result.message);
        }
      })
      .catch((err) => console.log(err));

    // Oder
    sendRequest({
      url: `${host}/user/order`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: { products: user.cart.items, totalPrice: totalPrice },
    })
      .then((result) => {
        if (result.error) {
          return alert(result.message);
        }

        alert('Successfully place order!');

        dispatch(userActions.clearCart());

        return navigate('/history', { replace: true });
      })
      .catch((err) => console.log(err));
  };

  return (
    <form className={styles['form-container']} onSubmit={submitHandler}>
      <div className={styles['control-container']}>
        <label htmlFor='fullName'>Full name:</label>
        <input
          type='text'
          id='fullName'
          name='fullName'
          value={user.fullName}
          onChange={inputChangeHandler.bind(this)}
          placeholder='Enter Your Full Name Here!'
          required
        />
      </div>

      <div className={styles['control-container']}>
        <label htmlFor='email'>Email:</label>
        <input
          type='email'
          id='email'
          name='email'
          value={user.email}
          onChange={inputChangeHandler.bind(this)}
          placeholder='Enter Your Email Here!'
          required
        />
      </div>

      <div className={styles['control-container']}>
        <label htmlFor='phone'>Phone number:</label>
        <input
          type='text'
          id='phone'
          name='phone'
          value={user.phone}
          onChange={inputChangeHandler.bind(this)}
          placeholder='Enter Your Phone Number Here!'
          required
        />
      </div>

      <div className={styles['control-container']}>
        <label htmlFor='address'>Address:</label>
        <input
          type='text'
          id='address'
          name='address'
          value={user.address}
          onChange={inputChangeHandler.bind(this)}
          placeholder='Enter Your Address Here!'
        />
      </div>

      <button type='submit' className='button'>
        Place order
      </button>
    </form>
  );
};

export default CheckoutForm;
