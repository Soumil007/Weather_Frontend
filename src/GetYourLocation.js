import React,{useState} from 'react';
import axios from "axios";
import {usePosition} from "use-position";
import {getWeather} from "./getWeatherDetails";
function GetYourLocation(){

    const styles={
        getLocBtn : {
            fontSize:"20px",
            outline:"none",
            boxShadow:"2px 2px 2px 2px rgba(0,0,0,0.3)",
            borderRadius:"5px",
            padding:"10px",
            border:"1px solid cyan",
            color:"cornflowerblue",
            fontWeight:"900",
            marginTop:"30px"
        },
        centerDiv : {
            // backgroundColor:"cyan",
            color:"cornflowerblue",
            textAlign:"center",
            minHeight:"500px"
          }
    }

    const [loc,setLoc] = useState("");
    const watch = true;
    const {
        latitude,
        longitude,
    } = usePosition(watch);

    const [temp,setTemp] = useState(null);
    const [desc,setDesc] = useState(null);
    const [icon,setIcon] = useState(null);
    async function getWthr(loc){
    
        const wthrobj = await getWeather(loc);
        console.log(wthrobj);
        setTemp(wthrobj.temp);
        setDesc(wthrobj.desc);
        setIcon(wthrobj.icon);
        
    }
    async function getLocation(){
        const location  = await axios.post("https://weatherappserverreact.herokuapp.com/weather",{lat:latitude,long:longitude});
        getWthr(location.data.geocodedCity)
        setLoc(location.data.geocodedCity);    
    }
//   console.log(loc);
    
  return <div style={styles.centerDiv} >
        <button onClick={getLocation} style={styles.getLocBtn}>Get Location</button>
        {/* <h1>Latitude:{latitude}</h1>    
        <h1>Longitude:{longitude}</h1> */}
        {loc!==""?
            <>
                {/* <h1>Your City is : {loc}</h1> */}
                <h1>Weather Details in {loc}</h1>
                <h1>{temp}&deg;C</h1>
                <h2>{desc}</h2>
                <img src={icon} alt="icon" />
            </>
        :""}
    </div>

}

export default GetYourLocation;