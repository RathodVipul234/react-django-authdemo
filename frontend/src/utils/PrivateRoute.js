import {Route, Redirect, Navigate} from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import {useContext} from 'react';


const PrivateRoute = ({children, ...rest}) => {
	let {user} = useContext(AuthContext)
	// const auth = false;	
	return user ? children : <Navigate to="/login" />;
}

export default PrivateRoute;