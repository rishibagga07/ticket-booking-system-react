import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function Login(props) {

     const [isLoggedin, setIsLoggedin] = useState(false);

  const loginpayload = {
    email: "",
    password: "",
  };

  const [log, setlog] = useState(loginpayload);

  const loginauth = () => {
    debugger;
    console.log("em", log);
    debugger;
    axios
      .post("https://localhost:44351/api/User/login", log)
      .then((res) => {
        console.log("res", res.data);

       // 1 login or logout
        localStorage.setItem('token-info', JSON.stringify(res.data));
    setIsLoggedin(true);
     showAlert();
            
    
      })
      .catch((err) => {
        showErrorAlert();
      });
  };

  const showAlert = () => {
    Swal.fire({
      title: "Success",
      text: "login successful",
      icon: "success",
      confirmButtonText: "OK",
    }).then(function () {
      // Redirect the user
      window.location.href = "/";
      
    });
  };

  const showErrorAlert = () => {
    Swal.fire({
      title: "Bad Request",
      text: "Login Password Or Email Incorrect",
      icon: "error",
      confirmButtonText: "OK",
    }).then(function () {
      // Redirect the user
      //   window.location.href = "/home";
    });
  };

  const changehandle = (event) => {
    const { name, value } = event.target;
    setlog({ ...log, [name]: value });

    console.log("user", log);
    

  };

  // 2 login or logout

  // const logout = (props) => {
  //   localStorage.removeItem('token-info');
  //   setIsLoggedin(false);
    
  // };


  return (
    <div>
      <div id="login">
        <h3 className="text-center text-white pt-5">Login form</h3>
        <div className="container">
          <div
            id="login-row"
            className="row justify-content-center align-items-center"
          >
            
            <div id="login-column" className="col-md-6">
              <div id="login-box" className="col-md-12">
              
                <form
                  id="login-form"
                  className="form"
                 
                  method="post"
                  onSubmit={(event) => {
                    event.preventDefault();
                   
                  }}
                >
                  <h3 className="text-center text-dark">Login</h3>
                  <div className="form-group">
                    <label for="email" className="text-dark">
                      Email Address:
                    </label>
                    <br />
                    <input
                      onChange={changehandle}
                      type="text"
                      name="email"
                      id="username"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label for="password" className="text-dark">
                      Password:
                    </label>
                    <br />
                    <input
                      onChange={changehandle}
                      type="password"
                      name="password"
                      id="password"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    {/* <label for="remember-me" className="text-info"><span>Remember me</span> <span><input id="remember-me" name="remember-me" type="checkbox"/></span></label><br/> */}
                    <input
                      onSubmit={showAlert}
                      type="submit"
                      name="submit"
                      onClick={loginauth}
                      className="btn btn-danger btn-md"
                      value="submit"
                      
                    />
                  </div>
                  <div id="register-link" className="text-right">
                    {/* <a href="#" className="text-info">Register here</a>  */}
                    <Link to="/registration"   className="text-dark">
                      Register here{" "}
                    </Link>
                    {/* <Link  onClick={showAlert} className="text-info">showAlert </Link> */}
                    {/* <Link to="/registration" className="nav-link btn btn-info m-2 p-2 ">Registration</Link> */}
                  </div>
                </form>
              
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
}



export default Login;
