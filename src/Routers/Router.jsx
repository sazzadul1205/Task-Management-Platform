import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/mainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Audience from "../Pages/Audience/Audience";
import DashboardLayout from "../Layout/DashboardLayout";
import NewTasks from "../Pages/Dashboard/NewTasks/NewTasks";
import MyTasks from "../Pages/Dashboard/MyTasks/MyTasks";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/Audience',
                element: <Audience></Audience>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signUp',
                element: <SignUp></SignUp>
            }

        ]
    },
    {
        path: '/dashboard',
        element: <DashboardLayout></DashboardLayout>,
        children:[
            {
                path: 'newTask',
                element: <NewTasks></NewTasks>
            },
            {
                path: 'myTask',
                element: <MyTasks></MyTasks>
            }
        ]
    }
]);