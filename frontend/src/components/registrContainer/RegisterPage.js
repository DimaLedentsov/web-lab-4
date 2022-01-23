import React from 'react';
import { Link } from 'react-router-dom';
import RegistrContainer from './RegistrContainer';

const RegisterPage = () => {
  return <>
  <RegistrContainer/>
  <Link className='swich_link' to="/">Already registered?</Link>
  </>;
};

export default RegisterPage;