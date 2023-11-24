import { useNavigate } from 'react-router-dom';

import Modal from '../UI/Overlay/Modal';

import styles from './ProductDetail.module.css';
import { FaShoppingCart } from 'react-icons/fa';

// ==================================================

const ProductDetail = (props) => {
  const navigate = useNavigate();

  const navigationHandler = () => {
    navigate(`/product/${props.product?._id}`, { replace: true });

    props.onClose();
  };

  return (
    <Modal open={props.open} onClose={props.onClose}>
      <div className={styles.modal}>
        <button className={styles['close-btn']} onClick={props.onClose}>
          x
        </button>

        <div className={styles['modal-content']}>
          <div className={styles.img}>
            <img src={props.product?.img1} alt={props.product?.name} />
          </div>

          <div className={styles['product-detail']}>
            <h2>{props.product?.name}</h2>

            <p>{props.product?.price?.toLocaleString('de-DE')} VND</p>

            <span>{props.product?.short_desc}</span>

            <button
              className={`button ${styles.button}`}
              onClick={navigationHandler}
            >
              <FaShoppingCart color='white' />
              View Detail
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProductDetail;
