import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const DashboardLayout = () => {
    const { user } = useAuth();

    const navLinks = [
        { to: "/", label: "Home" },
        { to: "/dashboard", label: "Dashboard" },
        { to: "/aboutUs", label: "About Us" },
    ];

    const DashboardNavLink = [
        { to: "/dashboard", label: "My Tasks" },
        { to: "newTask", label: "Add New Tasks" },
    ];

    const nav = navLinks.map((link) => (
        <li key={link.to}>
            <NavLink
                to={link.to}
                exact
                className={({ isActive }) =>
                    `text-lg font-semibold ${isActive
                        ? "text-blue-500 hover:text-[#1F1717] text-[22px] hover:text-2xl"
                        : "text-black hover:text-[#1F1717] hover:text-2xl"
                    }`
                }
            >
                {link.label}
            </NavLink>
        </li>
    ));

    const DashboardNav = DashboardNavLink.map((link) => (
        <li key={link.to}>
            <NavLink
                to={link.to}
                exact
                className={({ isActive }) =>
                    `text-lg font-semibold ${isActive
                        ? "text-blue-500   text-[22px] hover:text-2xl"
                        : "text-black hover:text-blue-500  hover:text-2xl"
                    }`
                }
            >
                {link.label}
            </NavLink>
        </li>
    ));
    return (
        <div className="flex w-[1200px] mx-auto">
            {/* Dashboard side bar */}
            <div className="w-64 min-h-screen bg-blue-200 pt-10 fixed">
                <h1 className="text-center text-2xl font-bold text-blue-800 ">Dashboard</h1>
                <div className="avatar flex-col mr-5 hidden md:flex mt-10">
                    <div className="w-14 h-14 rounded-full ring ring-primary mx-auto ">
                        <img
                            src={user?.photoURL}
                            alt="User Avatar"
                            className="object-cover rounded-full"
                        />
                    </div>
                    <h2 className="text-sm text-center text-black">
                        {user?.displayName}
                    </h2>
                </div>
                <ul className="menu p-4">
                    <ul className="menu menu-vertical px-1 text-blue-800 ">
                        {DashboardNav}
                    </ul>

                    <div className="divider">OR</div>
                    {/* shared nav link */}
                    <h1></h1>
                    <ul className="menu menu-vertical px-1 text-blue-800 ">
                        {nav}
                    </ul>
                </ul>
            </div>
            {/* Dashboard Content */}
            <div className="flex-1 ml-64 overflow-y-auto min-h-screen">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default DashboardLayout;