import axios from "axios";
import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import Swal from "sweetalert2";

function Registration(props) {
  const [adduser, setadduser] = useState();
  // const [dropdown, setdropdown] = useState([]);
  // const [dropdowndep, setdropdowndep] = useState([]);

  const validationSchema = yup.object({
    name: yup.string().min(2).required("Name is required"),
    address: yup.string().required("Address is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
  });

  const initValues = {
    name: "",
    address: "",
    email: "",
  };
  // {values , errors, handleBlur , handleSubmit }
  const { values, errors, handleBlur, touched, handleSubmit, handleChange } =
    useFormik({
      initialValues: initValues,
      validationSchema: validationSchema,

      onSubmit: (values) => {
        // setadduser(values)
      },
    });

  debugger;

  const navigatelogin = useNavigate();
  debugger;
  // const NavigateToLogin = () => {
  // 👇️ navigate to /contacts
  //   navigatelogin("/setpasswordlink");
  // };

  useEffect(() => {
    GetAll();
    depGetAll();
  }, []);

  const GetAll = () => {
    debugger;

    axios
      .get("https://localhost:44351/api/Roles")
      .then((res) => {
        // setdropdown(res.data);
        console.log(res.data);
      })
      .catch((d) => {
        alert("No Data Found");
      });
  };

  const depGetAll = () => {
    debugger;

    axios
      .get("https://localhost:44351/api/Department")
      .then((res) => {
        // setdropdowndep(res.data);
        console.log(res.data);
      })
      .catch((d) => {
        alert("No Data Found");
      });
  };

  // const changehandler = (event) => {
  //   debugger;
  //   const { name, value } = event.target;
  //   setadduser({ ...adduser, [name]: value });
  //   console.log("user", adduser);
  // };
  // console.log("222", adduser);

  const SaveRgistrastion = (props) => {
    console.log("props", props);
    debugger;
    console.log("adduser", adduser);
    console.log("values 96", values);
    axios
      .post("https://localhost:44351/api/User", values)
      .then((request) => {
        navigatelogin("/setpasswordlink");
      })
      .catch((error) => {
        WebApiAlert();
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

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mx-auto col-6">
          <div className="card text-center">
            <div className="card-header ">Registarion</div>
            <div className="card-body">
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
                    //onChange={changehandler}
                    value={values.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  ></input>
                  {errors.name && touched.name ? (
                    <p className="form-error">{errors.name}</p>
                  ) : null}
                </div>
              </div>

              <div className="form-group row">
                <label for="textaddress" className="col-sm-4">
                  Address{" "}
                </label>

                <div className="col-sm-8">
                  <input
                    type="text"
                    id="textaddress"
                    placeholder="Enter Address"
                    name="address"
                    className="form-control"
                    //onChange={changehandler}
                    value={values.address}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    //   value={addep.departmentName}
                  ></input>
                  {errors.address && touched.address ? (
                    <p className="form-error">{errors.address}</p>
                  ) : null}
                </div>
              </div>

              <div className="form-group row">
                <label for="textemail" className="col-sm-4">
                  Email{" "}
                </label>

                <div className="col-sm-8">
                  <input
                    type="text"
                    id="textemail"
                    placeholder="Enter Address"
                    name="email"
                    className="form-control"
                    // onChange={changehandler}
                    value={values.email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    //   value={addep.departmentName}
                  />
                  {errors.email && touched.email ? (
                    <p className="form-error">{errors.email}</p>
                  ) : null}
                </div>
              </div>

              {/* <div className="form-group row">
            <label for="textemail" className="col-sm-4">
              Please select User
            </label>

            <div className="col-sm-8">
              <select className="form-control" name="roleId"  onChange={changehandler} type="number" >
                <option>---Select---</option>

                {dropdown.map((x) => {
                  return <option  type="number" value={x.id}>{x.rolesName}</option>;
                })}
              </select> 
            </div>
          </div> */}

              {/* <div className="form-group row">
            <label for="textemail" className="col-sm-4">
              Please select Department
            </label>

            <div className="col-sm-8">
              <select className="form-control" name="departmentId" onChange={changehandler} type="number" >
                <option>---Select---</option>

                {dropdowndep.map((x) => {
                  return <option type="number"  value={x.id}>{x.departmentName}</option>;
                })}
              </select>
            </div>
          </div> */}
            </div>

            <div className="card-footer text-muted">
              <button className="btn btn-success"  type="submit"
            //  onClick={SaveRgistrastion}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Registration;
