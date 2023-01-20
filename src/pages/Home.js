import React, { createContext, useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import JobBoard from '../components/JobBoard/JobBoard';
import Loader from '../components/Loader/Loader';


import './home.css';


export const CountryContext = createContext();



function Main() {

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1300);
    }, []);

        
    const [activeCountry, setActiveCountry] = useState('United States');
    const [activeExperience, setActiveExperience] = useState('')
    const [jobs, setJobs] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(false);

 

    function hitAPI () {

        

        let jobs_data = [];
        fetch('https://api.reliefweb.int/v1/jobs?appname=apidoc&profile=list&preset=latest&&fields[include][]=experience.name&filter[operator]=AND&filter[conditions][0][field]=country&filter[conditions][0][value]='+activeCountry+'&filter[operator]=AND&filter[conditions][1][field]=experience.name&filter[conditions][1][value]='+activeExperience).then((response) => response.json()).then((json_item) => {
            json_item['data'].forEach((item) => {
                jobs_data.push({
                    id: item['id'],
                    created_date: item['fields']['date']['created'],
                    closed_date: item['fields']['date']['closing'],
                    job_title: item['fields']['title'],
                    countries: item['fields']['country'],
                    sources: item['fields']['source'],
                    url: item['fields']['url'],
                    experience: item['fields']['experience']['name'],
                    href: item['href']
                });
            });

            setJobs(jobs_data);
            return jobs;
        });

        
    }

    useEffect(() => {
        hitAPI();
    }, [activeCountry, activeExperience]);

    




    return(
        <>
        { loading ? ( <Loader /> ) :
        (
        <div id='grid-container'>
            
            <CountryContext.Provider value={[activeCountry, setActiveCountry, activeExperience, setActiveExperience, jobs, setJobs, searchQuery, setSearchQuery, favorites, setFavorites]}>
                <Header />
                <Sidebar />
                <JobBoard />
            </CountryContext.Provider>
        
        </div>
        )}
        </>
        
    )
}

export default Main;


