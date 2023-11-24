import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Outlet } from 'react-router-dom';

import { userActions } from '../../store/user/user-slice';
import useHttp from '../../hooks/use-http';
import NavBar from '../../components/Layout/Navbar/Navbar';
import Sidebar from '../../components/Layout/Sidebar/Sidebar';
import { host } from '../../store/store';

// ==================================================

const MainLayout = () => {
  const dispatch = useDispatch();
  const sendRequest = useHttp();
  const navigate = useNavigate();

  useEffect(() => {
    sendRequest({ url: `${host}/user` })
      .then((result) => {
        if (result.error) {
          return navigate('/signin', { replace: true });
        }

        Object.keys(result).map((key) =>
          dispatch(
            userActions.replaceUserState({ name: key, value: result[key] })
          )
        );

        if (result.role === 'counselor') {
          return navigate('/chat', { replace: true });
        }
      })
      .catch((err) => console.log(err));
  }, [sendRequest, dispatch, navigate]);

  return (
    <div className='layout-container'>
      <NavBar />

      <Sidebar />

      <main>
        <div className='container-lg'>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
