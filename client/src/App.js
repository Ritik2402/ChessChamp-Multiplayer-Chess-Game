import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import NewPassword from './components/Auth/NewPassword';
import ResetPassword from './components/Auth/ResetPassword';
import Game from './components/Game/Game';
import Computer from './components/Game/Computer';
import LeaderBoard from './components/Game/LeaderBoard';
import UserProfile from './components/User/UserProfile';
import MatchHistory from './components/User/MatchHistory';
import UpdateProfile from './components/User/UpdateProfile';
import UserContext from './context/UserContext';
import { URL } from './components/Utils/Config';
import { Spinner } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

function App() {
    const [user, setUser] = useState({
        isValid: false,
        id: undefined,
        username: undefined,
        rating: undefined,
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkLoggingStatus = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.post(`${URL}/u/verifyToken`, { token: token });
                if (response.data.isValid) {
                    setUser((user) => ({
                        isValid: response.data.isValid,
                        id: response.data.id,
                        username: response.data.username,
                        rating: response.data.rating,
                    }));
                }
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
            }
        };
        checkLoggingStatus();
    }, []);

    // if user has logged in or not is not verified yet then show loading spinner.
    if (isLoading) {
        return (
            <div className='Spinner'>
                <Spinner animation='border' variant='primary' />
            </div>
        );
    }

    return (
        <div id='app-container'>
            <BrowserRouter>
                <UserContext.Provider value={{ user: user, setUser: setUser }}>
                    <Header />
                    <Routes>
                        <Route element={<LandingPage/>} exact path='/' />
                        <Route element={<Login/>} exact path='/login' />
                        <Route element={<Register/>} exact path='/register' />
                        <Route element={<ResetPassword/>} exact path='/resetPassword' />
                        <Route element={<NewPassword/>} exact path='/reset/:resetToken' />
                        <Route element={<LeaderBoard/>} exact path='/g/leaderboard' />
                        <Route element={<Computer/>} exact path='/g/computer' />
                        <Route element={<Game/>} exact path='/g/:gameId' />
                        <Route element={<UpdateProfile/>} exact path='/u/updateProfile' />
                        <Route element={<UserProfile/>} exact path='/u/:userId' />
                        <Route element={<MatchHistory/>} exact path='/u/:userId/matches' />
                        <Route element={() => "404 Page not found"} path="*" />
                    </Routes>
                </UserContext.Provider>
            </BrowserRouter>
        </div>
    );
}

export default App;
