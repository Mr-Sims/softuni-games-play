import { useContext } from 'react';
import {Link} from 'react-router-dom'
import * as authService from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';


const Login = () => {
    const {userLogin} = useContext(AuthContext)
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();

        const {email, password} = Object.fromEntries(new FormData(e.target));
        authService.login({email, password})
            .then(authData => {
                console.log(authData)
                userLogin(authData)
                navigate('/')
            })
            .catch(() => {
                navigate('/404')
            })


    }
    return (
        <section id="login-page" className="auth">
            {/* Login Page ( Only for Guest users ) */}

            <form id="login" onSubmit={onSubmit}>
                <div className="container">
                    <div className="brand-logo" />
                    <h1>Login</h1>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Sokka@gmail.com"
                    />
                    <label htmlFor="login-pass">Password:</label>
                    <input type="password" id="login-password" name="password" />
                    <input type="submit" className="btn submit" value="Login" />
                    <p className="field">
                        <span>
                            If you don't have profile click <Link to="/register">here</Link>
                        </span>
                    </p>
                </div>
            </form>
        </section>
    );
};

export default Login;