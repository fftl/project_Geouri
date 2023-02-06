import logo from "./logo.svg";
import { Login, FindUser, NotFound404, MemberPage, AddMember } from "./Pages";
import SignUp from "./Pages/SignUp";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import ProfileEdit from "./Components/Home/ProfileEdit";
import Cal from "./Elements/Cal";
import { Provider } from "react-redux";
import { store } from "./Redux/modules/store";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {/* <Provider store={store}>
          <Route path="/signup" element={<SignUp />} />
        </Provider> */}
        <Route path="/find-user" element={<FindUser />} />
        <Route path="/member/add" element={<AddMember />} />
        <Route path="/member/:id" element={<MemberPage />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
      {/* <ProfileEdit /> */}
      {/* <Cal /> */}
    </div>
  );
}

export default App;
