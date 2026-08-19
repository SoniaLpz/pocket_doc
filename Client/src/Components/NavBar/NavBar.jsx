import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from '../../assests/Logo.png';
import { FaArrowDown } from "react-icons/fa";
import './NavBar.css'

function navBar() {
    const navigate = useNavigate(); 
    const [menuOpen, setMenuOpen] = useState(false); 

    const username = localStorage.getItem("userName"); 

    function logOut() {
    localStorage.removeItem("token"); 
    localStorage.removeItem("userId"); 
    localStorage.removeItem("userName"); 

    navigate("/login")
  }

    return (
        <nav className='nav-bar'>
          <img src={Logo} alt="Logo"/>
          <div className="ProfileMenu">
            <button className='dropButton' onClick= {() => setMenuOpen((previous) => !previous)}>
            {username} <FaArrowDown /> 
            </button>
            {menuOpen && (
                <div> 
                <button className='closeButton' onClick= {() => navigate("/MyRecipes")}> 
                  My Recicpes <FaArrowDown />
                  </button> 
                  <button className='logout'onClick={() => logOut()} >
                    Logout 
                  </button>
                </div>
            )} 
          </div>
        </nav>
    ); 
}

export default navBar;