import './App.css';

import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import Catalogue from './components/Catalogue/Catalogue';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';
import Create from './components/Create/Create';
import Details from './components/Details/Details';
import Edit from './components/Edit/Edit';

// import * as gamesService from './services/gameService';
// import { useLocalStorage } from './hooks/useLocalStorage';

import { AuthProvider } from './context/authContext';
import { GameProvider } from './context/gameContext';


// import Register from './components/Register/Register';
const Register = lazy(() => import('./components/Register/Register'));


function App() {
	return (
		<AuthProvider>
			<div id="box">
				<Header />
				<GameProvider>
					<main id="main-content">
						<Routes>
							<Route path='/' element={<Home />} />
							<Route path='/login' element={<Login />} />
							<Route path='/register' element={
								<Suspense fallback={<span>Loading.....</span>}>
									<Register />
								</Suspense>}
							/>
							<Route path='/logout' element={<Logout />} />
							<Route path='/catalogue' element={<Catalogue />} />
							<Route path='/create' element={<Create />} />
							<Route path='/edit/:gameId' element={<Edit />} />
							<Route path='/catalogue/:gameId' element={<Details />} />
						</Routes>
					</main>
				</GameProvider>
			</div>
		</AuthProvider>
	);
}

export default App;
