import { productActions } from './product-slice';
import { host } from '../store';

// ==================================================

export const getProduct = (productId) => {
  return async (dispatch) => {
    const response = await fetch(`${host}/product/${productId}`);

    const resData = await response.json();

    if (!response.ok) {
      return alert(resData.message);
    }

    return Object.keys(resData).map((key) =>
      dispatch(
        productActions.replaceProductSate({ name: key, value: resData[key] })
      )
    );
  };
};
