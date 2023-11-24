import { useNavigate } from 'react-router-dom';

import styles from './CategoryList.module.css';
import ImgProduct1 from '../../assets/images/product_1.png';
import ImgProduct2 from '../../assets/images/product_2.png';
import ImgProduct3 from '../../assets/images/product_3.png';
import ImgProduct4 from '../../assets/images/product_4.png';
import ImgProduct5 from '../../assets/images/product_5.png';

// ==================================================

const CategoryList = () => {
  const navigate = useNavigate();

  return (
    <section id='category' className={styles['category-container']}>
      <div>
        <p>Carefullly created collections</p>

        <h2>Browse our categories</h2>
      </div>

      <div className={styles['category-images']}>
        <div className={styles['img-container']}>
          <button
            type='button'
            onClick={() => navigate('/shop', { state: { category: 'iphone' } })}
          >
            <img src={ImgProduct1} alt='product 1' />
          </button>

          <button
            type='button'
            onClick={() =>
              navigate('/shop', { state: { category: 'macbook' } })
            }
          >
            <img src={ImgProduct2} alt='product 2' />
          </button>
        </div>

        <div className={styles['img-container']}>
          <button
            type='button'
            onClick={() => navigate('/shop', { state: { category: 'ipad' } })}
          >
            <img src={ImgProduct3} alt='product 3' />
          </button>

          <button
            type='button'
            onClick={() => navigate('/shop', { state: { category: 'watch' } })}
          >
            <img src={ImgProduct4} alt='product 4' />
          </button>

          <button
            type='button'
            onClick={() => navigate('/shop', { state: { category: 'airpod' } })}
          >
            <img src={ImgProduct5} alt='product 5' />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CategoryList;
