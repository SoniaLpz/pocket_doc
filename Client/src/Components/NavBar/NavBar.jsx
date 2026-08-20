import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from '../../assests/Logo.png';
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
            {username}
            </button>
            {menuOpen && (
                <div className='DropMenu'> 
                <button className='myRecipesButton' onClick= {() => navigate("/MyRecipes")}> 
                  My Recipes
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