// imports
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {CgMenu} from "react-icons/cg";
import {AiOutlineClose} from "react-icons/ai";
import {CgLogOut} from "react-icons/cg";
import Logo from "../Components/Images/UOPlogo.png";

// main function
const SDCNavbar = () => {

  // useStates
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Arrays
  const NavMenus = [
    { title: "Dashboard", path: "/sdc/dashboard" },
    { title: "1. Announce", path: "/sdc/announce" },
    { title: "2. Add Lecturers", path: "/sdc/applicant/save" },
    { title: "3. Prepare Applications", path: "/sdc/application/create" },
    { title: "4. Send Applications", path: "/sdc/invite" },
    { title: "5. Applications", path: "/sdc/allApplications" },
  ];

  // Navigation
  const navigate = useNavigate();
  const loginPath = "/";

  // Functions
  const navigateDashBoard = (e, path) => {
    e.preventDefault();
    navigate(path);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // html, css, js all together -> typeScript
  return (
    <header className="bg-gray-800 text-white pt-4 pb-2 select-none z-10">
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
          className={`nav-links bg-gray-800 duration-500 md:static absolute md:min-h-fit min-h-[25vh] left-0 ${
            isMenuOpen ? "top-[12%]" : "top-[-100%]"
          } md:w-auto w-full flex items-center px-5`}
        >
          <ul className="flex md:flex-row flex-col md:items-center md:gap-[2vw] gap-8">
            {NavMenus.map((Menu, index) => (
              <li
                key={index}
                onClick={(e, path) => navigateDashBoard(e, Menu.path)}
                
                className={(Menu.title == "Dashboard") ? "cursor-pointer hover:text-blue-400 " : "cursor-pointer hover:text-amber-400 "}
              >
                <span>{Menu.title}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-6">
          {/* Logout Button */}
          <button
            className="bg-gray-700 hover:bg-amber-300 text-white text-sm font-bold py-2 px-4 rounded-full inline-flex items-center transition-colors duration-500 ease-in-out hover:text-gray-800"
            onClick={() => navigate(loginPath)}
          >
            <CgLogOut fontSize={20} />
            <span className="pl-1">
              Log Out
            </span>
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

export default SDCNavbar;
