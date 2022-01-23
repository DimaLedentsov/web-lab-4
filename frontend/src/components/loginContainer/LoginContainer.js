import React from 'react';
import Title from '../Title';
import Button from '../Button';

const LoginContainer = () => {
  return <div className="login_box container" >
    <Title text="Login Here"/>
    <div className='login field'>
        <label>Login</label>
        <input type="text" placeholder="Login"/>
    </div>
    <div className='passwod field'>
        <label>Password</label>
        <input type="text" placeholder="Password"/>
    </div>
    <Button text='Submit' color='steelblue'/>
  </div>;
};

export default LoginContainer;
