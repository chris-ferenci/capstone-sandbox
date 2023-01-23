import React from 'react';
import Home from './pages/Home';
import "./App.css";
import Landing from './pages/Landing';
import Insights from './pages/Insights';

// Router
import { Routes, Route } from 'react-router-dom';


function App() {

  return(

    <>
      <Routes>
      <Route path="/insights" element={<Insights />}>
        </Route>
        <Route path="/welcome" element={<Landing />}>
        </Route>
        <Route path="/" element={<Home />}>
        </Route>
      </Routes>
    </>

     

   )

}

function hitAPI () {
  fetch('https://api.reliefweb.int/v1/reports?appname=apidoc&query[value]=jobs').then(res => res.json().then((json_res) => {
  }))
}

export default App;
