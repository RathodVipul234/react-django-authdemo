import { createContext, useState, Navigate, useEffect } from 'react'
import jwt_decode from "jwt-decode";
import {useNavigate} from 'react-router-dom';

const AuthContext = createContext()

export default AuthContext;


export const AuthProvider = ({children}) => {
	let [authToken, setAuthToken] = useState(() => localStorage.getItem("AuthToken") ? JSON.parse(localStorage.getItem("AuthToken")):null)
	let [user, setUser] = useState(() => localStorage.getItem("AuthToken") ? jwt_decode(JSON.parse(localStorage.getItem("AuthToken")).access):null)
	let [loading, setLoding] = useState(true)

	let navigate = useNavigate()
	let loginUser = async(e)=>{
		e.preventDefault();
		let response = await fetch("http://127.0.0.1:8000/api/token/",{
			method:"POST",
			headers:{
				"Content-Type":"application/json"
			},
			body:JSON.stringify({"username":e.target.username.value, "password":e.target.password.value})
		})

		let data = await response.json();
		if (response.status === 200){
			var access_token = data.access
			var user = jwt_decode(access_token);
			setAuthToken(data)
			setUser(user)
			localStorage.setItem("AuthToken", JSON.stringify(data))
			localStorage.setItem("User", JSON.stringify(user))
			// history.push("/")
			navigate({ pathname: '/' }) 

		}else{
			alert("Something went wrong!")
		}
	}


	let logoutUser = async(e) =>{
		setAuthToken(null)
		setUser(null)
		localStorage.removeItem("AuthToken")
		localStorage.removeItem("User")

	}

	let updateToken = async()=>{
		let response = await fetch("http://127.0.0.1:8000/api/token/refresh/",{
			method:"POST",
			headers:{
				"Content-Type":"application/json"
			},
			body:JSON.stringify({"refresh" : authToken.refresh})
		})

		let data = await response.json();
		if (response.status === 200){
			var access_token = data.access
			var user = jwt_decode(access_token);
			setAuthToken(data)
			setUser(user)
			localStorage.setItem("AuthToken", JSON.stringify(data))
			localStorage.setItem("User", JSON.stringify(user))
			// history.push("/")
			// navigate({ pathname: '/' }) 

		}else{
			logoutUser()
		}
	}

	
	let contextData = {
		loginUser:loginUser,
		logoutUser:logoutUser,
		user:user,
		authToken:authToken
	}

	useEffect(()=>{
		let interval = setInterval(()=>{
			if(authToken){
				updateToken()
			}
		}, 50000)
		return ()=> clearInterval(interval)

	}, [authToken, loading])

	return(
		<AuthContext.Provider value={contextData}>
			{children}
		</AuthContext.Provider>
	)
}