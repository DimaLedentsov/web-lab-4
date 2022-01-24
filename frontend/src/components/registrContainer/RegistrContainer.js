import React, {useRef} from 'react';
import Title from '../Title';
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import { selectToken } from '../../slices/tokenSlice';

const RegistrContainer = ({serverPort}) => {
    const token =  useSelector(selectToken);
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
      } = useForm();

    const password = useRef({});
    password.current = watch("password", "");
  
    
  
    const onSubmit = (data) => {
      console.log(token);
  
      console.log("Attempt entered by user:");
      console.log(data);
  
      tryToSendAddAttemptRequest(serverPort, token, data).then(
      (registrationResult) => {
          console.log("Got this attempt from server:" + registrationResult);
          
          }
        ).catch(() => {
        //todo: maybe token is expired - need to go to login page
        console.log("Adding attempt finished with error!");
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
          <input placeholder='Password: more than 8 chars'
          {...register("password", { required: true, pattern: /^[A-Za-z0-9]+$/i, minLength: 8,})} />
          {errors?.password?.type === "pattern" && (<p className='error'>Latin leters and numbers</p>)}
          {errors?.password?.type === "minLength" && <p className='error'>At least 8 chars</p>}
          {errors?.password?.type === "required" && <p className='error'>This field is required</p>}
    
    
          <label>Repeat password</label>
          <input placeholder='Repeat password'
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
        </form>
    );
};

export default RegistrContainer;

let tryToSendAddAttemptRequest = async (port, token, data) => {
    console.log(port);
    let url = "http://localhost:"+ port +"/attempts";
    console.log("Sending POST request to url: " + url + ". With body: " + JSON.stringify(data));
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token
      },
      mode: 'cors',
      body: JSON.stringify(data),
    });
    return await response.json();
}
