
import { Navigate } from "react-router-dom";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			message: null,
			user: {}
			
		},
		actions: {
			// Use getActions to call a function within a fuction
			

			syncTokenFromSessionStore: () => {
				const token = sessionStorage.getItem("token");
				console.log("Application loaded, synching session storage token");
				if(token && token !="" && token !=undefined) setStore({token: token});
			},

			logout: () => {
				sessionStorage.removeItem("token");
				console.log("Loging out");
				setStore({token: null});
			},

			login: async (email, password) => {
				const opts = {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						email: email,
						password: password
					})
				};

				try{
				const resp = await fetch("https://stunning-couscous-6j76pww5wppc47j5-3001.app.github.dev/api/token", opts)
				if (resp.status !== 200){
					alert("Error detected");
					return false;
				} 
				
				const data = await resp.json();
				console.log("Backend data", data);
				sessionStorage.setItem("token", data.access_token);
				setStore({token: data.acces_token});	
				return true;
				}
				catch(error){
					console.error("Error detected on login")
				}
			},

			signup: async (email, password) => {
				const opts = {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						email: email,
						password: password,
					})
				};

				try{
				const resp = await fetch("https://stunning-couscous-6j76pww5wppc47j5-3001.app.github.dev/api/user", opts)
				if (resp.status !== 200){
					alert("Error detected");
					return false;
				} 
				
				/*Place here a code that if response from server is not ok then throws an error and throws the user to login
				
				if(!response.ok){
					throw new Error('Network error')
				}
				also on the backend make email and password unique values.....research unique statement of inputs

				*/

				const data = await resp.json();
				console.log("Backend data", data);
				setStore({user: email, password});	
				return true;
				}
				catch(error){
					console.error("Error detected on login")
				}
			},

			getMessage: async () => {
				const store = getStore();
				const opts = {
					headers: {
						"Authorization": "Bearer " + store.token
					}
				}
				try{
					// fetching data from the backend
					const resp = await fetch("https://stunning-couscous-6j76pww5wppc47j5-3001.app.github.dev/api/hello", opts)
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;