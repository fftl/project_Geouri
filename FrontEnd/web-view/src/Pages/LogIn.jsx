import React, { useEffect }  from "react";
import { useNavigate } from "react-router-dom";
import { LoginHeader, LoginBody, LoginFooter } from "../Components";

function Login(){
  const navigate = useNavigate();
  const is_login = sessionStorage.getItem('jwt');

  useEffect(() => {
    if (is_login) {
      navigate('/');
    }
  }, []);

  return (
      <div className="container">
        <LoginHeader />
        <LoginBody />
        <LoginFooter/>
      </div>
  )
}

export default Login;