import '../JobCard/jobcard.css';
import '../Favorite/favorite.css';
import Favorite from '../Favorite/Favorite';
import { CountryContext } from '../../pages/Home';
import { useContext } from 'react';
import { FaChevronRight, FaCommentsDollar } from "react-icons/fa";
import { IconContext } from "react-icons";

function JobCard (props) {


    const [ activeCountry, setActiveCountry, jobs, setJobs ] = useContext(CountryContext);


    return (

        <article className='job-card'>
            <article className='description-container'>
                <h1 className="card-title"> {props.title} </h1>
                <h2 className="card-heading">Location</h2>
                <p>{activeCountry}</p>
                {/* {console.log(props.sources)} */}
                <h2 className="card-heading">Source</h2>
                <p>{props.sources[0]["name"]}</p>
            </article>

            <IconContext.Provider value={{size:".75rem"}}>
            <article className="btn-group">
                <a className="btn btn-primary" href={props.url}>Apply <FaChevronRight /></a>
                <a className="btn btn-tertiary" href={props.url}>Learn More</a>
            </article>
            </IconContext.Provider>
        </article>

    )
}


export default JobCard;