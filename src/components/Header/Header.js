// import { useContext } from 'react';
import {Link} from 'react-router-dom';
import { useAuthContext } from '../../context/authContext';

const Header = () => {
	const {user} = useAuthContext()
	// console.log(user.accessToken)
    return (
        <header>
				{/* Navigation */}
				<h1>
					<Link className="home" to="/">
						GamesPlay
					</Link>
				</h1>
				<nav>
					{user.email && <span>Hello, {user.email}</span>}
					<Link to="/catalogue">All games</Link>
					{user.accessToken 
					? <div id="user">
						<Link to="/create">Create Game</Link>
						<Link to="/logout">Logout</Link>
					</div>
					: <div id="guest">
						<Link to="/login">Login</Link>
						<Link to="/register">Register</Link>
					</div> 	
				}
				</nav>
			</header>
    );
};

export default Header;