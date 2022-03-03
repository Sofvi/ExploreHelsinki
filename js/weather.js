function saa( cityID ) {
    var key = '77fa5083f376659f1844079991d6326b';
    fetch('https://api.openweathermap.org/data/2.5/weather?id=' +cityID+ '&appid=' + key + '&units=metric')  
    .then(function(resp) { return resp.json() }) 
    .then(function(data) {
      this.tulostaSaa(data);
 
})
.catch(function() {
      
})


}
  
 window.onload = function() {
    saa( 658225 );
    
  }
  function tulostaSaa (data){
      const {name} = data;
      const {icon, description} = data.weather[0];
      const {temp, humidity} = data.main;
      const {sunrise} = data.sys;
      const {sunset} = data.sys;
      const {feels_like} = data.main;
      const {speed} = data.wind;
      const rSun = convertTime(sunrise);
      const sSun = convertTime(sunset);

      console.log(name,icon,description,temp, humidity, rSun, sSun);
      document.querySelector(".temp").innerHTML = temp + 'ºC';
      document.querySelector(".tuuli").innerHTML = "Wind: " + speed + " m/s"
      document.querySelector(".tuntuu").innerHTML = "Feels like: "+ feels_like + "ºC";
      document.querySelector(".icon").src ="https://openweathermap.org/img/wn/" + icon + ".png"
      document.querySelector(".kuvaus").innerHTML = description;
      document.querySelector(".kosteus").innerHTML = "Humidity: " + humidity + "%"
      document.querySelector(".sun").innerHTML = "Sunrise: " + rSun
    document.querySelector(".sunSet").innerHTML = "Sunset: " + sSun


  }

  function convertTime(unixTime){
    let dt = new Date(unixTime * 1000)
    let h = dt.getHours()
    let m = "0" + dt.getMinutes()
    let t = h + ":" + m.substring(-2)
    return t
  }
