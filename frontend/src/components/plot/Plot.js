import React from 'react';
import {initCanvas, drawPlot, drawPlotAfterClick} from './plotScripts';
import { useSelector, useDispatch } from 'react-redux';
import { addAttempt} from '../../slices/AttemptSlice';
import {selectToken} from '../../slices/tokenSlice';


const Plot = ({serverPort}) => {
  const token =  useSelector(selectToken);
  const dispatch = useDispatch();
  //todo:init plot at start

  let addPoint = (e) => {
    let coordinates = drawPlotAfterClick(e);
    if(coordinates !== null){
      console.log(token);
  
      console.log("Attempt entered by user:");
      console.log(coordinates);
  
      tryToSendAddAttemptRequest(serverPort, token, coordinates).then(
      (newAttempt) => {
          console.log("Got this attempt from server:");
          console.log(newAttempt);
          dispatch(addAttempt(newAttempt));
          //todo: draw plot and add it to table. (Maybe they both could just subscribe to the state data)
          }
        ).catch(() => {
        //todo: maybe token is expired - need to go to login page
        console.log("Adding attempt finished with error!");
        }
      );
    }
  }

  return <div id='plot' className='plot container' onClick={addPoint}/>;
};

export default Plot;

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