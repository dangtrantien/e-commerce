import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import Card from '../UI/Card';
import useHttp from '../../hooks/use-http';
import { productActions } from '../../store/product/product-slice';
import { getProduct } from '../../store/product/product-actions';
import { host } from '../../store/store';

import styles from './ProductForm.module.css';

// ==================================================

const ProductForm = () => {
  const dispatch = useDispatch();
  const sendRequest = useHttp();
  const location = useLocation();
  const navigate = useNavigate();

  const product = useSelector((state) => state.product);
  const [selectedImages, setSelectedImages] = useState({});

  const inputChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    dispatch(productActions.replaceProductSate({ name, value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('name', product.name);
    formData.append('category', product.category);
    formData.append('short_desc', product.short_desc);
    formData.append('long_desc', product.long_desc);
    formData.append('price', product.price);
    formData.append('count', product.count);

    for (const key of Object.keys(selectedImages)) {
      formData.append('images', selectedImages[key]);
    }

    // Add new product
    let url = `${host}/admin/product`;
    let method = 'POST';

    // Edit product
    if (location.state) {
      url = `${host}/admin/product/${location.state.productId}`;
      method = 'PUT';
    }

    sendRequest({
      url: url,
      method: method,
      credentials: 'include',
      body: formData,
    })
      .then((result) => {
        if (result.error) {
          return alert(result.message);
        }

        return navigate('/products', { replace: true });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    // Lấy data của product nếu là edit mode
    if (location.state) {
      dispatch(getProduct(location.state.productId));
    } else {
      dispatch(productActions.addNewProduct());
    }
  }, [location.state, dispatch]);

  return (
    <Card>
      <form className={styles['form-container']} onSubmit={submitHandler}>
        <div className={styles['control-container']}>
          <label htmlFor='name'>Product Name</label>
          <input
            id='name'
            name='name'
            type='text'
            value={product.name}
            onChange={inputChangeHandler.bind(this)}
            placeholder='Enter Product name'
            required
          />
        </div>

        <div className={styles['control-container']}>
          <label htmlFor='category'>Category</label>
          <input
            id='category'
            name='category'
            type='text'
            value={product.category}
            onChange={inputChangeHandler.bind(this)}
            placeholder='Enter Category'
            required
          />
        </div>

        <div className={styles['control-container']}>
          <label htmlFor='short_desc'>Short Description</label>
          <textarea
            id='short_desc'
            name='short_desc'
            value={product.short_desc}
            onChange={inputChangeHandler.bind(this)}
            placeholder='Enter Short Description'
            required
          />
        </div>

        <div className={styles['control-container']}>
          <label htmlFor='long_desc'>Long Description</label>
          <textarea
            id='long_desc'
            name='long_desc'
            value={product.long_desc}
            onChange={inputChangeHandler.bind(this)}
            placeholder='Enter Long Description'
            required
          />
        </div>

        <div className={styles['input-number--container']}>
          <div className={styles['control-container']}>
            <label htmlFor='price'>Price</label>
            <input
              id='price'
              name='price'
              type='number'
              value={product.price}
              onChange={inputChangeHandler.bind(this)}
              min={0}
            />
          </div>

          <div className={styles['control-container']}>
            <label htmlFor='count'>Product Count</label>
            <input
              id='count'
              name='count'
              type='number'
              value={product.count}
              onChange={inputChangeHandler.bind(this)}
              min={0}
            />
          </div>
        </div>

        {!location.state && (
          <div className={styles['control-container']}>
            <label htmlFor='images'>Upload image (4 images)</label>
            <input
              id='images'
              name='images'
              type='file'
              multiple
              onChange={(e) => setSelectedImages(e.target.files)}
            />
          </div>
        )}

        <button className='button' type='submit'>
          Submit
        </button>
      </form>
    </Card>
  );
};

export default ProductForm;
