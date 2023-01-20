import { Button } from '@blueprintjs/core';
import { useContext } from 'react';
import { CountryContext } from '../../pages/Home';
import '../Sidebar/sidebar.css'
import Space from '../Space/Space';


function Sidebar(){

    // const [activeCountry, setActiveCountry] = useContext(CountryContext);

    return(
        <nav id="sidebar-container" className='sidebar'>
            
            <ul>
                <h2>Find Job By Country</h2>

                <div>

                    <div className="country-space">
                        <Space type="country" value="United States"/>
                    </div>

                    <div className="country-space">
                        <Space type="country" value="Canada"/>
                    </div>

                    <div className="country-space">
                        <Space type="country" value="Mexico"/>
                    </div>

                    <div className="country-space">
                        <Space type="country" value="United Kingdom"/>
                    </div>

                    <div className="country-space">
                        <Space type="country" value="Brazil"/>
                    </div>
                </div>
                
                <h2>Select Your Experience</h2>

                <div>

                    <div className="experience-space">
                        <Space type="experience" value="0-2 years"/>
                    </div>

                    <div className="experience-space">
                        <Space type="experience" value="3-4 years"/>
                    </div>

                    <div className="experience-space">
                        <Space type="experience" value="5-9 years"/>
                    </div>

                    <div className="experience-space">
                        <Space type="experience" value="10+ years"/>
                    </div>

                </div>

                {/* <Button className="country-button" onClick={() => updateCountry('United States', setActiveCountry)}>
                    <li className="country-text">United States</li>
                 </Button>

                 <Button className="country-button" onClick={() => updateCountry('Canada', setActiveCountry)}> 
                    <li className="country-text">Canada</li>
                 </Button>

                 <Button className="country-button" onClick={() => updateCountry('Mexico', setActiveCountry)}> 
                    <li className="country-text">Mexico</li>
                 </Button>

                 <Button className="country-button" onClick={() => updateCountry('United Kingdom', setActiveCountry)}> 
                    <li className="country-text">United Kingdom</li>
                 </Button>

                 <Button className="country-button" onClick={() => updateCountry('Brazil', setActiveCountry)}> 
                    <li className="country-text">Brazil</li>
                 </Button> */}
                
            </ul>
        </nav>

    )
}

function updateCountry (country, setActiveCountry) {
    setActiveCountry(country);
}

export default Sidebar;