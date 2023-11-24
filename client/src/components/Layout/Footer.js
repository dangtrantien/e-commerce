import styles from './Footer.module.css';

// ==================================================

const Footer = () => {
  return (
    <footer className={styles['footer-container']}>
      <div className={`container-md ${styles['footer-link--container']}`}>
        <div className={styles['footer-link']}>
          <h2>Customer Services</h2>

          <ul>
            <li>
              <a href='#top'>Help & Contact Us</a>
            </li>
            <li>
              <a href='#top'>Returns & Refunds</a>
            </li>
            <li>
              <a href='#top'>Online Stores</a>
            </li>
            <li>
              <a href='#top'>Terms & Conditions</a>
            </li>
          </ul>
        </div>

        <div className={styles['footer-link']}>
          <h2>Company</h2>

          <ul>
            <li>
              <a href='#top'>What We Do</a>
            </li>
            <li>
              <a href='#top'>Available Services</a>
            </li>
            <li>
              <a href='#top'>Latest Posts</a>
            </li>
            <li>
              <a href='#top'>FAQs</a>
            </li>
          </ul>
        </div>

        <div className={styles['footer-link']}>
          <h2>Social Media</h2>

          <ul>
            <li>
              <a href='#top'>Twitter</a>
            </li>
            <li>
              <a href='#top'>Instagram</a>
            </li>
            <li>
              <a href='#top'>Facebook</a>
            </li>
            <li>
              <a href='#top'>Pinterest</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
