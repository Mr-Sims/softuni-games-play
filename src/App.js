import './App.css';
import Catalogue from './components/Catalogue/Catalogue';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Create from './components/Create/Create';
import {useEffect, useState} from 'react';
import * as gamesService from './services/gameService';
import Details from './components/Details/Details';
import uniqid from 'uniqid'


function App() {

	const [games, setGames] = useState([]);
	const navigate = useNavigate();
	

	const addComment = (gameId, comment) => {
		setGames(state => {
			
			const game = state.find(x => x._id === gameId);
			const comments = game.comments || [];
			comments.push(comment)

			return [
				...state.filter(x => x._id !== gameId),
				{...game, comments}, 
			]
		})
	}; 

	const addGame = (gameData) => {
		const id = uniqid()
		setGames(state => [
			...state,
			{
				...gameData,
				_id: id,
			},
		])
		navigate(`/catalogue/${id}`)
	}

    useEffect(() => {
        gamesService.getAll()
            .then(result => {
				// console.log(result)
				setGames(result)
			})
    }, [])

	return (
		<div id="box">

			<Header />
			<main id="main-content">
				<Routes>
					<Route path='/' element={<Home games={games} />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='/catalogue' element={<Catalogue games={games} />} />
					<Route path='/create' element={<Create addGame={addGame} />} />
					<Route path='/catalogue/:gameId' element={<Details games={games} addComment={addComment} />} />
				</Routes>
			</main>
		</div>
	);
}

export default App;
