import React from 'react';
import Plot from '../plot/Plot';
import AttemptForm from './AttemptForm';
import AttemptsTable from './AttemptsTable';
import { Link } from 'react-router-dom';

const MainPage = ({serverPort}) => {
  return(
  <div className='main-page-block'>
    <p>
      <Link className='logout_link' to="/" onClick={sendLogoutRequest}>Log out</Link>
    </p>
    <Plot serverPort={serverPort}/>
    <AttemptForm serverPort={serverPort}/>
    <AttemptsTable/>
  </div>
  );
};

export default MainPage;

let sendLogoutRequest = () =>{
  
}