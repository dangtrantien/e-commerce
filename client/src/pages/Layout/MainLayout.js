import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, ScrollRestoration } from 'react-router-dom';

import { userActions } from '../../store/user/user-slice';
import useHttp from '../../hooks/use-http';
import NavBar from '../../components/Layout/Navbar';
import Footer from '../../components/Layout/Footer';
import { host } from '../../store/store';

// ==================================================

const MainLayout = () => {
  const dispatch = useDispatch();
  const sendRequest = useHttp();

  const [isSignin, setIsSignin] = useState(false);

  useEffect(() => {
    sendRequest({ url: `${host}/user` })
      .then((result) => {
        if (result.error) {
          return setIsSignin(false);
        }

        setIsSignin(true);

        Object.keys(result).map((key) =>
          dispatch(
            userActions.replaceUserState({ name: key, value: result[key] })
          )
        );
      })
      .catch((err) => console.log(err));
  }, [sendRequest, dispatch]);

  return (
    <>
      <NavBar isSignin={isSignin} />

      <main className='container-lg'>
        <Outlet />
      </main>

      <Footer />

      <ScrollRestoration />
    </>
  );
};

export default MainLayout;
