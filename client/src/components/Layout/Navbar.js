import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import useHttp from '../../hooks/use-http';
import { userActions } from '../../store/user/user-slice';
import { host } from '../../store/store';

import styles from './Navbar.module.css';
import { FaUser, FaShoppingCart } from 'react-icons/fa';

// ==================================================

const NavBar = (props) => {
  const dispatch = useDispatch();
  const sendRequest = useHttp();
  const navigate = useNavigate();

  const fullName = useSelector((state) => state.user.fullName);
  const cartTotalQuantity = useSelector((state) => state.user.cart.totalItem);

  const logoutHandler = () => {
    sendRequest({
      url: `${host}/logout`,
      method: 'POST',
    })
      .then(() => {
        dispatch(userActions.logout());

        return navigate('/', { replace: true });
      })
      .catch((err) => console.log(err));
  };

  return (
    <header className={styles['header-container']}>
      <Navbar expand='md' className='py-4'>
        <Container>
          <h1 className={`${styles.brand} ${styles['nav-content']}`}>
            Boutique
          </h1>

          <Navbar.Toggle />

          <Navbar.Collapse>
            <Nav className={styles.nav}>
              <div className={styles['nav-link--container']}>
                <NavLink
                  to='/'
                  className={({ isActive }) =>
                    isActive ? 'active border-0' : 'border-0'
                  }
                >
                  Home
                </NavLink>

                <NavLink
                  to='/shop'
                  className={({ isActive }) => (isActive ? 'active' : null)}
                >
                  Shop
                </NavLink>
              </div>

              <h1 className={styles['nav-content']}>Boutique</h1>

              <div className={styles['nav-link--container']}>
                <NavLink
                  to='/cart'
                  className={({ isActive }) => (isActive ? 'active' : null)}
                >
                  <FaShoppingCart color='rgba(0, 0, 0, 0.3)' />

                  <span>Cart</span>

                  {cartTotalQuantity > 0 && (
                    <span className={styles.badge}>
                      {cartTotalQuantity <= 99 ? cartTotalQuantity : '99+'}
                    </span>
                  )}
                </NavLink>

                {!props.isSignin && (
                  <NavLink
                    to='/signin'
                    className={({ isActive }) => (isActive ? 'active' : null)}
                  >
                    <FaUser color='rgba(0, 0, 0, 0.3)' />
                    Login
                  </NavLink>
                )}

                {props.isSignin && (
                  <NavDropdown
                    title={
                      <>
                        <FaUser color='rgba(0, 0, 0, 0.3)' />
                        {fullName}
                      </>
                    }
                    align='end'
                  >
                    <NavDropdown.Item
                      className={styles['nav-dropdown--item']}
                      onClick={() => navigate('/history', { replace: true })}
                    >
                      History
                    </NavDropdown.Item>
                  </NavDropdown>
                )}

                {props.isSignin && (
                  <button
                    className={styles['nav-btn']}
                    type='button'
                    onClick={logoutHandler}
                  >
                    ( Logout )
                  </button>
                )}
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default NavBar;
