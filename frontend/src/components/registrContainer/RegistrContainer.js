import React from 'react';
import Title from '../Title';
import Button from '../Button';

const RegistrContainer = () => {
    return <div className="register_box container" >
      <Title text="Register Here"/>
      <div className='login field'>
          <label>Login</label>
          <input type="text" placeholder="Login"/>
      </div>
      <div className='passwod field'>
          <label>Password</label>
          <input type="text" placeholder="Password"/>
      </div>
      <div className='passwod field'>
          <label>Repeat Password</label>
          <input type="text" placeholder="Password"/>
      </div>
      <Button text='Submit' color='steelblue'/>
    </div>;
};

export default RegistrContainer;
