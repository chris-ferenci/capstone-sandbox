import JobCard from "../JobCard/JobCard";
import '../JobBoard/jobboard.css';
import { useContext } from "react";
import { CountryContext } from "../../pages/Home";
import { FaChevronRight } from "react-icons/fa";
import { IconContext } from "react-icons";


function JobBoard() {

    const [activeCountry, setActiveCountry, activeExperience, setActiveExperience, jobs, setJobs, searchQuery] = useContext(CountryContext);
    let currentJobs = [];
    


    //Having to do this because when I do a forEach on jobs, the code fails for some reason ~ Rohan
    for (let i = 0; i < jobs.length; i++) {
        currentJobs.push(jobs[i]);
    }

    return (
        <article id="job-board-container">
            <IconContext.Provider value={{ size: "1rem" }}>
            <article className="title-card">
                <h1>Available Jobs in {activeCountry} <FaChevronRight /></h1>
            </article>
            </IconContext.Provider>

            

            {
                currentJobs.filter((item) => {if (searchQuery == ""){return item}
                else if (item.job_title.toLowerCase().includes(searchQuery.toLowerCase())){return item}}).map((item, index) => {
                    return <JobCard
                                id={item['id']}
                                key={item['id']}
                                created_date={item['created_date']}
                                closed_date={item['closed_date']}
                                title={item['job_title']}
                                countries={item['countries']}
                                sources={item['sources']}
                                url={item['url']}
                                href={item['href']}
                            />
                })
                
            }

            {/* <JobCard job_num="1"/> */}
            {/* <JobCard job_num="2"/> */}
            {/* <JobCard job_num="3"/> */}

        </article>

    )
}

export default JobBoard;