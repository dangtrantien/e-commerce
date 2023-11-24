import { useLocation } from 'react-router-dom';
import { Breadcrumb } from 'react-bootstrap';

import styles from './Banner.module.css';

// ==================================================

const Banner = () => {
  const path = useLocation();
  const pathName = path.pathname.split('/');

  return (
    <div className={styles['banner-container']}>
      {pathName[2] !== 'checkout' && (
        <>
          <h1>{pathName[1]}</h1>

          <p>{pathName[1]}</p>
        </>
      )}

      {pathName[2] === 'checkout' && (
        <>
          <h1>Checkout</h1>

          <Breadcrumb>
            <Breadcrumb.Item href='/' className='fw-semibold'>
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item href='/cart' className='fw-semibold'>
              Cart
            </Breadcrumb.Item>
            <Breadcrumb.Item className='fw-medium' active>
              Checkout
            </Breadcrumb.Item>
          </Breadcrumb>
        </>
      )}
    </div>
  );
};

export default Banner;
