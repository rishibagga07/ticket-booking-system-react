import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";


function User(props) {
  const [user, setuser] = useState(); // get all

  const [adduser, setadduser] = useState({}); // add user

  const [dropdownlist, setdropdownlist] = useState([]); // departmnet dropdown list

  const [roledropdownlist, setroledropdownlist] = useState([]); // role dropdownlist

  const updateobj = {

    id: Number,
    name : "",
    adduser : "",
    email :"",
    departmentId: Number,
    roleId: Number,
  }

  const [update , setupdate] = useState(updateobj);

  const GetRoleAll = () => {
    debugger;
    axios
      .get("https://localhost:44351/api/Roles")
      .then((res) => {
        setroledropdownlist(res.data);
        console.log(res.data);
      })
      .catch((d) => {
        alert("No Data Found");
      });
  };

  const GetAllDep = () => {
    debugger;
    axios
      .get("https://localhost:44351/api/Department")
      .then((res) => {
        setdropdownlist(res.data);
        console.log(res.data);
      })
      .catch((d) => {
        alert("No Data Found");
      });
  };

  useEffect(() => {
    GetRoleAll();
    GetAll();
    GetAllDep();
  }, []);

  const GetAll = () => {
    axios
      .get("https://localhost:44351/api/User")
      .then((res) => {
        setuser(res.data);
        debugger;

        console.log(res.data);
      })
      .catch((d) => {
        alert("No Data Found");
      });
  };

  const SaveUser = () => {
    debugger;

    axios
      .post("https://localhost:44351/api/User", adduser)
      .then((res) => {
        console.log(res.data);
        SaveAlert();
        GetAll();
      })
      .catch((error) => {
        alert("Worng With Api");
      });
  };

  const changehandle = (event) => {
    setadduser({ ...adduser, [event.target.name]: event.target.value });
    console.log(adduser);
  };

  const editchangehandle = (event) => {
    setupdate({ ...update, [event.target.name]: event.target.value });
    console.log(update);
  };

  const edituser = (event) => {
    setupdate(event);
  };

  const UpdateUser = () => {
    debugger;

    const obj = {
      id: update.id,
      name: update.name,
      address: update.address,
      email: update.email,
     // departName: adduser.departName,
      departmentId: update.departmentId,
      roleId: update.roleId,
      //roleName: adduser.roleName,
    };
    console.log("up", update);
    console.log("obj", obj);

    axios
      .put("https://localhost:44351/api/User", obj)
      .then((res) => {
        UpdateAlert();
        GetAll();
      })
      .catch((error) => {
        alert("wrong with api");
      });
  };

  const DeleteUser = (id) => {
    axios
      .delete("https://localhost:44351/api/User/" + id)
      .then((res) => {
        DeleteAlert();
        GetAll();
      })
      .catch((error) => {
        alert("Wrong With API");
      });
  };

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

  function renderusergetall() {
    let DepartmentRow = [];
    user?.map((item) =>
      DepartmentRow.push(
        <tr>
          <td>{item.name}</td>
          <td>{item.address}</td>
          <td>{item.email}</td>
          <td>{item.registrationDate}</td>
          <td>{item.expireDate}</td>
          <td>{item.roleName}</td>
          <td>{item.departName}</td>

          <td>
            <button
              className="btn btn-info p-2 m-1 "
              data-toggle="modal"
              data-target="#editModal"
              onClick={() => edituser(item)}
            >
              Edit
            </button>
            <button
              className="btn btn-danger p-2 m-1 "
              onClick={() => DeleteUser(item.id)}
            >
              Delete
            </button>
          </td>
        </tr>
      )
    );
    return DepartmentRow;
  }

  return (
    <div>
      <div>
        <h2 className="main-header">User List</h2>
      </div>
      <div align="right">
        <div className="col-3">
          <button
            className="btn btn-danger p-2 m-2 form-control  "
            data-toggle="modal"
            data-target="#newModal"
          >
            Registration
          </button>
        </div>
      </div>

      <div className="row">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Email</th>
              <th>RegistrationDate</th>
              <th>ExpireDate</th>
              <th>RoleId</th>
              <th>DepId</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{renderusergetall()}</tbody>
        </table>
      </div>

      {/* Save */}
      <form>
        <div className="modal" id="newModal" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              {/* Header */}
              <div className="modal-header">
                <div className="model-title"> New User</div>
                <button className="close" data-dismiss="modal">
                  <span>&times;</span>
                </button>
              </div>

              {/* Body */}

              <div className="modal-body">
                <div className="form-group row">
                  <label for="textname" className="col-sm-4">
                    Name
                  </label>

                  <div className="col-sm-8">
                    <input
                      type="text"
                      id="textname"
                      placeholder="Enter Name"
                      name="name"
                      className="form-control"
                      onChange={changehandle}
                      // value={addep.departmentName}
                    ></input>
                  </div>
                </div>

                <div className="form-group row">
                  <label for="textaddress" className="col-sm-4">
                    Address
                  </label>

                  <div className="col-sm-8">
                    <input
                      type="text"
                      id="textaddress"
                      placeholder="Enter Address"
                      name="address"
                      className="form-control"
                      onChange={changehandle}
                      // value={addep.departmentName}
                    ></input>
                  </div>
                </div>

                <div className="form-group row">
                  <label for="textEmail" className="col-sm-4">
                    Email
                  </label>

                  <div className="col-sm-8">
                    <input
                      type="text"
                      id="textEmail"
                      placeholder="Enter Email Address"
                      name="email"
                      className="form-control"
                      onChange={changehandle}
                      // value={addep.departmentName}
                    ></input>
                  </div>
                </div>

                <div className="form-group row">
                  <label for="textDepId" className="col-sm-4">
                    Department
                  </label>

                  <div className="col-sm-8">
                    <select
                      id="textDepId"
                      //placeholder="Enter DepId"
                      name="departmentId"
                      className="form-control"
                      onChange={changehandle}
                      //value={adduser.departName}
                    >
                      <option>-----Select Department-----</option>

                      {dropdownlist.map((x) => {
                        return (
                          <option  value={x.id}>
                            {x.departmentName}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>

                <div className="form-group row">
                  <label for="textRoleId" className="col-sm-4">
                    Role
                  </label>

                  <div className="col-sm-8">
                    <select
                      id="textRoleId"
                      placeholder="Enter RoleId"
                      name="roleId"
                      className="form-control"
                      onChange={changehandle}
                      //value={adduser.roleId}
                    >
                      <option>-----Select Role-----</option>
                      {roledropdownlist.map((x) => {
                        return <option value={x.id}>{x.rolesName}</option>;
                      })}
                    </select>
                  </div>
                </div>

                {/* footer */}

                <div className="modal-footer">
                  <button className="btn btn-primary" onClick={SaveUser}>
                    Save
                  </button>
                  <button className="btn btn-danger">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* edit */}
      <form>
        <div className="modal" id="editModal" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              {/* Header */}
              <div className="modal-header">
                <div className="model-title"> New User</div>
                <button className="close" data-dismiss="modal">
                  <span>&times;</span>
                </button>
              </div>

              {/* Body */}

              <div className="modal-body">
                <div className="form-group row">
                  <label for="textname" className="col-sm-4">
                    Name
                  </label>

                  <div className="col-sm-8">
                    <input
                      type="text"
                      id="textname"
                      placeholder="Enter Name"
                      name="name"
                      className="form-control"
                      onChange={editchangehandle}
                      value={update.name}
                    ></input>
                  </div>
                </div>

                <div className="form-group row">
                  <label for="textAddress" className="col-sm-4">
                    Address
                  </label>

                  <div className="col-sm-8">
                    <input
                      type="text"
                      id="textAddress"
                      placeholder="Enter Address"
                      name="address"
                      className="form-control"
                      onChange={editchangehandle}
                      value={update.address}
                    ></input>
                  </div>
                </div>

                <div className="form-group row">
                  <label for="textEmail" className="col-sm-4">
                    Email
                  </label>

                  <div className="col-sm-8">
                    <input
                      type="text"
                      id="textEmail"
                      placeholder="Enter Email Address"
                      name="email"
                      className="form-control"
                      onChange={editchangehandle}
                      value={update.email}
                    ></input>
                  </div>
                </div>

                <div className="form-group row">
                  <label for="textDepId" className="col-sm-4">
                    Department
                  </label>

                  <div className="col-sm-8">
                    <select
                      type="text"
                      // id="textDepId"
                      //placeholder="Enter DepId"
                      name="departmentId"
                      className="form-control"
                      onChange={editchangehandle}
                     // value={update.departName}
                    >
                      <option value={update.id}>{update.departName}</option>
                      {dropdownlist.map((x) => {
                        return (
                          <option type="text"  value={x.id}>
                            {x.departmentName}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>

                <div className="form-group row">
                  <label for="textRoleId" className="col-sm-4">
                    Role
                  </label>

                  <div className="col-sm-8">
                    <select
                      type="text"
                      id="textRoleId"
                      placeholder="Enter RoleId"
                      name="roleId"
                      className="form-control"
                      onChange={editchangehandle}
                      //value={update.roleName}
                    >
                      <option value={update.id}>{update.roleName}</option>
                      {roledropdownlist.map((x) => {
                        return (
                          <option type="text"  value={x.id}>
                            {x.rolesName}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>

                {/* footer */}


                <div className="modal-footer">
                
                  <button className="btn btn-primary" onClick={UpdateUser}>
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

export default User;
