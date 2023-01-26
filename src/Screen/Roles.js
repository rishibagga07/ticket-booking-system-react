import axios from "axios";
import React, { useEffect, useState } from "react";
 import Swal from "sweetalert2";


function Department() {
  const [getrole, setgetrole] = useState();
  // const InitFormState = {id: null,  departmentname:""}
  const [addrole, setaddrole] = useState({});

  useEffect(() => {
    GetAll();
  }, []);

  const GetAll = () => {
    debugger;
    axios
      .get("https://localhost:44351/api/Roles")
      .then((res) => {
        setgetrole(res.data);
        console.log(res.data);
      })
      .catch((d) => {
        WebApiAlert();
      });
  };

  

  const SaveRole = () => {
      
    axios
      .post("https://localhost:44351/api/Roles", addrole)
      .then((req) => {
        SaveAlert()
        GetAll();
      })
      .catch((error) => {
        WebApiAlert();
      });
  };

   const EditDep = (roledata) => {
    debugger;
    console.log("roledata", roledata);
    setaddrole(roledata);
    console.log("addrole", addrole);
   }

  const UdateDep = () => {
    
    axios.put("https://localhost:44351/api/Roles", addrole).then((res)=>{
      UpdateAlert();
      GetAll();

    }).catch((error)=>{
      WebApiAlert();
    })
  }


  const DeleteRole=(id)=> {
debugger
axios.delete("https://localhost:44351/api/Roles/"+id).then((d)=>{
  DeleteAlert();
GetAll();
}).catch((error)=>{
  WebApiAlert();
})
  }



  const changehandler = (event) => {
    const { name, value } = event.target;
    setaddrole({ ...addrole, [name]: value });
    
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

  function renderdepgetall() {
    let DepartmentRow = [];
    getrole?.map((item) =>
      DepartmentRow.push(
        <tr>
          <td>{item.rolesName}</td>

          <td>
            <button className="btn btn-info p-2 m-1" data-toggle="modal" data-target="#editModal" onClick={()=> EditDep(item)}  >Edit</button>
            <button className="btn btn-danger p-2 m-1 " onClick={()=> DeleteRole(item.id)}>Delete</button>
          </td>
        </tr>
      )
    );
    return DepartmentRow;
  }

  return (
    <div>
      <div>
        <h2 className="text-dark">Roles List</h2>
      </div>
      <div align="right">
      <div className="col-3">
        <button
          className="btn btn-danger  p-2 m-2 form-control "
          data-toggle="modal"
          data-target="#newModal"
        >
          Add New Role
        </button>
      </div>
      </div>

      <div className="row">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{renderdepgetall()}</tbody>
        </table>
      </div>

      {/* Save */}
      <form>
        <div className="modal" id="newModal" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              {/* Header */}
              <div className="modal-header">
                <div className="model-title"> New Role</div>
                <button className="close" data-dismiss="modal">
                  <span>&times;</span>
                </button>
              </div>

              {/* Body */}

              <div className="modal-body">
                <div className="form-group row">
                  <label for="textname" className="col-sm-4">
                    Role
                  </label>

                  <div className="col-sm-8">
                    <input
                      type="text"
                      id="textname"
                      placeholder="Enter Department"
                      name="rolesName"
                      className="form-control"
                      onChange={changehandler}
                    // value={addrole.rolesName}
                    ></input>
                  </div>
                </div>

                {/* footer */}

                <div className="modal-footer">
                  <button className="btn btn-primary" onClick={SaveRole} >
                    Save
                  </button>
                  <button className="btn btn-danger">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>




{/* EDIT */}
 <form>
        <div className="modal" id="editModal" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              {/* Header */}
              <div className="modal-header">
                <div className="model-title"> Edit Role</div>
                <button className="close" data-dismiss="modal">
                  <span>&times;</span>
                </button>
              </div>

              {/* Body */}

              <div className="modal-body">
                <div className="form-group row">
                  <label for="textname" className="col-sm-4">
                    Role
                  </label>

                  <div className="col-sm-8">
                    <input
                      type="text"
                      id="textname"
                      placeholder="Enter Department"
                      name="rolesName"
                      className="form-control"
                      onChange={changehandler}
                      value={addrole.rolesName}
                    ></input>
                  </div>
                </div>

                {/* footer */}

                <div className="modal-footer">
                  <button className="btn btn-primary" onClick={UdateDep} >
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

export default Department;
