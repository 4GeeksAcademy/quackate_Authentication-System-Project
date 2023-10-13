import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/signup.css";

export const SignUp = () => {
    const { store, actions } = useContext(Context);

    const [username, setUsername] = useState();
    const [firstname, setFirstname] = useState();
    const [lastname, setLastname] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(username, firstname, email);
      actions.signUp(username, firstname, lastname, email, password);
      <Link to='/login' />
    };

    return (
        <div className="text-center container mt-5">
            <form className="signup-form" onSubmit={handleSubmit}>
                <h1 className="mb-5">Sign up here!</h1>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className="form-control" id="username" onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="firstname" className="form-label">First Name</label>
                    <input type="text" className="form-control" id="firstname" onChange={(e) => setFirstname(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="lastname" className="form-label">Last Name</label>
                    <input type="text" className="form-control" id="lastname" onChange={(e) => setLastname(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)}/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-primary signup-btn mt-4 px-3">Submit</button>
                <p className="mt-5">Already have an account?&nbsp;
						<Link to='/login'>
							<span>Sign in!</span>
						</Link>
					</p>
            </form>
        </div>
    );
};