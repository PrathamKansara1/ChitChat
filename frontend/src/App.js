import React from 'react'
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Chat from "./components/Chat";
import SetAvatar from './components/SetAvatar';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/setAvatar" element={<SetAvatar />} />
        <Route exact path="/" element={<Chat />} />
      </Routes>
    </Router>
  );
}
