import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './authContext';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Chat from './pages/Chat';
import Navbar from './components/Navbar';

function App() {
  return (
    <AuthProvider>
    <Router>
       <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
         <Route path="/chat/:characterId" element={<Chat />} />
         <Route path="/chat/:characterId/:id" element={<Chat />} />
      </Routes>
    </Router>
   </AuthProvider>
  );
}

export default App;