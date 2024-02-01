import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {createBrowserRouter, RouterProvider,} from "react-router-dom";

import ErrorPage from "./common/error-page.tsx";
import SignIn from "./Pages/Authentication/SignIn.tsx";
import SignUp from "./Pages/Authentication/SignUp.tsx";
import Sign from "./Pages/Authentication/AuthRedirect.tsx";
import Chats from "./Pages/Chat/Chats.tsx";
import Chat from "./Pages/Chat/Chat.tsx";

const router = createBrowserRouter([
	{path: "/", element: <App/>, errorElement: <ErrorPage/>},
	{path: "/sign", element: <Sign/>, errorElement: <ErrorPage/>},
	{path: "/sing-in", element: <SignIn/>, errorElement: <ErrorPage/>},
	{path: "/sign-up", element: <SignUp/>, errorElement: <ErrorPage/>},
	{path: "/chat", element: <Chats/>, errorElement: <ErrorPage/>},
	{path: "/chat/:username", element: <Chat/>, errorElement: <ErrorPage/>},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router}/>
	</React.StrictMode>,
)
