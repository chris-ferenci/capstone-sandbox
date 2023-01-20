import { Button } from "@blueprintjs/core";
import React, { useContext } from "react";
import './Space.css'
import { CountryContext } from "../../pages/Home";


export default function Space (props) {

    const [activeCountry, setActiveCountry, activeExperience, setActiveExperience] = useContext(CountryContext);
    
    const type = props.type
    const selected = ((props.value == activeCountry) | (props.value == activeExperience)) ? "selected" : "not-selected";
    
    function clickExperience(value){

        let val = value 

        if (value == activeExperience){
            setActiveExperience('')
        }
        else{
            setActiveExperience(val)
        }

    };


    return (

        <>
        {(() => {
        if (type == 'country'){
        return(
            <Button id={selected} className="space-button" onClick={() => setActiveCountry(props.value)}> 
            <span id="space-text"> {props.value} </span>
            </Button>
        )}
        else {
        return (
            <Button id={selected} className="space-button" onClick={() => clickExperience(props.value)}> 
            <span id="space-text"> {props.value} </span>
            </Button>
        )}
        }
        )()}
        </>

)};