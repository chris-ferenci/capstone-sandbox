import "../Header/header.css";
import { useContext } from "react";
import { CountryContext } from "../../pages/Home";

// icons
import { FaLaptopMedical } from "react-icons/fa";
import { IconContext } from "react-icons";
import { Icon } from "@blueprintjs/core";

function Header(){

    const [ searchQuery, setSearchQuery ] = useContext(CountryContext)

    function filterJobs(input){ setSearchQuery(input) };

    return(

        <header id="header" className="header">

            <div className="brand">
                <div className="brand-icon">
                    <IconContext.Provider value={{size:"2rem", color: "#5F01F5"}}>
                        <FaLaptopMedical />
                    </IconContext.Provider>
                </div>
                <h1 className="brand-logo">Around Me</h1>
                <p className="brand-tag">Insights About Your City</p>
            </div>

            <nav className="header-links-container">
                <ul className="header-links">
                <li><a href="/">Home</a></li>
                <li><a href="/insights">Insights</a></li>
                </ul>
            </nav>
            
            <form className="quick-search">
                <input type="text" placeholder="Quick Search" onChange={(e) => filterJobs(e.target.value)} />
            </form>
            

        </header>

    )

}

export default Header;