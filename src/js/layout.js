import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import injectContext from "./store/appContext";
import { Contact } from "./views/Contact.jsx";
import { AddContact} from "./views/AddContact.jsx"
import { UpdateContact } from "./views/UpdateContact.jsx";

/* import { Navbar } from "./component/navbar"; */

//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div>
			<BrowserRouter basename={basename}>
				<Routes>
					<Route path="/" element={<Contact />} />
					<Route path="add-contact" element={<AddContact />}/>
					<Route path="/update-contact/:contactId" element={<UpdateContact />}/>
					<Route path="*" element={<h1>Not found!</h1>} />
				</Routes>
				
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
