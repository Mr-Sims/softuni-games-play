import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import * as userAuth from '../../services/authService';
import { AuthContext } from '../../context/authContext';

const Logout = () => {
    const {user, userLogout} = useContext(AuthContext)
    const navigate = useNavigate();
    useEffect(() => {
        userAuth.logout(user.accessToken)
            .then(() => {
                userLogout();
                navigate('/');
            })
            .catch(() => {
                navigate('/');

            });
    }, []);
    return null;
};

export default Logout;