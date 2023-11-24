import { lazy, Suspense } from 'react';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import store from './store/store';
import MainLayout from './pages/Layout/MainLayout';
import MiniLayout from './pages/Layout/MiniLayout';
import Error from './components/UI/Error';
import IsLoading from './components/UI/IsLoading';

const DashboardPage = lazy(() => import('./pages/Dashboard/Dashboard'));
const OrderDetailPage = lazy(() => import('./pages/Dashboard/OrderDetail'));
const UsersPage = lazy(() => import('./pages/Users'));
const ProductsPage = lazy(() => import('./pages/Product/Products'));
const NewProductPage = lazy(() => import('./pages/Product/NewProduct'));
const ChatPage = lazy(() => import('./pages/Chat'));
const SigninPage = lazy(() => import('./pages/Auth/Signin'));

// ==================================================

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <Error />,
    element: <MainLayout />,
    children: [
      {
        path: 'dashboard',
        element: (
          <Suspense fallback={<IsLoading />}>
            <DashboardPage />
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
      {
        path: 'users',
        element: (
          <Suspense fallback={<IsLoading />}>
            <UsersPage />
          </Suspense>
        ),
      },
      {
        path: 'products',
        element: (
          <Suspense fallback={<IsLoading />}>
            <ProductsPage />
          </Suspense>
        ),
      },
      {
        path: 'new-product',
        element: (
          <Suspense fallback={<IsLoading />}>
            <NewProductPage />
          </Suspense>
        ),
      },
      {
        path: 'chat',
        element: (
          <Suspense fallback={<IsLoading />}>
            <ChatPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    element: <MiniLayout />,
    children: [
      {
        path: '/signin',
        element: (
          <Suspense fallback={<IsLoading />}>
            <SigninPage />
          </Suspense>
        ),
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
