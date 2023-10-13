import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		if (store.token && store.token != "" && store.token != undefined) {
			actions.getMessage()
		}
	}, [store.token]);

	return (
		<div className="text-center mt-5">
			<h1 className="mb-5">Welcome to this website!</h1>
			<p>
				{store.token && store.token != "" && store.token != undefined ? 
				<Link to="/private">
					<img src="https://cdn.dribbble.com/users/1044993/screenshots/6634466/triceratops_dribbble.png?resize=400x0" className="dino-img mb-4"/>
				</Link> :
				<img src="https://cdn.dribbble.com/users/1044993/screenshots/6634466/triceratops_dribbble.png?resize=400x0" className="dino-img mb-4"/>}
			</p>
			<div className="alert alert-info">
				{store.token && store.token != "" && store.token != undefined ? store.message : "Welcome, please login!"}
			</div>
			<h5 className="mb-5 mt-4">
				Isn't the dinosaur cute?<br></br>
				{store.token && store.token != "" && store.token != undefined ? <strong>(Click on it to go to your private page!)</strong> : "(Sign in to discover the private page!)"}
			</h5>
		</div>
	);
};
