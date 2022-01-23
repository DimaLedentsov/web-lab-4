import React from 'react';
import Plot from '../Plot';
import AttemptForm from './AttemptForm';
import AttemptsTable from './AttemptsTable';
import { Link } from 'react-router-dom';

const MainPage = ({serverPort}) => {
  return(
  <>
    <p>
      <Link className='logout_link' to="/" onClick={sendLogoutRequest}>Log out</Link>
    </p>
    <Plot/>
    <AttemptForm serverPort={serverPort}/>
    <AttemptsTable/>
  </>
  );
};

export default MainPage;

let sendLogoutRequest = () =>{
  
}