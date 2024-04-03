import React, { useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { URL } from './Utils/Config';
import ChessBG from '../assets/chess_bg_1.jpg';

// create one horizonatal line put each button on different side and put background picture with lower opacity and little bit darker.         

function Home() {
    const   navigate = useNavigate();
    const User = useContext(UserContext);

    const handleFriendsGame = async () => {
        // create the game and also pass the starting fen position of chess.
        const res = await axios.post(`${URL }/g/create`, { id: User.user.id, fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1' });
        navigate(`/g/${res.data.gameId}`);
    }

    const handleComputerGame = async () => {
        navigate(`/g/computer`);
    }

    return (
        <div id="home-page-container" style={{backgroundImage: `url(${ChessBG})`}}>
            <div id="home-left-side">
                <div id="home-left-button">
                    <button type="submit" onClick={handleFriendsGame} className="btn btn-primary btn-lg play-game-button">Play with friends</button>
                </div>
            </div>
            <div id="vertical-line"></div>
            <div id="home-right-side">
                <div id="home-right-button">
                    <button type="submit" onClick={handleComputerGame} className="btn btn-primary btn-lg play-game-button">Play against Computer</button>
                </div>
            </div>
        </div>
    )
}

export default Home
