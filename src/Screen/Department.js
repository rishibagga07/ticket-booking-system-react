import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

// const dep = {
//   id: 0,
//   departmentName: "",
// };

function Department() {
  const [department, setdepartment] = useState();
  // const InitFormState = {id: null,  departmentname:""}
  const [addep, setaddep] = useState({});

  useEffect(() => {
    GetAllDep();
  }, []);

  const GetAllDep = () => {
    debugger;
    axios
      .get("https://localhost:44351/api/Department")
      .then((res) => {
        setdepartment(res.data);
        console.log(res.data);
      })
      .catch((d) => {
        WebApiAlert();
      });
  };

  

  const Savedep = () => {
      
    axios
      .post(`https://localhost:44351/api/Department`, addep)
      .then((req) => {
        SaveAlert();
        GetAllDep();
      })
      .catch((error) => {
        WebApiAlert();
      });
  };

  const EditDep = (depdata) => {
    setaddep(depdata);
  }

  const UdateDep = () => {
    console.log("edit", addep);
    axios.put(`https://localhost:44351/api/Department`, addep).then((res)=>{
      UpdateAlert();
      GetAllDep();

    }).catch((error)=>{
      WebApiAlert();
    })
  }


  const DeleteDepartment=(id)=> {
axios.delete(`https://localhost:44351/api/Department/`+id).then((d)=>{
  DeleteAlert();
GetAllDep();
}).catch((error)=>{
  WebApiAlert();
})
  }

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

  const changehandler = (event) => {
    const { name, value } = event.target;
    setaddep({ ...addep, [name]: value });
    console.log(addep);
  };

  function renderdepgetall() {
    let DepartmentRow = [];
    department?.map((item) =>
      DepartmentRow.push(
        <tr>
          <td>{item.departmentName}</td>

          <td>
            <button className="btn btn-info p-2 m-1" data-toggle="modal" data-target="#editModal"  onClick={()=> EditDep(item)} >Edit</button>
            <button className="btn btn-danger p-2 m-1 " onClick={()=> DeleteDepartment(item.id)} >Delete</button>
          </td>
        </tr>
      )
    );
    return DepartmentRow;
  }

  return (
    <div>
      <div>
        <h2 className="text-dark">Department List</h2>
      </div>
      <div align="right" >
      <div className="col-3">
        <button
          className="btn btn-danger p-2 m-2 form-control "
          data-toggle="modal"
          data-target="#newModal"
        >
          Add New Department
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
                <div className="model-title"> New Department</div>
                <button className="close" data-dismiss="modal">
                  <span>&times;</span>
                </button>
              </div>

              {/* Body */}

              <div className="modal-body">
                <div className="form-group row">
                  <label for="textname" className="col-sm-4">
                    Department
                  </label>

                  <div className="col-sm-8">
                    <input
                      type="text"
                      id="textname"
                      placeholder="Enter Department"
                      name="departmentName"
                      className="form-control"
                      onChange={changehandler}
                      //value={addep.departmentName}
                    ></input>
                  </div>
                </div>

                {/* footer */}

                <div className="modal-footer">
                  <button className="btn btn-primary" onClick={Savedep}>
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
                <div className="model-title"> Edit Department</div>
                <button className="close" data-dismiss="modal">
                  <span>&times;</span>
                </button>
              </div>

              {/* Body */}

              <div className="modal-body">
                <div className="form-group row">
                  <label for="textname" className="col-sm-4">
                    Department
                  </label>

                  <div className="col-sm-8">
                    <input
                      type="text"
                      id="textname"
                      placeholder="Enter Department"
                      name="departmentName"
                      className="form-control"
                      onChange={changehandler}
                      value={addep.departmentName}
                    ></input>
                  </div>
                </div>

                {/* footer */}

                <div className="modal-footer">
                  <button className="btn btn-primary" onClick={UdateDep}>
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

export default Department;
