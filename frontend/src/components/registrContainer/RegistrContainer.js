import React, {useRef} from 'react';
import Title from '../Title';
import { useForm } from "react-hook-form";
import {useDispatch} from 'react-redux';
import { setToken } from '../../slices/tokenSlice.js';
import {Link, useNavigate} from 'react-router-dom';

const RegistrContainer = ({serverPort}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
      } = useForm();

    const password = useRef({});
    password.current = watch("password", "");
  
    const onSubmit = (data) => {
  
      console.log("Attempt entered by user:");
      console.log(data);
  
      tryToSendAddAttemptRequest(serverPort, {login:data.login, password:data.password}).then(
      (registrationResult) => {
          console.log("Got this attempt from server:" + registrationResult);
          if(registrationResult === "User added successfully"){
            sendLoginRequest(serverPort, data.login, data.password).then((token) => {
                console.log("Resived token for autorization: " + token);
                dispatch(setToken(token)); //todo: check if token is valid
                navigate('/main', {replace: true});
              }
              ).catch(() => {
                console.log("Fail to request token, maybe login or password are incorrect!");
                alert("Fail to request token, maybe login or password are incorrect!");
                //todo: login or password is incorrect
              });
          } else{
              alert(registrationResult);
          }
        }
        ).catch(() => {
        //todo: maybe token is expired - need to go to login page
        console.log("Adding attempt finished with error!");
          alert("Adding attempt finished with error!");
        }
      );
    };

    return (
        <form className="register_box container" onSubmit={handleSubmit(onSubmit)}>
          <Title text='Register Here'/>
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
    
    
          <label>Repeat password</label>
          <input type="password" placeholder='Repeat password'
          {...register("repeatePassword", {
               required: true,
               pattern: /^[A-Za-z0-9]+$/i,
                minLength: 8,
                validate: value => value === password.current})} />
          {errors?.repeatePassword?.type === "pattern" && (<p className='error'>Latin leters and numbers</p>)}
          {errors?.repeatePassword?.type === "minLength" && <p className='error'> At least 8 chars</p>}
          {errors?.repeatePassword?.type === "required" && <p className='error'>This field is required</p>}
          {errors?.repeatePassword?.type === "validate" && <p className='error'>The passwords do not match</p>}
    
          <input type="submit" value="Submit" className='btn-block btn' />

            <Link className='swich_link' to="/">Already registered?</Link>
        </form>
    );
};

export default RegistrContainer;

let tryToSendAddAttemptRequest = async (port, data) => {
    console.log(port);
    let url = "http://localhost:"+ port +"/auth/register";
    console.log("Sending POST request to url: " + url + ". With body: " + JSON.stringify(data));
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify(data),
    });
    return response.text(); //todo: think if it will be better to return json as response or use just request status?
}

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
  
