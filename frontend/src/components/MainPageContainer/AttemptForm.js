import React, {useEffect} from 'react';
import Title from '../Title';
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import {addAttempt, selectAttempts} from '../../slices/AttemptSlice';
import { selectToken } from '../../slices/tokenSlice';
import Select from "react-select";
import {setR, UpdatePlot} from "./plot/plotScripts";
import Plot from "./plot/Plot";

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

    tryToSendAddAttemptRequest(serverPort, token, data).then(
    (newAttempt) => {
        console.log("Got this attempt from server:");
        console.log(newAttempt);
        dispatch(addAttempt(newAttempt));
        //todo: draw plot and add it to table. (Maybe they both could just subscribe to the state data)
        }
      ).catch(() => {
      //todo: maybe token is expired - need to go to login page
      console.log("Adding attempt finished with error!");
        alert("Adding attempt finished with error! logout please...");

      }
    );
  };

    const options = [
        { value: '-2', label: '-2' },
        { value: '-1', label: '-1' },
        { value: '3', label: '3' }
    ]


  // console.log(watch("example")); you can watch individual input by pass the name of the input

  return (
    <form className="attempt_form container" onSubmit={handleSubmit(onSubmit)}>
      <Title text='Enter Coordinates'/>
      {/* <label>X</label> */}
        <p >X:</p>
      <input placeholder='X: from -4 to 4'
          {...register("x", {required: true, pattern: /^-?[0-9]+$/i, min: -4, max: 4 })} />
      {errors.x && (
        <p className='error'>X has to be in -4 ... 4</p>
      )}

        <p >Y:</p>
        <select  placeholder='y: from -5 to 5'  {...register("y", {required: true})}>
            <option value="-5">-5</option>
            <option value="-4">-4</option>
            <option value="-3">-3</option>
            <option value="-2">-2</option>
            <option value="-1">-1</option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>

      {errors.y && (
        <p className='error'> Y has to be in -5 ... 5</p>
      )}

        <p >R:</p>
        <select  id= "Rval" placeholder='R: from 1 to 5' {...register("r", {required: true, onChange:(e)=>{
                console.log("changed r")
                //UpdatePlot();
              } },)}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>

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