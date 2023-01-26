import "./App.css";
import Home from "./Screen/Home";
import User from "./Screen/User";
import Roles from "./Screen/Roles";
import Tickets from "./Screen/Tickets";
import Department from "./Screen/Department";
import Header from "./Screen/Header";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import Booking from "./Screen/Booking";
import Registration from "./Screen/Registration";
import Login from "./Screen/Login";
import Password from "./Screen/Password";
import Confirmpassword from "./Screen/Confirmpassword";
import Setpasswordlink from "./Screen/Setpasswordlink";
import TicketBook from "./Screen/TicketBook";
import Dumy from "./Screen/Dumy";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Dumy />
        <Header />
        <Routes>
          <Route>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/user" element={<User />} />
            <Route path="/roles" element={<Roles />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/department" element={<Department />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/password/:id" element={<Password />} />
            <Route path="/Confirmpassword/:id" element={<Confirmpassword />} />
            <Route path="/setpasswordlink" element={<Setpasswordlink />} />
            <Route path="/ticketbook" element={<TicketBook />} />
            <Route path="/dumy" element={<Dumy />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
