import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	console.log("This is your token", store.token)
	const handleClick = () => {
		actions.login(email, password);
		navigate("/");
	};

	if (store.token && store.token != "" && store.token != undefined) navigate("/");

	return (
		<div className="login-form text-center mt-5">
			<h1 className="mb-5">Login here!</h1>
			<div>
				<div className="mb-3">
					<label htmlFor="email" className="form-label">Email address</label>
					<input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
				</div>
				<div className="mb-3">
					<label htmlFor="password" className="form-label">Password</label>
					<input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
				</div>
				<button className="btn btn-primary login-btn mt-4 px-3" onClick={handleClick}>Login</button>
				<p className="mt-5">Not registered yet?&nbsp;
					<Link to='/signup'>
						<span>Sign up now!</span>
					</Link>
				</p>
			</div>
		</div>
	);
};