import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import useHttp from '../../../hooks/use-http';
import Card from '../../UI/Card';
import OrderDetailList from './OrderDetailList';
import { host } from '../../../store/store';

import styles from './OrderDetail.module.css';

// ==================================================

const OrderDetail = () => {
  const { orderId } = useParams();
  const sendRequest = useHttp();

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
  }, [orderId, sendRequest]);

  return (
    <Card>
      <div className={styles['user-infor--container']}>
        <h1>Information Order</h1>

        <p>ID User: {order.user?._id}</p>

        <p>Full Name: {order.user?.fullName}</p>

        <p>Phone: {order.user?.phone}</p>

        <p>Address: {order.user?.address}</p>

        <p>Total: {order.totalPrice?.toLocaleString('de-DE')} VND</p>
      </div>

      <OrderDetailList products={order.products} />
    </Card>
  );
};

export default OrderDetail;
