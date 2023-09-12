import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

import {CgMenu} from "react-icons/cg";
import {AiOutlineClose} from "react-icons/ai";
import {CgLogOut} from "react-icons/cg";

import Logo from "../Components/Images/UOPlogo.png";

function UserNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();

  const navigateDashBoard = (e, path) => {
    e.preventDefault();
    navigate(path);
  };

  const loginPath = "/";

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const NavMenus = [
    {title: "Dashboard", path: "/sdc/dashboard"},
    {title: "Announce", path: "/sdc/announce"},
  ];

  return (
    <header className="bg-black text-white pt-4 pb-2 select-none z-10">
      <nav className="flex justify-between items-center w-[92%] mx-auto">
        <div>
          <div className="inline-block mr-2">
            <img
              src={Logo}
              width="30"
              className="inline-block transform -translate-y-2"
              alt="Logo"
            />
          </div>
          <span className="text-4xl font-mono inline-block mb-2">SDC</span>
        </div>

        <div
          className={`nav-links bg-black duration-500 md:static absolute md:min-h-fit min-h-[25vh] left-0 ${
            isMenuOpen ? "top-[12%]" : "top-[-100%]"
          } md:w-auto w-full flex items-center px-5`}
        >
          <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8">
            {NavMenus.map((Menu, index) => (
              <li
                key={index}
                onClick={(e, path) => navigateDashBoard(e, Menu.path)}
                className="cursor-pointer hover:text-blue-600 "
              >
                <span>{Menu.title}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-6">
          {/* Logout Button */}
          <button
            className="bg-green-400 hover:bg-purple-400 text-black font-bold py-2 px-2 rounded inline-flex items-center"
            onClick={() => navigate(loginPath)}
          >
            <CgLogOut fontSize={20} />
            <span className="pl-1">Log Out</span>
          </button>
          {/* Small width Menu button */}
          <span
            onClick={toggleMenu}
            name={isMenuOpen ? "close" : "menu"}
            className="text-3xl cursor-pointer md:hidden"
          >
            {isMenuOpen ? <AiOutlineClose /> : <CgMenu />}
          </span>
        </div>
      </nav>
    </header>
  );
}

export default UserNavbar;
