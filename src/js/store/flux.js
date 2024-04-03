const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			
			contacts: []
			
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

loadContactsData: async () => {
				try {
				const response = await fetch("https://playground.4geeks.com/contact/agendas/Daniel1/contacts");
					if (!response.ok) {
						throw new Error("Failed to fetch contacts data");
					}
				const data = await response.json();
				setStore({contacts: data.contacts})
				}catch (error) {
					console.error("Error loading contacts data:", error);
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
