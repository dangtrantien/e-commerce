import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import useHttp from '../../hooks/use-http';
import { userActions } from '../../store/user/user-slice';
import { host } from '../../store/store';

import styles from './AuthLayout.module.css';

// ==================================================

const SignupForm = () => {
  const dispatch = useDispatch();
  const sendRequest = useHttp();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  const inputChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    dispatch(userActions.replaceUserState({ name: name, value: value }));
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const userData = {
      fullName: user.fullName,
      email: user.email,
      password: user.password,
      phone: user.phone,
    };

    sendRequest({
      url: `${host}/signup`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: userData,
    })
      .then((result) => {
        if (result.error) {
          return alert(result.message);
        }

        alert('Successfully sign up!');

        return navigate('/signin', { replace: true });
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <form onSubmit={submitHandler} className={styles['form-container']}>
        <input
          id='fullName'
          name='fullName'
          type='text'
          value={user.fullName}
          onChange={inputChangeHandler.bind(this)}
          placeholder='Full Name'
          required
        />

        <input
          id='email'
          name='email'
          type='email'
          value={user.email}
          onChange={inputChangeHandler.bind(this)}
          placeholder='Email'
          required
        />

        <input
          id='password'
          name='password'
          type='password'
          value={user.password}
          onChange={inputChangeHandler.bind(this)}
          placeholder='Password'
          required
        />

        <input
          id='phone'
          name='phone'
          type='text'
          value={user.phone}
          onChange={inputChangeHandler.bind(this)}
          placeholder='Phone'
          required
        />

        <button type='submit' className='button'>
          Sign Up
        </button>
      </form>

      <div className={styles.action}>
        <p>Login?</p>

        <Link to='/signin'>Click</Link>
      </div>
    </>
  );
};

export default SignupForm;
