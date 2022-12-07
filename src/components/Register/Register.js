import { useContext } from 'react';

import {Link} from 'react-router-dom';
import * as authService from '../../services/authService';
import { AuthContext } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const { userLogin } = useContext(AuthContext)
    const navigate = useNavigate();
    const onSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');
        const confirmPassword = formData.get('confirm-password');

        if(password !== confirmPassword) {
            alert('Paswords do not match!')
        }

        authService.register({email, password, confirmPassword})
            .then(authData => {
                userLogin(authData);
                navigate('/');
            })
    }
    return (
        <section id="register-page" className="content auth">
            <form onSubmit={onSubmit} id="register">
                <div className="container">
                    <div className="brand-logo" />
                    <h1>Register</h1>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="maria@email.com"
                    />
                    <label htmlFor="pass">Password:</label>
                    <input type="password" name="password" id="register-password" />
                    <label htmlFor="con-pass">Confirm Password:</label>
                    <input type="password" name="confirm-password" id="confirm-password" />
                    <input className="btn submit" type="submit" value="Register" />
                    <p className="field">
                        <span>
                            If you already have profile click <Link to="/login">here</Link>
                        </span>
                    </p>
                </div>
            </form>
        </section>
    );
};

export default Register;