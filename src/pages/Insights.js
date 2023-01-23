import { useState, useEffect } from "react";
import axios from 'axios';
import './insights.css';

import {
    ResponsiveContainer,
    AreaChart,
    XAxis,
    YAxis,
    Area,
    Tooltip,
    CartesianGrid,
} from "recharts";
import {format, parseISO, subDays} from 'date-fns';


const chartData = [];



for(let num = 30; num >= 0; num--){
    chartData.push({
        date: subDays(new Date(), num).toISOString().substring(0,10),
        value: 1 + Math.random()
    })
}


function Insights(){

    const OCKEY = "321734280caf4f7689fa6a74cb9d5d60";

    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [selectedCoordinates, setSelectedCoordinates] = useState('');
    const [selectedLat, setSelectedLat] = useState('')
    const [selectedLon, setSelectedLon] = useState('')

    const [city, setCity] = useState('');
    const [data, setData] = useState('')

    // SET LOCATION LIST, INITIAL API HIT 
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(
              `https://api.openaq.org/v2/locations?country=US&has_geo=true`
            );
            console.log(response.data.results)
            setLocations(response.data.results);
          } catch (error) {
            console.error(error);
          }
        };
        fetchData();
      }, []);



    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await axios.get(
            `https://api.openaq.org/v2/locations?limit=100&page=1&offset=0&sort=desc&radius=100000&country=US&city={city}&order_by=lastUpdated`
            );
            console.log(response.data)
            
        } catch (error) {
            console.error(error);
        }
    };

    // HANDLE LOCATION CLICK
    const handleLocationClick = async location => {
        try {
          const response = await axios.get(
            `https://api.openaq.org/v2/locations?location=${location}`
          );

          setSelectedLocation(response.data.results);

          // Save Coordinates in state for Geocoding Purposes
          setSelectedCoordinates(...selectedLocation)
          setSelectedLat(selectedCoordinates.coordinates.latitude)
          setSelectedLon(selectedCoordinates.coordinates.longitude)
          console.log(selectedLat, selectedLon)

        //   setSelectedCoordinates([{
        //     lat: selectedLoc.coordinates.latitude,
        //     lon: selectedLoc.coordinates.longitude
        //   }])

        //   console.log(selectedCoordinates)

        // REVERSE GEOCODING TO GET MORE INFORMATION ABOUT LOCATION
        // USING OPENCAGE GEOCODING SERVICE
            const OCResponse = await axios.get(
                `https://api.opencagedata.com/geocode/v1/json?q=${selectedLat}+${selectedLon}&key=${OCKEY}`
            );

            console.log(OCResponse.data.results);

         

        } catch (error) {
          console.error(error);
        }
      };

    

    return (
    <div className="insights-container">
        <div className="sidebar flex flex-col flex-wrap">
            <h1>Locations in the US</h1>
            <ul>
                {locations.map((location, index) => (
                <li className="grow btn btn-loc-list" key={index} onClick={() => handleLocationClick(location.name)}>
                    {location.name}
                </li>
                ))}
            </ul>
        </div>

        <div className="insights-body">
        {selectedLocation && (
            // <div>
            //   <h2>Selected Location</h2>
            //   <p></p>

            //   {/* <pre>{JSON.stringify(selectedLocation, null, 2)}</pre> */}

            // </div>
            selectedLocation.map((loc, index) => (
                <div>
                    <h3 className="text-sm font-bold">Sensor Name</h3>
                    <p>{loc.name}</p>
                    <h3 className="text-sm font-bold">City</h3>
                    <p>{loc.city}</p>
                    <h3 className="text-sm font-bold">Sensor Type</h3>
                    <p>{loc.sensorType}</p>
                    <h3 className="text-sm font-bold">Latitude</h3>
                    <p>{loc.coordinates.latitude}</p>
                    <h3 className="text-sm font-bold">Longitude</h3>
                    <p>{loc.coordinates.longitude}</p>
                    <h3 className="text-sm font-bold">Parameters</h3>

                
                    {loc.parameters.map((parameter, index) => {
                        return(
                            <div className="grid grid-cols-4">
                                <div className="bg-gray-200 mb-2">
                                <h3 className="text-sm font-bold">Display Name</h3>
                                <p>{parameter.displayName}</p>
                                </div>

                                <div className="bg-gray-200 mb-2">
                                <h3 className="text-sm font-bold">Last Updated</h3>
                                <p>{parameter.lastUpdated}</p>
                                </div>

                                <div className="bg-gray-200 mb-2">
                                <h3 className="text-sm font-bold">Latest Value</h3>
                                <p>{parameter.lastValue}</p>
                                </div>

                                <div className="bg-gray-200 mb-2">
                                <h3 className="text-sm font-bold">Measurement Unit</h3>
                                <p>{parameter.unit}</p>
                                </div>

                            </div>
                        )
                    }
                    )}
                


                </div>
            ))

        )}
        </div>

        <div>
        <form onSubmit={handleSubmit}>
            <label>
            City:
            <input
                type="text"
                value={city}
                onChange={e => setCity(e.target.value)}
            />
            </label>
            <button type="submit">Search</button>
        </form>
        {data && (
            <pre>
            {JSON.stringify(data, null, 2)}
            </pre>
        )}
        </div>

        <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={chartData}>
                <defs>
                    <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#0e7071" stopOpacity={0.4} />
                        <stop offset="75%" stopColor="#0e7071" stopOpacity={0.05} />
                    </linearGradient>
                </defs>

                <Area dataKey="value" stroke="#0e7071" fill="url(#color)" />

                <XAxis dataKey="date" 
                axisLine={false} 
                tickLine={false}
                tickFormatter={str => {
                    const date = parseISO(str);
                    if (date.getDate() % 7 === 0){
                        return format(date, "MMM, d")
                    }
                    return "";
                }}/>

                <YAxis 
                dataKey="value" 
                axisLine={false} 
                tickLine={false} 
                tickCount={8}
                tickFormatter={number => `$${number.toFixed(2)}`}
                />

                <Tooltip />

                <CartesianGrid opacity={0.2} vertical={false} stroke="#0e7071"/>

            </AreaChart>
        </ResponsiveContainer>

    {/* END INSIGHTS CONTAINER */}
    </div> 
    
    )
}

export default Insights;