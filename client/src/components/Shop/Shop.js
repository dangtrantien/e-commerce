import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import Category from './Category';
import ProductList from './ProductList';

import styles from './Shop.module.css';

// ==================================================

const Shop = () => {
  const location = useLocation();

  const [category, setCategory] = useState(location.state?.category || 'all');

  // Hiển thị danh sách các product theo category
  const selectCategoryHandler = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  return (
    <div className={styles['shop-container']}>
      <Category category={category} onSelectCategory={selectCategoryHandler} />

      <div className={styles['product-list']}>
        <div className={styles['action-container']}>
          <input type='text' placeholder='Enter Search Here!' />

          <select>
            <option value='default'>Default sorting</option>
            <option value='lowToHigh'>Price: Low to High</option>
            <option value='highToLow'>Price: High to Low</option>
          </select>
        </div>

        <ProductList category={category} />
      </div>
    </div>
  );
};

export default Shop;
