import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Booking() {
  const [bookedticket, setbookedticket] = useState();

  const [editbookingorder, seteditbookingorder] = useState();

  const NavigateToNewBooking = useNavigate();

  const navigate = () => {
    NavigateToNewBooking("/home")
  }

  useEffect(() => {
    GetAll();
  }, []);

  const GetAll = () => {
    axios
      .get("https://localhost:44351/api/Booking")
      .then((res) => {
        console.log("res", res.data);
        setbookedticket(res.data);
      })
      .catch((error) => {
        WebApiAlert();
      });
  };

  const editTicketOrder = (editorder) => {
    seteditbookingorder(editorder);
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

  // const GetAll = () => {

  //   debugger;
  //   axios
  //     .get("https://localhost:44351/api/Booking")
  //     .then((response) => {
  //       setbookedticket(response.data);
  //       console.log("response.data", response.data);

  //       console.log("bookedticket" , bookedticket);
  //     })
  //     .catch((error) => {
  //       alert("Something Wrong with api");
  //     });

  //     console.log("bookedticket" , bookedticket);
  // };

  function rendertickets() {
    let ticketsrow = [];
    bookedticket?.map((item) =>
      ticketsrow.push(
        <tr>
          <td className="m-5 p-5">{item.userName}</td>

          <td>
            {" "}
            <img
              className="col-4"
              src={`data:image/jpg;base64,${item.img}`}
              style={{ objectFit: "cover", width: "auto", height: "auto" }}
              //height="50"
              //width="70"
            />{" "}
          </td>
          <td className="m-5 p-5">{item.ticketName}</td>

          <td className="m-5 p-5">{item.bookingCount}</td>

          <td>
            <button
              className="btn btn-info text-dark m-5 "
              // data-toggle="modal"
              // data-target="#bookingModal"
              //   onClick={() => GetDataOnModal(item)}
              onClick={navigate}
            >
              Book New Show
            </button>
            {/* // onClick={NavigateToBookingPage} */}
          </td>

          {/* <td>
            <button
              className="btn btn-info m-5 "
              data-toggle="modal"
              data-target="#editModal"
              onClick={() => editTicketOrder(item)}
            >
              Edit
            </button>
          </td> */}
        </tr>
      )
    );

    return ticketsrow;
  }

  return (
    <div>
      <div>
        <h2 className="text-dark">Show List </h2>

        <div className="p-2 m-2">
          <table className="table table-bordered ">
            <thead>
              <tr>
                <th>Movie Name</th>
                <th >Movie Poster</th>
                <th >Show Name </th>
                <th >Tickets Count </th>
                <th >Book Now </th>
                {/* <th >Actions</th> */}
              </tr>
            </thead>
            <tbody> {rendertickets()} </tbody>
          </table>
        </div>
      </div>

      {/*EDIT*/}

      <form>
        <div className="modal" id="editModal" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              {/* Header */}
              <div className="modal-header">
                <div className="model-title">Edit Tickets</div>
                <button className="close" data-dismiss="modal">
                  <span>&times;</span>
                </button>
              </div>

              {/* Body */}

              <div className="modal-body">
                <div className="form-group row">
                  <label for="textname" className="col-sm-4">
                    Ticket Name
                  </label>

                  <div className="col-sm-8">
                    <input
                      type="text"
                      id="textname"
                      placeholder="Enter Ticket Name"
                      name="ticketName"
                      className="form-control"
                    //  onChange={editchangeHandler}
                  //    value={editbookingorder.ticketName}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label for="textticketscount" className="col-sm-4">
                    Ticket Count
                  </label>

                  <div className="col-sm-8">
                    <input
                      type="number"
                      id="textticketscount"
                      placeholder="Enter Tickets"
                      name="ticketCount"
                      className="form-control"
                //      onChange={editchangeHandler}
              //        value={ticketgetbyid.ticketCount}
                    ></input>
                  </div>
                </div>

                <div className="form-group row">
                  <label for="textticketscount" className="col-sm-4">
                    Poster
                  </label>

                  <div className="col-sm-8">
                    {" "}
                    <img
       //               src={`data:image/jpg;base64, ${ticketgetbyid.img} `}
                      height="100"
                      width="100"
                    />{" "}
                    <input
                      accept=".jpg, .jpeg, .png"
                      type="file"
                      id="textticketscount"
                      placeholder="Enter Ticket"
                      name="img"
                      className="form-control"
     //                 onChange={handleFileSelect}
                      //  value={ticketgetbyid.img}
                    ></input>
                  </div>
                </div>

                {/* footer */}

                <div className="modal-footer">
                  <button className="btn btn-primary" >
                    Update
                  </button>
                  <button className="btn btn-danger">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Booking;
