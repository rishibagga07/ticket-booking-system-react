import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";






function Confirmpassword() {
 

  const navigatelogin = useNavigate();
  debugger
  const NavigateToLogin = () => {
    // 👇️ navigate to /contacts
    navigatelogin("/login");
  };

  
    const params = useParams();
    
  console.log(params)

  // form validation rules
  const validationSchema = Yup.object().shape({
    password: Yup.string()

      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  
  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  
  const { errors } = formState;

  const SavePassword = (pass) => {
    
    const obj={
      id:params.id,
      password:pass.password
    };
    console.log('obj',obj)
    axios.patch('https://localhost:44351/api/User/',obj).then(res => {
      console.log(res.data);
      navigatelogin("/login");
        
    }).catch((error)=>{
        WebApiAlert();
    })


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


  }


  return (
    
    <div className="mx-auto col-6">
      
    <div className="card m-3">
      <h5 className="card-header">Create Password</h5>
      <div className="card-body">
        <form onSubmit={handleSubmit(SavePassword)}>
          <div className="form-row">
            <div className="form-group col-6 mx-auto">
              <label>Password</label>
              <input
                name="password"
                type="password"
                {...register("password")}
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">{errors.password?.message}</div>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-6 mx-auto">
              <label>Confirm Password</label>
              <input
                name="confirmPassword"
                type="password"
                {...register("confirmPassword")}
                className={`form-control ${
                  errors.confirmPassword ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">
                {errors.confirmPassword?.message}
              </div>
            </div>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary mr-1"  >
              Register
            </button>
            <button
              type="button"
              onClick={() => reset()}
              className="btn btn-secondary"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
    
  );
}

export default Confirmpassword;
