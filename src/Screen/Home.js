import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

function Home(props) {
  const [img, setimg] = useState();

  const [ticketgetbyid, setticketgetbyid] = useState({});

  const [AddTicketBooking, SetAddTicketBooking] = useState({});

  const [ticketid, setticketid] = useState({});

  const [userid, setuserid] = useState({});

  const [getlocatstorage, setgetlocatstorageID] = useState();

  const [enteredeBase64, setBase64] = useState();

  const [LocalStorageRoleID, SetLocalStorageRoleID] = useState([]);

  const [AddTickets, setAddtickets] = useState(); // save data

  const [getroles, setgetroles] = useState();

  let base64textString = " ";

  var Local_storage;

  const navigateToBooking = useNavigate();

  const NavigateToBookingPage = (item) => {
    // const history = useHistory()
    // 👇️ navigate to /contacts
    debugger;
    console.log("item", item);

    navigateToBooking("/ticketbook", { state: { item } });
    // navigateToBooking(`/ticketbook?data=${item}`);
    //navigate("/Book",{state:{d}})
    // history.push(`/ticketbook?data=${item}`);
    console.log("item", item);
  };

  useEffect(() => {
    const Data_items = JSON.parse(localStorage.getItem("token-info"));

    if (Data_items) {
      SetLocalStorageRoleID(Data_items.roleId);
    } else {
      SetLocalStorageRoleID(null);
    }

    GetAll();
    Role_Id();

    //  localStorage();
  }, []);

  // const localStorage = () => {

  //   const items = JSON.parse(localStorage.getItem('token-info'));
  //   debugger;
  //   if (items) {
  //     setgetlocatstorage(items);
  //     console.log("getlocatstorage",getlocatstorage);
  //   }

  // }

  const GetAll = () => {
    axios
      .get("https://localhost:44351/api/Tickets")
      .then((res) => {
        debugger;
        setimg(res.data);

        const items = JSON.parse(localStorage.getItem("token-info"));

        const lsobj = items.id;
        console.log(lsobj);
        debugger;
        setgetlocatstorageID(lsobj);
      })
      .catch((error) => {
        // WebApiAlert();
      });
  };

  const Role_Id = () => {
    axios
      .get("https://localhost:44351/api/Roles")
      .then((res) => {
        setgetroles(res.data);
        console.log("getroles", getroles);
        console.log("getroles", res.data);
      })
      .catch((e) => {
        WebApiAlert();
      });
  };

  const SaveTickets = () => {
    debugger;

    console.log("addtickets", AddTickets);
    //console.log("enteredeBase64", enteredeBase64);

    const obj = {
      TicketCount: AddTickets.ticketCount,
      TicketName: AddTickets.ticketName,
      img: enteredeBase64,

      //  Image:'data:image/png;base64,'+base64textString.AddTickets.img
      //  img: enteredeBase64,
    };
    console.log("objimg", obj.img);
    debugger;
    axios
      .post("https://localhost:44351/api/Tickets", obj)
      .then((res) => {
        //SaveAlert();
        GetAll();
      })
      .catch((error) => {
        WebApiAlert();
      });
  };

  const UpdateTicket = () => {
    debugger;

    console.log("edit", ticketgetbyid);
    const obj = {
      id: ticketgetbyid.id,
      TicketCount: ticketgetbyid.ticketCount,
      TicketName: ticketgetbyid.ticketName,
      img: enteredeBase64,
    };

    console.log("editobj", obj);
    axios
      .put("https://localhost:44351/api/Tickets", obj)
      .then((res) => {
        setticketid(res.data);
        console.log("res", res.data);
        // UpdateAlert();
        GetAll();
      })
      .catch((error) => {
        alert("wrong with api");
      });
  };

  const AddBookingTicket = () => {
    debugger;
    setuserid(props.adduser);

    const obj = {
      UserId: getlocatstorage.id,
      TicketID: ticketid.id,
      BookingCount: AddTicketBooking.BookingCount,
    };

    console.log("obj", obj);

    debugger;
    axios
      .post("https://localhost:44351/api/Booking", obj)
      .then((res) => {
        console.log("res", res.data);

        GetAll();
      })

      .catch((error) => {
        WebApiAlert();
      });

    navigateToBooking("/booking");
  };

  //  Book Ticket Modal
  const GetDataOnModal = (imgdata) => {
    setticketgetbyid(imgdata);

    const obj = {
      id: imgdata.id,
    };

    setticketid(obj);
    console.log("setticketid", ticketid);
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

  function rendertickets() {
    let ticketsrow = [];
    img?.map((item) =>
      ticketsrow.push(
        <tr>
          <td className="m-5 p-5">{item.ticketName}</td>

          <td className="m-5 p-5">{item.pendingTicket}</td>

          <td>
            <button
              className="btn btn-danger m-5 "
              data-toggle="modal"
              data-target="#bookingModal"
              //onClick={() => GetDataOnModal(item)}
              onClick={() => NavigateToBookingPage(item)}
            >
              Book Show
            </button>
            {/* // onClick={NavigateToBookingPage} */}
          </td>

          {LocalStorageRoleID != null && LocalStorageRoleID === 1 ? (
            <td>
              <button
                className="btn btn-info m-5 "
                data-toggle="modal"
                data-target="#editModal"
                onClick={() => GetDataOnModal(item)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger m-5 "
                onClick={() => deleteClick(item.id)}
              >
                Delete
              </button>
            </td>
          ) : null}

          <td>
            {" "}
            <img
              className="m-5 "
              src={`data:image/jpg;base64,${item.img}`}
              style={{ objectFit: "cover", width: "30%", height: "auto" }}
              height="50"
              width="70"
            />{" "}
          </td>
        </tr>
      )
    );

    return ticketsrow;
  }

  const AddChangeHandler = (event) => {
    const { name, value } = event.target;
    SetAddTicketBooking({ ...AddTicketBooking, [name]: value });
  };

  const changehandle = (event) => {
    setAddtickets({
      ...AddTickets,
      [event.target.name]: event.target.value,
    });
  };

  const editchangeHandler = (event) => {
    setticketgetbyid({
      ...ticketgetbyid,
      [event.target.name]: event.target.value,
    });
  };

  function deleteClick(id) {
    debugger;
    axios
      .delete("https://localhost:44351/api/Tickets/" + id)
      .then((del) => {
        // console.log("del", del.data);
        //DeleteAlert();

        GetAll();
      })
      .catch((error) => {
        alert("something went wrong. Plz try again.");
      });
  }

  // localstorage for object details

  const localstorageObj = (id) => {
    localStorage.setItem("obj-info", JSON.stringify(id));
  };

  const handleFileSelect = (evt) => {
    debugger;

    var files = evt.target.files;
    var file = files[0];

    if (files && file) {
      var reader = new FileReader();

      reader.onload = _handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
    }
  };

  const _handleReaderLoaded = (readerEvt) => {
    debugger;
    var binaryString = readerEvt.target.result;
    base64textString = btoa(binaryString);
    // var text='data:image/png;base64,';
    setBase64(base64textString);

    console.log("base64textString", base64textString);
    // var pic = text+base64textString;
    // saveClick.values.image=pic;
    // console.log(pic);
  };

  // const EditChangeHandler = (event) =>  {
  //   const {name , value } = event.target;
  //   setticketgetbyid({...ticketgetbyid, [name]:value});
  // }

  return (
    <div>
      <div className="row">
        <div align="right">
          <div className="col-4">
            {LocalStorageRoleID === 1 && LocalStorageRoleID != null ? (
              <button
                className="btn btn-danger form-control "
                data-toggle="modal"
                data-target="#newModal"
              >
                Add New Ticket
              </button>
            ) : null}
          </div>
        </div>
      </div>
      <div className="p-2 m-2">
        <table className="table table-bordered ">
          <thead>
            <tr>
              <th style={{ width: "10%" }}>Movie Name</th>

              <th style={{ width: "10%" }}>Tickets Count </th>
              <th style={{ width: "10%" }}>Book Now </th>
              {LocalStorageRoleID === 1 ? (
                <th style={{ width: "30%" }}>Action </th>
              ) : null}
              <th style={{ width: "40%" }}>Movie Poster</th>
            </tr>
          </thead>
          <tbody> {rendertickets()}</tbody>
        </table>
      </div>

      {/* modal */}

      <div>
        <form>
          <div className="modal" id="bookingModal" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                {/* header */}
                <div className="modal-header">
                  <div className="modal-title">
                    <h2 className=" text-bold "> Book Your Ticket </h2>

                    {/* Body */}
                    <div className="modal-body">
                      <table className="table table-bordered ">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Picture</th>
                            <th>Count</th>
                            <th>Booking Count</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{ticketgetbyid.ticketName}</td>

                            <td>
                              {" "}
                              <img
                                src={`data:image/jpg;base64, ${ticketgetbyid.img} `}
                                height="100"
                                width="100"
                              />{" "}
                            </td>
                            <td>{ticketgetbyid.ticketCount}</td>

                            <td>
                              <input
                                type="text"
                                name="BookingCount"
                                placeholder="Enter Tickets"
                                onChange={AddChangeHandler}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <button
                        className="btn btn-info form-control "
                        // onClick={AddBookingTicket}
                        onClick={localstorageObj}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
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
                      onChange={editchangeHandler}
                      value={ticketgetbyid.ticketName}
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
                      onChange={editchangeHandler}
                      value={ticketgetbyid.ticketCount}
                    ></input>
                  </div>
                </div>

                <div className="form-group row">
                  <label for="ticketimg" className="col-sm-4">
                    Poster
                  </label>

                  <div className="col-sm-8">
                    {" "}
                    <img
                      src={`data:image/jpg;base64, ${ticketgetbyid.img} `}
                      height="100"
                      width="100"
                    />
                    <input
                      accept=".jpg, .jpeg, .png"
                      type="file"
                      //value={ticketgetbyid.img}
                      id="ticketimg"
                      // placeholder="Enter Ticket"
                      name="img"
                      className="form-control"
                      // value={ticketgetbyid.img}
                      onChange={handleFileSelect}
                      //
                    ></input>
                  </div>
                </div>

                {/* footer */}

                <div className="modal-footer">
                  <button className="btn btn-primary" onClick={UpdateTicket}>
                    Update
                  </button>
                  <button className="btn btn-danger">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* Save */} 
    <form>    
        <div className="modal" id="newModal" role="dialog">
        <div className="modal-dialog">
            <div className="modal-content">
              {/* Header */}
              <div className="modal-header">
                <div className="modal-title"> Add New Tickets</div>
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
                      onChange={changehandle}
                      // value={AddTickets.ticketName}
                    ></input>
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
                      placeholder="Enter Ticket"
                      name="ticketCount"
                      className="form-control"
                      onChange={changehandle}
                      //  value={AddTickets.ticketCount}
                    ></input>
                  </div>
                </div>

                <div className="form-group row">
                  <label for="textticketscount" className="col-sm-4">
                    Image
                  </label>

                  <div className="col-sm-8">
                    <input
                      accept=".jpg, .jpeg, .png"
                      type="file"
                      id="textticketscount"
                      placeholder="Enter Ticket"
                      name="img"
                      className="form-control"
                      onChange={handleFileSelect}
                      //  value={AddTickets.ticketCount}
                    ></input>
                  </div>
                </div>

                {/* footer */}

                <div className="modal-footer">
                  <button className="btn btn-primary" onClick={SaveTickets}>
                    Save
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

export default Home;
