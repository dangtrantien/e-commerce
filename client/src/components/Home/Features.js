import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../../store/user/user-slice';

import styles from './Features.module.css';

// ==================================================

const Features = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const email = useSelector((state) => state.user.email);

  const inputChangeHandler = (e) => {
    dispatch(
      userActions.replaceUserState({ name: 'email', value: e.target.value })
    );
  };

  const submitHandler = (e) => {
    e.preventDefault();

    return navigate('/signup', { replace: true });
  };

  return (
    <section id='features' className={styles.container}>
      <div className={styles['info-container']}>
        <div>
          <h2>Free shipping</h2>
          <p>Free shipping worlwide</p>
        </div>

        <div>
          <h2>24 x 7 service</h2>
          <p>Free shipping worlwide</p>
        </div>

        <div>
          <h2>Festival offer</h2>
          <p>Free shipping worlwide</p>
        </div>
      </div>

      <div className={styles['contact-container']}>
        <div>
          <h2>Let's be friends!</h2>
          <p>Nisi nisi tempor consequat laboris nisi</p>
        </div>

        <form className={styles['form-container']} onSubmit={submitHandler}>
          <input
            type='text'
            value={email}
            onChange={inputChangeHandler.bind(this)}
            placeholder='Enter your email address'
          />
          <button className='button' type='submit'>
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default Features;
