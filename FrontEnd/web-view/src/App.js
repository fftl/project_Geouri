import logo from "./logo.svg";
import { Login, FindUser, NotFound404, MemberPage, AddMember } from "./Pages";
import SignUp from "./Pages/SignUp";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import ProfileEdit from "./Components/Home/ProfileEdit";
import Cal from "./Elements/Cal";
import { Provider } from "react-redux";
import Photobook from "./Pages/Photobook";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/find-user" element={<FindUser />} />
        <Route path="/member/add" element={<AddMember />} />
        <Route path="/member/:id" element={<MemberPage />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
      {/* <ProfileEdit /> */}
      {/* <Cal /> */}
      {/* <Photobook /> */}
    </div>
  );
}

export default App;
