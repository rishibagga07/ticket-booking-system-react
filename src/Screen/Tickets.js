import axios from "axios";
import React, { useEffect, useState } from "react";
// import 'https://fonts.googleapis.com/css?family=Roboto';
import Swal from "sweetalert2";

function Tickets() {
  const [tickets, settickets] = useState(); // getall

  const [AddTickets, setAddtickets] = useState(); // save data

  const [editticket, seteditticket] = useState({}); // update
  const [enteredeBase64, setBase64] = useState("");

  let base64textString = " ";




  useEffect(() => {
    GetAll();
  }, []);

  const GetAll = () => {
    debugger;
    axios
      .get("https://localhost:44351/api/Tickets")
      .then((response) => {
        settickets(response.data);
      })
      .catch((error) => {
        alert("Something Wrong with api");
      });
  };

  function rendertickets() {
    let ticketsrow = [];
    tickets?.map((item) =>
      ticketsrow.push(
        <tr>
          <td>{item.ticketName}</td>
          <td>{item.ticketCount}</td>

          <td>
            <button
              className="btn btn-info p-2 m-1 "
              data-toggle="modal"
              data-target="#editModal"
              onClick={() => editclick(item)}
            >
              Edit
            </button>
            <button
              onClick={() => deleteClick(item.id)}
              className="btn btn-danger p-2 m-1 "
            >
              Delete
            </button>
          </td>
        </tr>
      )
    );
    return ticketsrow;
  }

  // const handleFileSelect = (event) => {
  //   debugger;
  //   const file = event.target.files[0];
  //   const reader = new FileReader();

  //   reader.onloadend = () => {
  //     const base64data = reader.result;
  //     setBase64(base64data);
  //     // do something with the base64-encoded data
  //     console.log("base64data", base64data);

  //   };

  //   reader.readAsDataURL(file);
  //   console.log("file", file);
  // };

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
    axios.post("https://localhost:44351/api/Tickets", obj).then((res) => {
      SaveAlert();
      GetAll();
    });
    (0).catch((error) => {
      alert("wrong with api");
    });
  };

  function editclick(data) {
    seteditticket(data);
  }

  const UpdateTicket = () => {
    axios
      .put("https://localhost:44351/api/Tickets", editticket)
      .then((res) => {
        seteditticket(res.data);
        UpdateAlert();
        GetAll();
      })
      .catch((error) => {
        alert("wrong with api");
      });
  };

  function deleteClick(id) {
    //debugger
    axios
      .delete("https://localhost:44351/api/Tickets/" + id)
      .then((del) => {
        // console.log("del", del.data);
        DeleteAlert();
        GetAll();
      })
      .catch((error) => {
        alert("something went wrong. Plz try again.");
      });
  }

  const changehandle = (event) => {
    setAddtickets({
      ...AddTickets,
      [event.target.name]: event.target.value,
    });
  };

  const changeHandler = (event) => {
    seteditticket({
      ...editticket,
      [event.target.name]: event.target.value,
    });
  };

  // base64

  // Sweet Alert

  const SaveAlert = () => {
    Swal.fire({
      title: "success",
      text: "Data Saved Successfuly",
      icon: "success",
      confirmButtonText: "OK",
    }).then(function () {
      // Redirect the user
      //   window.location.href = "/home";
    });
  };

  const UpdateAlert = () => {
    Swal.fire({
      title: "success",
      text: "Data Update Successfuly",
      icon: "success",
      confirmButtonText: "OK",
    }).then(function () {
      // Redirect the user
      //   window.location.href = "/home";
    });
  };

  const DeleteAlert = () => {
    Swal.fire({
      title: "success",
      text: "Delete Successfull",
      icon: "success",
      confirmButtonText: "OK",
    }).then(function () {
      // Redirect the user
      //   window.location.href = "/home";
    });
  };

  return (
    <div>
      <div>
        <h2 className="text-dark">Tickets List </h2>
        <div align="right">
          <div className="col-3 ">
            <button
              data-toggle="modal"
              data-target="#newModal"
              className="btn btn-danger form-control "
            >
              Add New Tickets
            </button>
          </div>
        </div>

        <div className="p-2 m-2">
          <table className="table table-bordered ">
            <thead>
              <tr>
                <th>Movie Name</th>
                <th>Available Tickets</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody> {rendertickets()}</tbody>
          </table>
        </div>
      </div>

      {/* Save */}
      <form>
        <div className="modal" id="newModal" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              {/* Header */}
              <div className="modal-header">
                <div className="model-title"> Add New Tickets</div>
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

      {/* Edit */}
      <form>
        <div className="modal" id="editModal" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              {/* Header */}
              <div className="modal-header">
                <div className="model-title">Edit New Tickets</div>
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
                      onChange={changeHandler}
                      value={editticket.ticketName}
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
                      onChange={changeHandler}
                      value={editticket.ticketCount}
                    ></input>
                  </div>
                </div>

                {/* footer */}

                <div className="modal-footer">
                  <button className="btn btn-primary" onClick={UpdateTicket}>
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

export default Tickets;
