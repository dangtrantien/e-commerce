const OrderDetailList = (props) => {
  return (
    <div className='table-container'>
      <table className='h-auto'>
        <thead>
          <tr>
            <th>Id Product</th>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {props.products?.map((prod) => (
            <tr key={prod._id}>
              <td>{prod.product._id}</td>
              <td className='image'>
                <img src={prod.product.img1} alt={prod.product.name} />
              </td>
              <td>{prod.product.name}</td>
              <td>{prod.product.price?.toLocaleString('de-DE')} VND</td>
              <td>{prod.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderDetailList;
