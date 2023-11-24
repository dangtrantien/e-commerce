import { useLocation } from 'react-router-dom';

import styles from './AuthLayout.module.css';
import BackgroundImg from '../../assets/images/banner1.jpg';

// ==================================================

const AuthLayout = ({ children }) => {
  const location = useLocation();
  const pathName = location.pathname.split('/')[1];

  return (
    <div className={styles.container}>
      <img src={BackgroundImg} alt='clock' />

      <div className={styles['card-container']}>
        <div className={styles.card}>
          <h1>{pathName === 'signin' ? 'Sign In' : 'Sign Up'}</h1>

          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
