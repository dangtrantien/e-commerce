import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import useHttp from '../../hooks/use-http';
import { host } from '../../store/store';

import styles from './OrderList.module.css';
import { FaLongArrowAltRight } from 'react-icons/fa';

// ==================================================

const OrderList = () => {
  const sendRequest = useHttp();

  const user = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    sendRequest({
      url: `${host}/user/orders`,
    })
      .then((result) => {
        if (result.error) {
          return alert(result.message);
        }

        setOrders(result);
      })
      .catch((err) => console.log(err));
  }, [sendRequest]);

  return (
    <div className={styles['table-container']}>
      <table>
        <thead>
          <tr>
            <th>Id Order</th>
            <th>Id User</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Total</th>
            <th>Delivery</th>
            <th>Status</th>
            <th>Detail</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{user._id}</td>
              <td>{user.fullName}</td>
              <td>{user.phone}</td>
              <td>{user.address}</td>
              <td>{order.totalPrice?.toLocaleString('de-DE')} VND</td>
              <td>{order.delivery}</td>
              <td>{order.status}</td>
              <td>
                <Link
                  to={`/order/${order._id}`}
                  className={styles['view-detail--btn']}
                >
                  View
                  <FaLongArrowAltRight />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
