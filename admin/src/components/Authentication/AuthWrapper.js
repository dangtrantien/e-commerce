import Card from '../UI/Card';

import styles from './AuthWrapper.module.css';
import BackgroundImg from '../../assets/images/banner1.jpg';

// ==================================================

const AuthWrapper = ({ children }) => {
  return (
    <div className={styles.container}>
      <img src={BackgroundImg} alt='clock' />

      <Card className={styles['card-container']}>
        <div className={styles['card-content']}>
          <h1>Sign In</h1>

          {children}
        </div>
      </Card>
    </div>
  );
};

export default AuthWrapper;
