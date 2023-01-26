import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";
import { useFormik } from "formik";



function TicketBook() {
  const [getdatafromlocalstorage, setsave] = useState();

  const [getbookingcloumn, setgetbookingcloumn] = useState();
  const [test , settest] = useState();


  const location = useLocation();
  console.log("location", location.state.item);
  

  // yup validation

  const validationSchema = yup.object().shape({
    bookingCount: yup
      .number()
      .min(1)
      .max(location.state.item.pendingTicket)
      .required("Booking Count Must Be Required"),
  });
  debugger;

  const initValues = {
    bookingCount: getbookingcloumn,
  };

  
  debugger;


  const { values, errors, handleBlur, touched, handleSubmit, handleChange } =
  // setgetbookingcloumn( values.bookingCount);
 
    useFormik({
      initialValues: initValues,
      validationSchema: validationSchema,

      onSubmit: (values) => {

        
      },

    });
    // setgetbookingcloumn(values.bookingCount);
    
    

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("token-info"));
debugger
    
    setsave(items);
        debugger;
    console.log("getdatafromlocalstorage", getdatafromlocalstorage);
    console.log("test", test);
  }, []);

  const navi = useNavigate();

  const Navigate = () => {
    navi("/home");
  };

  // taking obj from state

  const AddBookingTicket = (id) => {
    const obj = {
      TicketID: location.state.item.id,
      UserId: getdatafromlocalstorage.id,

      BookingCount: values.bookingCount,

    };

    if (obj.BookingCount == null) {
      NullAlert();
    }
    else 
    

    axios
      .post("https://localhost:44351/api/Booking", obj)
      .then((res) => {
        SaveAlert();
        navi("/home");
      })

      .catch((error) => {
        WebApiAlert();
      });
  };

  const changehandler = (event) => {
    debugger;
    const { name, value } = event.target;
    setgetbookingcloumn(value);

  };

  console.log("BookingCount", getbookingcloumn);
  // if (getbookingcloumn > 89) {
  //   alert("Ticket Sold Out");
  // }
  // else

  const SaveAlert = () => {
    Swal.fire({
      title: "success",
      text: "Ticket Booked Successfuly",
      icon: "success",
      confirmButtonText: "OK",
    }).then(function () {
      
      // Redirect the user
      //   window.location.href = "/home";
    });
  };


  const WebApiAlert = () => {
    Swal.fire({
      title: "Bad Request",
      text: "wrong with api",
      icon: "error",
      confirmButtonText: "OK",
    }).then(function () {
      // Redirect the user
      //   window.location.href = "/home";
    });
  };


  const NullAlert = () => {
    Swal.fire({
      title: "Bad Request",
      text: "Null Not Allowed",
      icon: "warning",
      confirmButtonText: "OK",
    }).then(function () {
      // Redirect the user
      //   window.location.href = "/home";
    });
  };


  // const UpdateAlert = () => {
  //   Swal.fire({
  //     title: "success",
  //     text: "Data Update Successfuly",
  //     icon: "success",
  //     confirmButtonText: "OK",
  //   }).then(function () {
  //     // Redirect the user
  //     //   window.location.href = "/home";
  //   });
  // };

  // const DeleteAlert = () => {
  //   Swal.fire({
  //     title: "success",
  //     text: "Delete Successfull",
  //     icon: "success",
  //     confirmButtonText: "OK",
  //   }).then(function () {
  //     // Redirect the user
  //     //   window.location.href = "/home";
  //   });
  // };

  return (
    <div>
      <form onSubmit={handleSubmit} >
        <div className="">
          <h2 className="">Book Your Ticket </h2>
        </div>

        <div className="row m-2 p-3">
          <div className="col-12 ">
            <table className="table table-bordered ">
              <thead>
                <tr>
                  <th style={{ width: "18%" }}>Movie Name</th>
                  <th style={{ width: "18%" }}>Available Tickets</th>
                  <th style={{ width: "18%" }}>Booking Count</th>
                  <th style={{ width: "46%" }}>Poster</th>
                </tr>
              </thead>
              <tbody>
                <td>{location.state.item.ticketName}</td>
                <td>{location.state.item.pendingTicket}</td>

                {/* <td>{location.state.item.ticketCount}</td> */}
                <td>
                  <div>
                    <input
                      type="number"
                      name="bookingCount"
                    //  onChange={changehandler}
                      onBlur={handleBlur}
                     
                        onChange={handleChange}
                       value={values.bookingCount}
                    ></input>
                    {errors.bookingCount && touched.bookingCount ? (
                      <p className="form-error">{errors.bookingCount}</p>
                    ) : null}
                  </div>
                </td>

                <td>
                  {" "}
                  <img
                    className="m-5 "
                    src={`data:image/jpg;base64,${location.state.item.img}`}
                    style={{ objectFit: "cover", width: "30%", height: "auto" }}
                    height="50"
                    width="70"  
                  />{" "}
                </td>
              </tbody>
            </table>
            <div className="row">
              <div className="col-6">
                <button
                  className="btn btn-danger form-control "
                  onClick={Navigate}
                >
                  Cancel
                </button>
              </div>
              { values.bookingCount > location.state.item.pendingTicket ||
              values.bookingCount < 1 ||
              values.bookingCount === 0 || values.bookingCount === null  ? (
                <div className="col-6">
                  <button className="btn btn-success form-control " disabled>
                    Submit
                  </button>
                </div>
              ) : (
                <div className="col-6">
                  <button
                    className="btn btn-success form-control "
                   
                    onClick={AddBookingTicket}
                    type="submit"
                   
                  >
                    Submit
                  </button>
                  
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default TicketBook;
