import {useContext} from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext';


const Header= () => {
	let {user, authToken, logoutUser} = useContext(AuthContext)
	return(
		<div className="link-menu">
            <Link  to='/'>Home</Link>
            
            { user ? (
            	<Link  to='/login' onClick={logoutUser}>Logout</Link>
            ):(
            	<Link  to='/login'>Login</Link>

            )}
            { user && <h1>Hello {user.username}</h1> }

        </div>
	)
}

export default  Header;