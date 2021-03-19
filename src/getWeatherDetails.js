import axios from "axios";


export const getWeather = async(props) =>{
    const city = props;  
    let weather = {
      temp:"",
      desc:"",
      icon:""
    };
    try{
      const res = await axios.post("https://weatherappserverreact.herokuapp.com",{cityname:city});
      
      if(res.status===200){
        weather.temp = res.data.temperature;
        weather.desc = res.data.weatherDescription;
        weather.icon = res.data.weatherIcon;
      }
      
    } catch(err){
      // setEmptyField(true);
      console.log(err);
    }
  return weather;
}
