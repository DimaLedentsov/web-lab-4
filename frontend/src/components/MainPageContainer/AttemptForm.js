import React from 'react';
import Title from '../Title';
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import { addAttempt} from '../../slices/AttemptSlice';
import {selectToken} from '../../slices/tokenSlice';

const AttemptForm = ({serverPort}) => {
  const token =  useSelector(selectToken);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    console.log(token);

    console.log("Attempt entered by user:");
    console.log(data);
    let newAttempt = null;
    try{
      newAttempt = tryToSendAddAttemptRequest(serverPort, token, data);
      console.log("Got this attempt from server:");
      console.log(newAttempt);
    }catch (e) {
      //todo: maybe token is expired - need to go to login page
      console.log("Adding attempt finished with error!");
   }

   if(newAttempt !== null){
      dispatch(addAttempt(newAttempt));
   }

   //todo: draw plot and add it to table. (Maybe they both could just subscribe to the state data)
  };

  // console.log(watch("example")); you can watch individual input by pass the name of the input

  return (
    <form className="attempt_form container" onSubmit={handleSubmit(onSubmit)}>
      <Title text='Enter Coordinates'/>
      {/* <label>X</label> */}
      <input placeholder='X: from -4 to 4'
          {...register("x", {required: true, pattern: /^-?[0-9]+$/i, min: -4, max: 4 })} />
      {errors.x && (
        <p className='error'>X has to be in -4 ... 4</p>
      )}

      {/* <label>Y</label> */}
      <input placeholder='Y: from -5 to 5'
      {...register("y", { required: true, pattern: /^-?[0-9]+$/i, min: -5, max: 5 })} />
      {errors.y && (
        <p className='error'> Y has to be in -5 ... 5</p>
      )}


      {/* <label>R</label> */}
      <input placeholder='R: from 1 to 5'
      {...register("r", { required: true, pattern: /^[0-9]+$/i, min: 1, max: 5 })} />
      {errors.r && (
        <p className='error'>R has to be in 1 ... 5</p>
      )}

      <input type="submit" value="Submit" className='btn-block btn' />
    </form>
  );

}

export default AttemptForm;


let tryToSendAddAttemptRequest = async (port, token, data) => {
  console.log(port);
  let url = "http://localhost:"+ port +"/attempts";
  console.log("Sending POST request to url: " + url + ". With body: ");
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
      
    },
    mode: 'cors',
    body: JSON.stringify(data),
  });
  return await response.json();
}