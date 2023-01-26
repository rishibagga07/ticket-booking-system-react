
import React from 'react'
import { useParams } from 'react-router-dom'


function Password() {

    const params = useParams();

console.log(params);
    
  return (
    <div>
        
        

<main className="login-form m-5 p-2">
    <div className="cotainer">
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-header  "> Generate The Password</div>
                    <div className="card-body">
                        <form action="" method="">
                            <div className="form-group row">
                                <label for="password" className="col-md-4 col-form-label text-md-right">Password</label>
                                <div className="col-md-6">
                                    <input type="password" id="password" className="form-control" name="email-address" required autofocus/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label for="confirm_password" className="col-md-4 col-form-label text-md-right">Confirm Password</label>
                                <div className="col-md-6">
                                    <input type="password" id="confirm_password" className="form-control" name="password" required/>
                                </div>
                            </div>

                            {/* <div className="form-group row">
                                <div className="col-md-6 offset-md-4">
                                    <div className="checkbox">
                                        <label>
                                            <input type="checkbox" name="remember"/> Remember Me
                                        </label>
                                    </div>
                                </div>
                            </div> */}

                            <div className="col-md-6 offset-md-4">
                                <button type="submit" className="btn btn-primary">
                                    Submit
                                </button>
                                {/* <a href="#" className="btn btn-link">
                                    Forgot Your Password?
                                </a> */}
                            </div>
                    
                </form>
                </div>
            </div>
        </div>
    </div>
    </div>

</main>









{/* <form className="pure-form">
    <fieldset>
        <legend>Confirm password with HTML5</legend>

        <input type="password" placeholder="Password" id="password" required/>
        <input type="password" placeholder="Confirm Password" id="confirm_password" required/>

        <button type="submit" className="pure-button pure-button-primary">Confirm</button>
    </fieldset>
</form> */}


    </div>
  )
}

export default Password