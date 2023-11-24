import { useDispatch, useSelector } from 'react-redux';

import useHttp from '../../hooks/use-http';
import { userActions } from '../../store/user/user-slice';
import { host } from '../../store/store';

import styles from './CartList.module.css';
import { MdArrowLeft, MdArrowRight } from 'react-icons/md';
import { HiOutlineTrash } from 'react-icons/hi';

// ==================================================

const CartList = () => {
  const dispatch = useDispatch();
  const sendRequest = useHttp();
  const userCart = useSelector((state) => state.user.cart);

  // Tăng số lượng product
  const increaseHandler = (product, prodQuantity) => {
    if (product.count < prodQuantity + 1) {
      return alert(`There's only ${product.count} left, please select again!`);
    }

    const updatedCartItems = [...userCart.items].map((item) => {
      if (item.product._id === product._id) {
        return {
          ...item,
          quantity: prodQuantity + 1,
          total: item.total + product.price,
        };
      }

      return null;
    });

    dispatch(
      userActions.replaceUserState({
        name: 'cart',
        value: {
          ...userCart,
          totalItem: userCart.totalItem + 1,
          items: updatedCartItems,
        },
      })
    );

    sendRequest({
      url: `${host}/cart`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: { product: product, quantity: prodQuantity + 1 },
    })
      .then((result) => {
        if (result.error) {
          return alert(result.message);
        }
      })
      .catch((err) => console.log(err));
  };

  // Giảm số lượng product
  const decreaseHandler = (product, prodQuantity) => {
    const updatedCartItems = [...userCart.items].map((item) => {
      if (item.product._id === product._id) {
        return {
          ...item,
          quantity: prodQuantity - 1,
          total: item.total - product.price,
        };
      }

      return null;
    });

    dispatch(
      userActions.replaceUserState({
        name: 'cart',
        value: {
          ...userCart,
          totalItem: userCart.totalItem - 1,
          items: updatedCartItems,
        },
      })
    );

    sendRequest({
      url: `${host}/cart`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: { product: product, quantity: prodQuantity - 1 },
    })
      .then((result) => {
        if (result.error) {
          return alert(result.message);
        }
      })
      .catch((err) => console.log(err));
  };

  // Xóa product khỏi cart
  const removeItemHandler = (prodId) => {
    if (window.confirm('Are you sure?') === true) {
      sendRequest({
        url: `${host}/delete-cart-item`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: { productId: prodId },
      })
        .then((result) => {
          if (result.error) {
            return alert(result.message);
          }

          dispatch(
            userActions.replaceUserState({
              name: 'cart',
              value: result.result.cart,
            })
          );
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className={styles['table-container']}>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {userCart.items?.map((item) => (
            <tr key={item._id}>
              <td className={styles.image}>
                <img src={item.product.img1} alt={item.product.name} />
              </td>
              <td className={styles.name}>{item.product.name}</td>
              <td>{item.product.price?.toLocaleString('de-DE')} VND</td>
              <td>
                <div className={styles.quantity}>
                  {item.quantity > 1 && (
                    <MdArrowLeft
                      className={styles['arrow-icon']}
                      onClick={decreaseHandler.bind(
                        null,
                        item.product,
                        item.quantity
                      )}
                    />
                  )}
                  {item.quantity}
                  <MdArrowRight
                    className={styles['arrow-icon']}
                    onClick={increaseHandler.bind(
                      null,
                      item.product,
                      item.quantity
                    )}
                  />
                </div>
              </td>
              <td>{item.total?.toLocaleString('de-DE')} VND</td>
              <td>
                <HiOutlineTrash
                  className={styles['trash-icon']}
                  onClick={removeItemHandler.bind(null, item.product._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CartList;
