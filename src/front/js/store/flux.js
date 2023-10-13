const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null, 
			message: null
		},
		actions: {

			syncTokenSessionStorage: () => {
				const token = sessionStorage.getItem("token");
				console.log("Application just loaded, synching the session storage")
				setStore ({ token: token })
				return token
			},

			logout: () => {
				const token = sessionStorage.removeItem("token");
				console.log("Logging out...")
				if (token && token != "" && token != undefined) setStore ({ token: null });
			},

			login: async (email, password) => {
				const options = {
					method: 'POST',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						email: email,
						password: password
					})
				}

				try {
					const resp = await fetch('https://improved-space-cod-j9r4qpqpwjj347g-3001.app.github.dev/api/login', options)
						if (resp.status !== 200){
							alert("There has been an error");
							return false;
						}
					
					const data = await resp.json();
						console.log("This came from the backend", data);
						sessionStorage.setItem("token", data.access_token);
						setStore({ token: data.access_token })
						return true;
				}

				catch (error) {
					console.log("There has been an error logging in")
				}
			},

			signUp: (username, firstname, lastname, email, password) => {
				const options = {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ username: username, firstname: firstname, lastname: lastname, email: email, password: password })
				}
				fetch(process.env.BACKEND_URL + 'api/registration', options)
					.then(response => {
						if (response.ok) return response.json()
						else throw Error('Something went wrong')
					})
					.then(data => {
						console.log(data)
					})
					.catch(error => {
						console.log(error)
					})
			},

			getMessage: () => {
				const store = getStore();
				const options = {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${store.token}`
					}
				}
			
				fetch(`${process.env.BACKEND_URL}/api/hello`, options)
					.then(resp => resp.json())
					.then(data => {
						console.log(data)
						setStore({ message: data.message })
						console.log(store.message)
						return data;
					})
					.catch(error => {
						console.log(error);
					});

			}
		}
	};
};

export default getState;
