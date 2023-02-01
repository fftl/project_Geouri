<<<<<<< HEAD
import logo from './logo.svg';
import { Login, FindUser, NotFound404, MemberPage, AddMember } from './Pages';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';

function App() {
  return (
      <div className="App">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/login" element={<Login />}/>    
          {/* <Route path="/signup" element={}/>     */}
          <Route path="/find-user" element={<FindUser />}/>
          <Route path="/member/add" element={<AddMember/>} />
          <Route path="/member/:id" element={<MemberPage />}/>
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </div>
=======
import logo from "./logo.svg";
import { Login, FindUser, NotFound404 } from "./Pages";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./Pages/SignUp";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/find-user" element={<FindUser />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </div>
>>>>>>> feature/fe-signup
  );
}

export default App;
