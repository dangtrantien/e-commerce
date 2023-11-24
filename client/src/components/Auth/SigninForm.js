import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import useHttp from '../../hooks/use-http';
import { userActions } from '../../store/user/user-slice';
import { host } from '../../store/store';

import styles from './AuthLayout.module.css';

// ==================================================

const SigninForm = () => {
  const dispatch = useDispatch();
  const sendRequest = useHttp();
  const navigate = useNavigate();

  const email = useSelector((state) => state.user.email);
  const password = useSelector((state) => state.user.password);

  const inputChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    dispatch(userActions.replaceUserState({ name: name, value: value }));
  };

  const submitHandler = (event) => {
    event.preventDefault();

    sendRequest({
      url: `${host}/signin`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: { email: email, password: password },
    })
      .then((result) => {
        if (result.error) {
          return alert(result.message);
        }

        return navigate('/', { replace: true });
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <form onSubmit={submitHandler} className={styles['form-container']}>
        <input
          id='email'
          name='email'
          type='email'
          value={email}
          onChange={inputChangeHandler.bind(this)}
          placeholder='Email'
          required
        />

        <input
          id='password'
          name='password'
          type='password'
          value={password}
          onChange={inputChangeHandler.bind(this)}
          placeholder='Password'
          required
        />

        <button type='submit' className='button'>
          Sign In
        </button>
      </form>

      <div className={styles.action}>
        <p>Create an account?</p>

        <Link to='/signup'>Sign up</Link>
      </div>
    </>
  );
};

export default SigninForm;
