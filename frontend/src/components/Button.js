import React from 'react';
import PropTypes from 'prop-types';

const Button = ({color, text}) => {
  return <button className='btn' style={{background : color}}>{text}</button>;
};

export default Button;

Button.defaultProps = {
  color : "steelblue"
}

Button.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
}
