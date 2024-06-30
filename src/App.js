import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Results from './result'; // Correct path and filename
import UserDetails from './UserDetail'; // Correct path and filename
import axios from 'axios';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState('');

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/item?keyword=${query}`);
      if (Array.isArray(response.data.data)) {
        setUsers(response.data.data);
      } else {
        console.error('Unexpected response format:', response.data.data);
        setUsers([]);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setUsers([]);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Approval System</h1>
          <div className="Search">
            <input
              type="text"
              placeholder="Masukan NIK atau Nama"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={fetchUsers}>Search</button>
          </div>
        </header>
        <Routes>
          <Route path="/" element={<Results results={users} />} />
          <Route path="/user/:id" element={<UserDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
