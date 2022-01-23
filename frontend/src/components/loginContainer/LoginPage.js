import React from 'react';
import { Link } from 'react-router-dom';
import LoginContainer from './LoginContainer';

const LoginPage = () => {
  return <>
  <LoginContainer/>
  <p>
    <Link className='swich_link' to="/register">Didn't register yet?</Link>
  </p>
  </>;
};

export default LoginPage;
