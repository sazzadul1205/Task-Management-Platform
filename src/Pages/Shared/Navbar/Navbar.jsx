import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/logo.png";
import { motion } from "framer-motion";
import useAuth from "../../../Hooks/useAuth";
import { useState } from "react";

const Navbar = () => {
    const { user, logOut } = useAuth();
    const [showDropdown, setShowDropdown] = useState(false);

    const handleImageClick = () => {
        setShowDropdown(!showDropdown);
    };

    const handleSignOut = () => {
        logOut()
            .then(() => {
                console.log("User signed out successfully.");
            })
            .catch((error) => {
                console.error("Error signing out:", error);
            });
    };

    // Navbar links
    const navLinks = [
        { to: "/", label: "Home" },
        { to: "/dashboard", label: "Dashboard" },
        { to: "/Audience", label: "Audience" },
    ];

    const nav = navLinks.map((link) => (
        <li key={link.to}>
            <NavLink
                to={link.to}
                exact
                className={({ isActive }) =>
                    `text-lg font-semibold ${isActive
                        ? "text-blue-500 text-[22px] hover:text-blue-700"
                        : "text-black hover:text-blue-700"
                    }`
                }
            >
                {link.label}
            </NavLink>
        </li>
    ));

    return (
        <div className="navbar fixed z-50 max-w-[1200px] bg-blue-200 opacity-90">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                    >
                        {nav}
                    </ul>
                </div>
                <div className="relative">
                    <img
                        className="w-32 cursor-pointer"
                        src={logo}
                        alt=""
                        onClick={handleImageClick}
                    />
                    {showDropdown && (
                        <div className="absolute top-12 right-0 mt-2 p-2 bg-white border rounded-md shadow-md">
                            <button
                                className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200"
                                onClick={handleSignOut}
                            >
                                Log Out
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div className="navbar-end hidden lg:flex">
                <ul className="menu menu-horizontal px-1">{nav}</ul>
            </div>
            <div className="mr-5 flex items-center">
                {user ? (
                    <>
                        <div className="avatar flex-col mr-5">
                            <div className="w-14 h-14 rounded-full ring ring-primary mx-auto">
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

                        <motion.button
                            className={`w-28 p-3 bg-[#001B79] hover:bg-blue-700 rounded-xl text-white`}
                            onClick={handleSignOut}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        >
                            Log Out
                        </motion.button>
                    </>
                ) : (
                    <Link to="/login">
                        <motion.button
                            className={`w-28 p-3 bg-[#001B79] hover:bg-blue-700 rounded-xl text-white`}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        >
                            Log In
                        </motion.button>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;
