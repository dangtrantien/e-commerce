import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import useHttp from '../../hooks/use-http';
import Card from '../UI/Card';
import { host } from '../../store/store';

import styles from './ProductList.module.css';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

// ==================================================

const ProductList = () => {
  const sendRequest = useHttp();
  const navigate = useNavigate();

  const [enteredSearchKey, setEnteredSearchKey] = useState('');
  const [totalProduct, setTotalProduct] = useState(0);
  const [currentProducts, setCurrentProducts] = useState([]);
  const [page, setPage] = useState(1);

  // Tổng số page
  let totalPage = 1;

  if (totalProduct > 9) {
    while (totalPage <= Math.round(totalProduct / 9)) {
      totalPage++;
    }
  }

  const pageChangeHandler = (direction) => {
    if (direction === 'next') {
      setPage((prev) => (prev === totalPage ? 1 : prev + 1));
    } else {
      setPage((prev) => (prev === 1 ? totalPage : prev - 1));
    }
  };

  const editHandler = (productId) => {
    return navigate('/new-product', { replace: true, state: { productId } });
  };

  const deleteHandler = (productId) => {
    if (
      window.confirm("Are you sure? You won't be able to revert this!") === true
    ) {
      sendRequest({
        url: `${host}/admin/product/${productId}`,
        method: 'DELETE',
      })
        .then((result) => {
          alert(result.message);

          window.location.reload(true);
        })
        .catch((err) => console.log(err));
    }
  };

  // Render value theo page
  useEffect(() => {
    sendRequest({
      url: `${host}/admin/products/search?keyword=${enteredSearchKey}&page=${page}&limit=9`,
    })
      .then((result) => {
        if (result.error) {
          return alert(result.message);
        }

        setTotalProduct(result.total);
        setCurrentProducts(result.data);
      })
      .catch((err) => console.log(err));
  }, [sendRequest, enteredSearchKey, page]);

  return (
    <Card>
      <div className='d-flex align-items-center justify-content-between'>
        <h3>Products</h3>

        <Link to='/new-product' className='button green-button'>
          Add Product
        </Link>
      </div>

      <input
        className={styles['search-input']}
        type='text'
        placeholder='Enter Search'
        value={enteredSearchKey}
        onChange={(e) => setEnteredSearchKey(e.target.value)}
      />

      <div className='table-container'>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Category</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts?.map((prod) => (
              <tr key={prod._id}>
                <td>{prod._id}</td>
                <td>{prod.name}</td>
                <td>{prod.price?.toLocaleString('de-DE')}</td>
                <td className='image'>
                  <img src={prod.img1} alt={prod.name} />
                </td>
                <td>{prod.category}</td>
                <td>
                  <button
                    className='button green-button me-2'
                    type='button'
                    onClick={editHandler.bind(null, prod._id)}
                  >
                    update
                  </button>

                  <button
                    className='button red-button'
                    type='button'
                    onClick={deleteHandler.bind(null, prod._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            <tr>
              <td colSpan={6} />
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={4} />
              <td colSpan={2}>
                <div className='pagination'>
                  <p>
                    1
                    {currentProducts?.length > 1
                      ? `-${currentProducts?.length}`
                      : ''}{' '}
                    of {totalProduct}
                  </p>

                  <button
                    type='button'
                    onClick={pageChangeHandler.bind(null, 'prev')}
                  >
                    <FaAngleLeft />
                  </button>

                  <button
                    type='button'
                    onClick={pageChangeHandler.bind(null, 'next')}
                  >
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

export default ProductList;
