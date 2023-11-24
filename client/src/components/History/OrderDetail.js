import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import useHttp from '../../hooks/use-http';
import OrderDetailList from './OrderDetailList';
import { host } from '../../store/store';

import styles from './OrderDetail.module.css';

// ==================================================

const OrderDetail = () => {
  const { orderId } = useParams();
  const sendRequest = useHttp();

  const user = useSelector((state) => state.user);
  const [order, setOrder] = useState({});

  useEffect(() => {
    sendRequest({
      url: `${host}/order/${orderId}`,
    })
      .then((result) => {
        if (result.error) {
          return alert(result.message);
        }

        setOrder(result);
      })
      .catch((err) => console.log(err));
  }, [sendRequest, orderId]);

  return (
    <div className={styles['order-detail--container']}>
      <div className={styles['user-infor--container']}>
        <h1>Information Order</h1>

        <p>ID User: {user._id}</p>

        <p>Full Name: {user.fullName}</p>

        <p>Phone: {user.phone}</p>

        <p>Address: {user.address}</p>

        <p>Total: {order.totalPrice?.toLocaleString('de-DE')} VND</p>
      </div>

      <OrderDetailList products={order.products} />
    </div>
  );
};

export default OrderDetail;
