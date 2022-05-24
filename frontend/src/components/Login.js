import React, { Component, useContext,useState, useEffect } from 'react';
import AuthContext from '../context/AuthContext';




export const Login = ({children}) => {
	let {loginUser} = useContext(AuthContext)
	let [username, setUsername] = useState(null)
	let [password, setPassword] = useState(null)
	return(
		<div>
			<h1>Login Form</h1>
			<form onSubmit={loginUser}>
				<div className="form-group row m-2">
				   <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Username</label>
				   <div className="col-sm-10">
				      <input type="text" name="username" className="form-control w-50" id="Username" placeholder="Password" />
				   </div>
				</div>

				<div className="form-group row m-2">
				   <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
				   <div className="col-sm-10">
				      <input type="password" name="password" className="form-control w-50" id="inputPassword" placeholder="Password" />
				   </div>
				</div>

				<button type="submit" className="btn btn-primary">Submit</button>
			</form>
		</div>
	)
}

export default Login;