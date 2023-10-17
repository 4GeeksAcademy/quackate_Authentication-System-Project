import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/private.css";

export const Private = () => {
	const { store, actions } = useContext(Context);

	const nav = useNavigate();

	useEffect(() => {
		if (store.token) {
			console.log("Go ahead.")
		}
		else {
			nav('/login')
		}
	}, [])

	useEffect(() => {
		if (store.token && store.token != "" && store.token != undefined) {
			actions.getMessage()
		}
	}, [store.token]);

	return (
		<div className="text-center mt-5">
			<h2>
				{store.token && store.token != "" && store.token != undefined ? store.message + "! :)": ""}
			</h2>
			<h1>Surprise!! I'm your private page!</h1>
			<img src="https://i.pinimg.com/originals/c2/f1/66/c2f16681699bd2fd1fad22f3df3a2d84.png" className="dino-img-priv" />
		</div>
	);
};
