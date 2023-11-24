import { useState } from 'react';

import HomeBanner from '../components/Home/HomeBanner';
import CategoryList from '../components/Home/CategoryList';
import TopTrendingList from '../components/Home/TopTrendingList';
import Features from '../components/Home/Features';
import ProductDetail from '../components/Home/ProductDetail';
import Livechat from '../components/UI/Overlay/Livechat/Livechat';

// ==================================================

const HomePage = () => {
  const [showDetail, setShowDetail] = useState(false);
  const [productDetail, setProductDetail] = useState({});

  const openHandler = (prodDetail) => {
    setShowDetail(true);
    setProductDetail(prodDetail);
  };

  const closeHandler = () => {
    setShowDetail(false);
  };

  return (
    <>
      <HomeBanner />

      <CategoryList />

      <TopTrendingList onShowDetail={openHandler} />

      <Features />

      <ProductDetail
        open={showDetail}
        onClose={closeHandler}
        product={productDetail}
      />

      <Livechat />
    </>
  );
};

export default HomePage;
