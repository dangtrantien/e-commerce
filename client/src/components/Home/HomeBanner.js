import { Link } from 'react-router-dom';

import styles from './HomeBanner.module.css';
import BannerBackground from '../../assets/images/banner1.jpg';

// ==================================================

const HomeBanner = () => {
  return (
    <section id='banner' className={styles['banner-container']}>
      <img src={BannerBackground} alt='banner' />

      <div className={styles['banner-content--container']}>
        <div className={styles['banner-content']}>
          <p>New inspiration 2020</p>

          <h1>20% off on new season</h1>

          <Link to='/shop' className='button'>
            Browse collections
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
