import './App.css';
import Catalogue from './components/Catalogue/Catalogue';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Create from './components/Create/Create';


function App() {
	return (
		<div id="box">

			<Header />

			{/* Main Content */}
			<main id="main-content">

				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='/catalogue' element={<Catalogue/>} />
					<Route path='/create' element={<Create />} />
				</Routes>

			</main>

			{/* Login Page ( Only for Guest users ) */}
			{/* Register Page ( Only for Guest users ) */}
			{/* Create Page ( Only for logged-in users ) */}
			{/* Edit Page ( Only for the creator )*/}
			{/*Details Page*/}
			{/* Catalogue */}

		</div>
	);
}

export default App;
