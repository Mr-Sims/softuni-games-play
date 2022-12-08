import './App.css';

import { useEffect, useState, lazy, Suspense } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Catalogue from './components/Catalogue/Catalogue';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';
import Create from './components/Create/Create';
import Details from './components/Details/Details';
import Edit from './components/Edit/Edit';

import * as gamesService from './services/gameService';
import { useLocalStorage } from './hooks/useLocalStorage';

import { AuthContext } from './context/authContext';
import { GameContext } from './context/gameContext';


// import Register from './components/Register/Register';
const Register = lazy(() => import('./components/Register/Register'));




function App() {

	const [games, setGames] = useState([]);

	const [auth, setAuth] = useLocalStorage('auth', {})

	const navigate = useNavigate();


	const userLogin = (authData) => {
		setAuth(authData)
	}

	const userLogout = () => {
		setAuth({})
	}


	const addComment = (gameId, comment) => {
		setGames(state => {

			const game = state.find(x => x._id === gameId);
			const comments = game.comments || [];
			comments.push(comment)

			return [
				...state.filter(x => x._id !== gameId),
				{ ...game, comments },
			]
		})
	};

	const addGame = (gameData) => {
		setGames(state => [
			...state,
			{
				...gameData,
			},
		])
		navigate(`/catalogue/${gameData._id}`)
	}

	const editGame = (gameId, gameData) => {
		setGames(state => {
			return [
				...state.filter(x => x._id !== gameId),
				{...gameData}
			]
		})
		// setGames(state => state.map(x => x._id === gameId ? gameData : x));
		// console.log(`gameData ID: `, gameData._id)
		// console.log(`gameId: `, gameId)
		navigate(`catalogue/${gameData._id}`)
	}

	useEffect(() => {

		gamesService.getAll()
			.then(result => {
				// console.log(result)
				setGames(result)
			})
	}, [])

	return (
		<AuthContext.Provider value={{ user: auth, userLogin, userLogout }}>
			<div id="box">

				<Header />

				<GameContext.Provider value={{ games, addGame, editGame }}>
					<main id="main-content">
						<Routes>
							<Route path='/' element={<Home games={games} />} />
							<Route path='/login' element={<Login />} />
							<Route path='/register' element={
								<Suspense fallback={<span>Loading.....</span>}>
									<Register />
								</Suspense>}
							/>
							<Route path='/logout' element={<Logout />} />
							<Route path='/catalogue' element={<Catalogue games={games} />} />
							<Route path='/create' element={<Create />} />
							<Route path='/edit/:gameId' element={<Edit />} />
							<Route path='/catalogue/:gameId' element={<Details games={games} addComment={addComment} />} />
						</Routes>
					</main>
				</GameContext.Provider>
			</div>
		</AuthContext.Provider>
	);
}

export default App;
