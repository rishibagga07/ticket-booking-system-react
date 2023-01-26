import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function Header(props) {
  const [useridfromlocalstorage, setuseridfromlocalstorage] = useState({});

  const [getroles , setgetroles] = useState([{}]);

  



  // roleId

  useEffect(() => {
    Role_Id();
    const items = JSON.parse(localStorage.getItem("token-info"));
    setuseridfromlocalstorage(items);
   if (items) {
    setgetroles(items.roleId);
    
   } else {
setgetroles(null);
      
   }
 
  }, []);

  const Role_Id = () => {
    axios.get("https://localhost:44351/api/Roles").then((res)=> {
    
    //setgetroles(res.data);
      

      
      console.log(" 31 header getroles" , getroles)
      console.log(" 32 header res.data" , res.data.id)
    }).catch((e)=>{
      WebApiAlert();
    })
      }

      
  const logout = () => {
    localStorage.removeItem("token-info");
    props.setIsLoggedin(false);
  };


  const WebApiAlert = () => {
    Swal.fire({
      title: "Bad Request",
      text: "wrong with api",
      icon: "warning",
      confirmButtonText: "OK",
    }).then(function () {
      // Redirect the user
      //   window.location.href = "/home";
    });
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">

        
             {getroles === 1? 
              <><><><li className="nav-item">
                <Link to="/home" className="nav-link">
                  
                  Home
                </Link>
              </li><li className="nav-item">
                  <Link to="/user" className="nav-link">
                    Users
                  </Link>
                </li></><li className="nav-item">
                  <Link to="/department" className="nav-link">
                    Department
                  </Link>



                </li>


                <li className="nav-item">
              <Link to="/roles" className="nav-link">
                Roles
              </Link>
            </li>

                </><li className="nav-item">
                  <Link to="/booking" className="nav-link">
                    Booking
                  </Link>
                </li></>

            :  <li className="nav-item">
          <Link to="/home" className="nav-link">
            
            Home
          </Link>
        </li>        }
            

            


            
            {/* <li className="nav-item">
              <Link to="/tickets" className="nav-link">
                Tickets
              </Link>
            </li> */}


            


            

            {/* <li className="nav-item">
              <Link to="/ticketbook" className="nav-link">
                TicketBook
              </Link>
            </li> */}






            
          </ul>
        </div>
        

        {useridfromlocalstorage ? (
          <Link
            to="/login"
            className="btn btn-outline-success m-2 p-2 "
            onClick={logout}
          >
            Logout{" "}
          </Link>
         ) : ( 
          <Link to="/login" className="btn btn-outline-success m-2 p-2 ">
            Login{" "}
          </Link>
         )} 

<Link to="/registration" className="btn btn-outline-success m-2 p-2 ">
            Registration
          </Link>


      </nav>
    </div>
  );
}

export default Header;
