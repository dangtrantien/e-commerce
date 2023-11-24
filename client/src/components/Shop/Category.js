import styles from './Category.module.css';

// ==================================================

const Category = (props) => {
  // Lấy giá trị category và truyền cho component cha
  const categoryHandler = (event) => {
    props.onSelectCategory(event.target.value);
  };

  return (
    <section id='category' className={styles['category-container']}>
      <h2>Categories</h2>

      <ul>
        <li className={styles['list-title']}>Apple</li>
        <li>
          <button
            type='button'
            className={
              props.category === 'all'
                ? `${styles['list-category']} ${styles.active}`
                : styles['list-category']
            }
            value='all'
            onClick={categoryHandler.bind(this)}
          >
            All
          </button>
        </li>

        <li className={styles['list-title']}>Iphone & Mac</li>
        <li>
          <button
            type='button'
            className={
              props.category === 'iphone'
                ? `${styles['list-category']} ${styles.active}`
                : styles['list-category']
            }
            value='iphone'
            onClick={categoryHandler.bind(this)}
          >
            Iphone
          </button>
        </li>
        <li>
          <button
            type='button'
            className={
              props.category === 'ipad'
                ? `${styles['list-category']} ${styles.active}`
                : styles['list-category']
            }
            value='ipad'
            onClick={categoryHandler.bind(this)}
          >
            Ipad
          </button>
        </li>
        <li>
          <button
            type='button'
            className={
              props.category === 'macbook'
                ? `${styles['list-category']} ${styles.active}`
                : styles['list-category']
            }
            value='macbook'
            onClick={categoryHandler.bind(this)}
          >
            Macbook
          </button>
        </li>

        <li className={styles['list-title']}>Wireless</li>
        <li>
          <button
            type='button'
            className={
              props.category === 'airpod'
                ? `${styles['list-category']} ${styles.active}`
                : styles['list-category']
            }
            value='airpod'
            onClick={categoryHandler.bind(this)}
          >
            Airpod
          </button>
        </li>
        <li>
          <button
            type='button'
            className={
              props.category === 'watch'
                ? `${styles['list-category']} ${styles.active}`
                : styles['list-category']
            }
            value='watch'
            onClick={categoryHandler.bind(this)}
          >
            Watch
          </button>
        </li>

        <li className={styles['list-title']}>Other</li>
        <li>
          <button
            type='button'
            className={
              props.category === 'mouse'
                ? `${styles['list-category']} ${styles.active}`
                : styles['list-category']
            }
            value='mouse'
            onClick={categoryHandler.bind(this)}
          >
            Mouse
          </button>
        </li>
        <li>
          <button
            type='button'
            className={
              props.category === 'keyboard'
                ? `${styles['list-category']} ${styles.active}`
                : styles['list-category']
            }
            value='keyboard'
            onClick={categoryHandler.bind(this)}
          >
            Keyboard
          </button>
        </li>
        <li>
          <button
            type='button'
            className={
              props.category === 'other'
                ? `${styles['list-category']} ${styles.active}`
                : styles['list-category']
            }
            value='other'
            onClick={categoryHandler.bind(this)}
          >
            Other
          </button>
        </li>
      </ul>
    </section>
  );
};

export default Category;
