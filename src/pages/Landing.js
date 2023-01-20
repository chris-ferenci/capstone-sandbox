import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './landing.css';
import '../components/Loader/Loader.css'
import { FaChevronRight } from "react-icons/fa";
import { IconContext } from "react-icons";
import Loader from '../components/Loader/Loader';
import landingImg from "./img/landing-bg.jpg"
import landingImg2 from "./img/landing-bg-2.jpg"

function Landing() {
    // const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //     setLoading(true);
    //     setTimeout(() => {
    //         setLoading(false);
    //     }, 2000);
    // }, []);

    return(
    <article className='landing-container'>
        
        <section className='hero-left'>
            <article className='hero-inner'>
                <h1>Relief Careers</h1>
                <h4>Find work to help those most in need</h4>

                <article className="description">
                    <p>Browse our collection of worldwide career opportunities in countries experiencing humanitarian crises.
                    </p>
                </article>

                <Link to="/browsejobs" className="btn btn-primary btn-large">
                    Browse Careers
                    <IconContext.Provider value={{ size: "1.2rem" }}><FaChevronRight />
                    </IconContext.Provider>
                </Link>
            </article>

        </section>
                
        <section className="hero-right">

            <article className="vertical-half">
                <img className="landing-img" src={landingImg2} />
            </article>

            <article className="vertical-half">
                <img className="landing-img" src={landingImg} />
            </article>
            

        </section>
            
    </article>

   )

}


export default Landing;