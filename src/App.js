import React,{useEffect, useState} from "react";
// import axios from "axios";
// import {usePosition} from "use-position";
import GetYourLocation from "./GetYourLocation";
import {getWeather} from "./getWeatherDetails";
function App() {

  const styles = {
    centerDiv : {
      // backgroundColor:"cyan",
      color:"cornflowerblue",
      textAlign:"center",
      minHeight:"500px"
    },
    inputField:{
      width:"300px",height:"27px",
      boxShadow:"2px 2px 2px 2px rgba(0,0,0,0.3)",
      marginRight:"10px",borderRadius:"5px",
      padding:"10px",
      border:"1px solid cyan",
      fontSize:"20px"
    },
    inputFieldEmpty:{
      width:"300px",height:"27px",
      boxShadow:"2px 2px 2px 2px rgba(0,0,0,0.3)",
      marginRight:"10px",borderRadius:"5px",
      padding:"10px",
      fontSize:"20px",
      border:"2px solid red"
    },
    getWthrBtn : {
      fontSize:"20px",
      outline:"none",
      boxShadow:"2px 2px 2px 2px rgba(0,0,0,0.3)",
      borderRadius:"5px",
      padding:"10px",
      border:"1px solid cyan",
      color:"cornflowerblue",
      fontWeight:"900",
      marginTop:"30px"
  }
  }

  const [city,setCity] = useState("");
  
  const [emptyField,setEmptyField] = useState(true);
  const [temp,setTemp] = useState(null);
  const [desc,setDesc] = useState(null);
  const [icon,setIcon] = useState(null);
  
  async function getWthr(){
    if(!emptyField){
      const wthrobj = await getWeather(city);
      console.log(wthrobj);
      setTemp(wthrobj.temp);
      setDesc(wthrobj.desc);
      setIcon(wthrobj.icon);

    }else{
      alert("cityName can't be empty");
    }
    
  }

  function handleChange(e){
    setCity(e.target.value);
    setEmptyField(false);
  }
  

  return (
    <div style={styles.centerDiv}>
      <h1 style={{fontSize:"50px"}}>Get Weather</h1>
      <input type="text" name="cityname" placeholder="City Name" onChange={handleChange} style={styles.inputField}/>
      <button onClick={getWthr} style={styles.getWthrBtn}>Get Weather</button>
      {/* <GetWeatherDetails 
        city={city}
      /> */}
      {temp!==null?<>
        <h1>{temp}&deg;C</h1>
        <h2>{desc}</h2>
        <img src={icon} alt="icon"></img>
      </>:""}  
      
      <GetYourLocation />
      
    </div>
  );
}

export default App;