import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/loginContainer/LoginPage';
import RegisterPage from './components/registrContainer/RegisterPage';
import Header from './components/Header';

function App() {
    return(
        <Router>
            <Header title="Coordinate checker"/>
            <Routes>
                {/* <Route path='/' element={<Body/>}/> */}
                <Route path='/' element={<LoginPage/>}/>
                <Route path='/register' element={<RegisterPage/>}/>
            </Routes>
        </Router>
    )
}

export default App;
