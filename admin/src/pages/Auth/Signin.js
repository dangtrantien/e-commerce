import AuthWrapper from '../../components/Authentication/AuthWrapper';
import SigninForm from '../../components/Authentication/SigninForm';

// ==================================================

const LoginPage = () => {
  return (
    <AuthWrapper>
      <SigninForm />
    </AuthWrapper>
  );
};

export default LoginPage;
