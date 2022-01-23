import React from 'react';
import AuthorDetailes from './AuthorDetailes';

const Header = ({title}) => {
  return <div className='header'>
  <h1>{title}</h1>
  <AuthorDetailes/>
  </div>;
};

export default Header;
