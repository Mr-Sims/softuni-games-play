import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import * as userAuth from '../../services/authService';

const Logout = () => {
    const navigate = useNavigate();
    useEffect(() => {
        userAuth.logout()
            .then(() => {
                navigate('/')
            })
            .catch(() => {
                navigate('/')

            })
    }, []);
    return null;
};

export default Logout;