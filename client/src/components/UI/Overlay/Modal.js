import ReactDOM from 'react-dom';
import CSSTransition from 'react-transition-group/CSSTransition';

import styles from './Modal.module.css';

// ==================================================

const Modal = (props) => {
  return (
    <>
      {/* Tạo portal render modal thông qua id=overlays */}
      {ReactDOM.createPortal(
        // Tạo animation vs CSSTransition

        <>
          <div
            className={props.open ? styles.backdrop : styles.close}
            onClick={props.onClose}
          />

          <CSSTransition
            in={props.open}
            timeout={300}
            mountOnEnter
            unmountOnExit
            classNames={{
              enterActive: styles.open,
              exitActive: styles.close,
            }}
          >
            <div className={`${props.className} ${styles['modal-container']}`}>
              {props.children}
            </div>
          </CSSTransition>
        </>,
        document.getElementById('overlays')
      )}
    </>
  );
};

export default Modal;
