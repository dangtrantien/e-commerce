import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Card from '../UI/Card';
import useHttp from '../../hooks/use-http';
import { host } from '../../store/store';

import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

// ==================================================

const RecentOrders = (props) => {
  const sendRequest = useHttp();

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    sendRequest({
      url: `${host}/admin/recent-orders`,
    })
      .then((result) => {
        if (result.error) {
          return alert(result.message);
        }

        return setOrders(result);
      })
      .catch((err) => console.log(err));
  }, [sendRequest]);

  return (
    <Card>
      <h3>History</h3>

      <div className='table-container'>
        <table>
          <thead>
            <tr>
              <th>ID User</th>
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
                <td>{order.user?._id}</td>
                <td>{order.user?.fullName}</td>
                <td>{order.user?.phone}</td>
                <td>{order.user?.address}</td>
                <td>{order.totalPrice?.toLocaleString('de-DE')}</td>
                <td>{order.delivery}</td>
                <td>{order.status}</td>
                <td>
                  <Link
                    to={`/order/${order._id}`}
                    className='button green-button'
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}

            <tr>
              <td colSpan={8} />
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={6} />
              <td colSpan={2}>
                <div className='pagination'>
                  <p>
                    1{orders.length > 1 ? `-${orders.length}` : ''} of{' '}
                    {orders.length}
                  </p>

                  <button type='button'>
                    <FaAngleLeft />
                  </button>

                  <button type='button'>
                    <FaAngleRight />
                  </button>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </Card>
  );
};

export default RecentOrders;
