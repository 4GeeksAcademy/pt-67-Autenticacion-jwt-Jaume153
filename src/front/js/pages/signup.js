import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const Signup = () => {
	const { store, actions } = useContext(Context);
	const [ user, setUser ] = useState("");
	const [ email, setEmail ] = useState("");
	const [ password, setPassword ] = useState("");
	const navigate = useNavigate();

	console.log("This is your token", store.token);
	const handleSubmit = () => {
		actions.signup(email, password);
		navigate("/login");
	};
	
	
	return (
		<div className="text-center mt-5">
			<h1>Signup</h1>
				<input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
				<input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
				<button onSubmit={handleSubmit}>Submit</button>
		</div>
	);
};
