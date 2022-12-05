import React from 'react';
import { useForm } from "react-hook-form";
import Title from '../Title';
import {useDispatch} from 'react-redux';
import { setToken } from '../../slices/tokenSlice.js';
import {Link, useNavigate} from 'react-router-dom';


const LoginContainer = ({serverPort}) => {
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors }
  } = useForm();

  const dispatch = useDispatch()

  const navigate = useNavigate();

  let loginAction = (data) => {

  sendLoginRequest(serverPort, data.login, data.password).then((token) => {
    console.log("Resived token for autorization: " + token);
    dispatch(setToken(token)); //todo: check if token is valid
    navigate('/main', {replace: true});
  }).catch(() => {
    console.log("Fail to request token, maybe login or password are incorrect!");
    alert("Fail to request token, maybe login or password are incorrect!");
    //todo: login or password is incorrect
  });

  }

  return <form className="login_form container" onSubmit={handleSubmit(loginAction)} >
    <Title text="Login Here"/>

    <label>Login</label>
    <input placeholder='Login: more than 8 chars'
    {...register("login", {required: true, pattern: /^[A-Za-z0-9]+$/i, })} />
    {errors?.login?.type === "pattern" && ( <p className='error'>Latin leters and numbers</p>)}
    {errors?.login?.type === "required" && <p className='error'>This field is required</p>}

    <label>Password</label>
    <input type="password" placeholder='Password: more than 8 chars'
    {...register("password", { required: true, pattern: /^[A-Za-z0-9]+$/i, minLength: 8,})} />
    {errors?.password?.type === "pattern" && (<p className='error'>Latin leters and numbers</p>)}
    {errors?.password?.type === "minLength" && <p className='error'>At least 8 chars</p>}
    {errors?.password?.type === "required" && <p className='error'>This field is required</p>}
    
    <input type="submit" value='Submit' className='btn btn-block'/>
    <p>
      <Link className='swich_link' to="/register">Didn't register yet?</Link>
    </p>
  </form>;
};

export default LoginContainer;

let sendLoginRequest = async (port, login, password) => {
  let url = "http://localhost:"+ port +"/auth/login?" + new URLSearchParams({"login":login, "password":password});
  console.log("Sending GET request to url: " + url);
  const response = await fetch(url, {
    method: 'GET',
    mode: 'cors',
  });

  let json = await response.json();
  console.log(json);
  return json.token;
}
