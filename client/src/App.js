import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import MainLayout from './pages/Layout/MainLayout';
import MiniLayout from './pages/Layout/MiniLayout';
import IsLoading from './components/UI/IsLoading';
import ErrorPage from './components/UI/Error';
import store from './store/store';

const HomePage = lazy(() => import('./pages/Home'));
const ShopPage = lazy(() => import('./pages/Shop/Shop'));
const ProductDetailPage = lazy(() => import('./pages/Shop/ProductDetail'));
const CartPage = lazy(() => import('./pages/Shop/Cart'));
const CheckoutPage = lazy(() => import('./pages/Shop/Checkout'));
const HistoryPage = lazy(() => import('./pages/Order/History'));
const OrderDetailPage = lazy(() => import('./pages/Order/OderDetail'));
const SigninPage = lazy(() => import('./pages/Auth/Signin'));
const SignupPage = lazy(() => import('./pages/Auth/Signup'));

// ==================================================

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<IsLoading />}>
                <HomePage />
              </Suspense>
            ),
          },
          {
            path: 'shop',
            element: (
              <Suspense fallback={<IsLoading />}>
                <ShopPage />
              </Suspense>
            ),
          },
          {
            path: 'product/:productId',
            element: (
              <Suspense fallback={<IsLoading />}>
                <ProductDetailPage />
              </Suspense>
            ),
          },
          {
            path: 'cart',
            element: (
              <Suspense fallback={<IsLoading />}>
                <CartPage />
              </Suspense>
            ),
          },
          {
            path: 'cart/checkout',
            element: (
              <Suspense fallback={<IsLoading />}>
                <CheckoutPage />
              </Suspense>
            ),
          },
          {
            path: 'history',
            element: (
              <Suspense fallback={<IsLoading />}>
                <HistoryPage />
              </Suspense>
            ),
          },
          {
            path: 'order/:orderId',
            element: (
              <Suspense fallback={<IsLoading />}>
                <OrderDetailPage />
              </Suspense>
            ),
          },
        ],
      },
      {
        element: <MiniLayout />,
        children: [
          {
            path: 'signin',
            element: (
              <Suspense fallback={<IsLoading />}>
                <SigninPage />
              </Suspense>
            ),
          },
          {
            path: 'signup',
            element: (
              <Suspense fallback={<IsLoading />}>
                <SignupPage />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
