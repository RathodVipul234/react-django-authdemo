import React, { Component, useState, useContext, useEffect } from 'react';
import AuthContext from '../context/AuthContext';


const Home = () => {
	let {authToken} = useContext(AuthContext)

	let [news, setNews] = useState([])
	let [test, setTest] = useState()
	let getNews = async()=>{

		let response = await fetch("http://127.0.0.1:8000/api/news/all/", {
			method:"GET",
			// mode: 'no-cors',
			headers:{
				'Content-Type': 'application/json',
				// "Access-Control-Allow-Origin" : "*", 
				// "Access-Control-Allow-Credentials" : true,
				'Authorization' : 'Bearer '+ String(authToken.access),

			}
		})
		// debugger
		let data = await response.json()
		setNews(data)
        return 0
	}
	useEffect(()=>{
		// console.log(news)
        getNews()

	}, [])
    console.log("===", news)

	// news.map(name => <h2 key={name.id}>{name}</h2>)
	   
	return <div>
		<h2>This Is Home Page</h2>
		<h1>This is Demo project for Authentication with JWT token</h1>
		<h1>List Of All News Here--</h1>
        
		    { news ?
                <table class="table table-striped table-dark">
                    <thead>
                        <tr>
                          <th scope="col">ID</th>
                          <th scope="col">Title</th>
                          <th scope="col">Body</th>
                          <th scope="col">Created</th>
                        </tr>
                        </thead>
                        <tbody>
                        {news.map(item =>
                            <tr>
                               <th scope="row">{item.id}</th>
                               <td>{item.title}</td>
                               <td>{item.body}</td>
                               <td>{item.created_at}</td>
                            </tr>
                        )}
                        
                    </tbody>
                </table>:

		    	<h1>No TOday news</h1>
		    }
				
	</div>;
}

export default Home;