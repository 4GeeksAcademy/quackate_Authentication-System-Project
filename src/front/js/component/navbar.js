import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
    const { store, actions } = useContext(Context);
    const nav = useNavigate();

    const loggingout = () => {
        actions.logout();
        nav('/login');
    };

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container">
                <Link to="/">
                    <span className="navbar-brand mb-0 h1">Authentication Page</span>
                </Link>
                <div className="ml-auto">
                    { !store.token ? 
                        <Link to="/login">
                            <button className="btn btn-primary">Log in</button>
                        </Link>
                        : 
                        <button onClick={loggingout} className="btn btn-primary">Log out</button>
                    }   
                </div>
            </div>
        </nav>
    );
};
