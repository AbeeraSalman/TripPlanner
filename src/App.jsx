// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar/Navbar'

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
    </div>
  );
}