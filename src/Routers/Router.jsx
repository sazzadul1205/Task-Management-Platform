import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/mainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import DashboardLayout from "../Layout/DashboardLayout";
import NewTasks from "../Pages/Dashboard/NewTasks/NewTasks";
import MyTasks from "../Pages/Dashboard/MyTasks/MyTasks";
import UpdateTasks from "../Pages/Dashboard/UpdateTasks/UpdateTasks";
import AboutUs from "../Pages/AboutUs/AboutUs";
import PrivateRoutes from "./PrivateRoutes";

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
                path: '/aboutUs',
                element: <AboutUs></AboutUs>
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
        element: <PrivateRoutes><DashboardLayout></DashboardLayout> </PrivateRoutes>,
        children:[
            {
                path: 'newTask',
                element: <PrivateRoutes><NewTasks></NewTasks></PrivateRoutes>
            },
            {
                path: '/dashboard',
                element: <PrivateRoutes>x<MyTasks></MyTasks></PrivateRoutes>
            },
            {
                path: 'updateTask/:id',
                element: <PrivateRoutes><UpdateTasks></UpdateTasks></PrivateRoutes>,
                loader: ({ params }) => fetch(`https://task-management-platform-server-beryl.vercel.app/tasks/${params.id}`)
            }
        ]
    }
]);