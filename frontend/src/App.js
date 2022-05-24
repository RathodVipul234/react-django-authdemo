import logo from './logo.svg';
import './App.css';

import Home from './components/Home'
import Login from './components/Login'
import Header from './components/Header'
import PrivateRoute from './utils/PrivateRoute'
import {AuthProvider} from './context/AuthContext'

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          
          <AuthProvider>
            <Header />
            <Routes>
              <Route path='/' element={<PrivateRoute><Home /></PrivateRoute>}></Route>
              <Route path='/login' element={<Login />}></Route>
            </Routes>
          </AuthProvider>
         
          
        </Router>
      </header>
    </div>
  );
}

export default App;
