import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const [ email, setEmail ] = useState("");
	const [ password, setPassword ] = useState("");
	const navigate = useNavigate();

	console.log("This is your token", store.token);
	const handleClick = () => {
		actions.login(email, password);
		/*if(email!=store.user.email && password!=store.user.password) navigate("/signup");*/
		if(store.token && store.token !="" && store.token !=undefined) navigate("/");
	};
	
	
	return (
		<div className="text-center mt-5">
			{(store.token && store.token!="" && store.token!=undefined) ? 
			<h1>{"User logged in with"}
			<h6>{"Token: " + store.token}</h6></h1>
			:
			<div>
				<h1>Login</h1>
					<input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
					<input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
					<button onClick={handleClick}>Login</button>
			</div>
			}
		</div>
	);
};
