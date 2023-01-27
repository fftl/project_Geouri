import logo from './logo.svg';
import { Login, FindUser, NotFound404 } from './Pages';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />}/>    
          {/* <Route path="/signup" element={}/>     */}
          <Route path="/find-user" element={<FindUser />}/>
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </div>
  );
}

export default App;
