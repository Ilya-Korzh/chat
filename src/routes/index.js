import { createBrowserRouter } from 'react-router-dom';
import * as React from 'react';
import { LoginPage } from '../Pages/LoginPage/LoginPage';
import { SecondPage } from '../Pages/SecondPage/SecondPage';
import { ErrorPage } from '../Pages/ErrorPage/ErrorPage';
import { RegistrationPage } from '../Pages/RegistrationPage/RegistrationPage';
import { ChatPage } from "../Pages/ChatPage/ChatPage";
import { CreateChatPage } from '../Pages/SecondPage/CreateChatPage/CreateChatPage';


export const router = createBrowserRouter(
  [
    { path: "/", element: <LoginPage />, },
    { path: "/registration",  element: <RegistrationPage />, },
    { path: "/SecondPage", element: <SecondPage />, },
    { path: "/SecondPage/:chatId", element: <ChatPage />, },
    { path: "/CreateChatPage", element: <CreateChatPage/>, },
    { path: "*", element: <ErrorPage />, },
  ]);
