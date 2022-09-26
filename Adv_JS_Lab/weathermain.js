    const api = {
        key: "7e3f21edee540e6110af347b55eb1ab2",
        base: "https://api.openweathermap.org/data/2.5/",
        units: "metric"
    }//setting App key, URL, and metrics

    let lang="en-US";//default language
    if(window.navigator){
        if (navigator.geolocation) {           
            navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
        } 
        //Get latitude and longitude;
        function successFunction(position) {
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;

            getResultsLatLong(lat,lon);
        }

        function errorFunction(e){
            console.log(e.message);
        }

        // https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
        lang = window.navigator.language;
    }

    function getResultsLatLong(lat , lon) {
        // console.log("city is", cityName);
         const url=`${api.base}weather?lat=${lat}&lon=${lon}&units=${api.units}&appid=${api.key}`;
         //console.log(url);
 
         fetch(url).then(response=>{return response.json()})
         .then(value=>{displayResults( value)})
         .catch(error=>{
             console.log("error is----"+error.message);
             if (error.message==="responseReceived.sys is undefined"){
                window.alert("Could not find this location.");
             } else if (error.cod===undefined){
                window.alert("Location not found /Invalid City name.");               
            } else {
                window.alert("Error occured"+error);
            }
         });
     }

    //Date resolution
    const options1 = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    const dt = new Date();
    const dtFormat = new Intl.DateTimeFormat(lang, options1);
    // console.log(dtFormat.format(dt));
    document.getElementById("day_date").innerHTML = dtFormat.format(dt);


    //City Update , weather update
    document.getElementById("myCity")
      .addEventListener("keypress", updateCityName);
  

    function updateCityName(event) {
       const cityValue=document.getElementById("myCity").value;
       //console.log(cityValue);
        if(event.keyCode==13) {
            getResults(cityValue);
        }       
    }

    function getResults(cityName) {
       // console.log("city is", cityName);
        const url=`${api.base}weather?q=${cityName}&units=${api.units}&appid=${api.key}`;
        //console.log(url);

        fetch(url).then(response=>{return response.json()})
        .then(value=>{displayResults( value)})
        .catch(error=>{
            // console.log("error is----"+error.message+"code"+error.cod+"---"+error);

            if (error.message==="responseReceived.sys is undefined") {
                window.alert("Location not found /Invalid City name.");                
            } else if (error.cod===undefined){
                window.alert("Location not found /Invalid City name.");               
            } else {
                window.alert("Error occured"+error);
            }
        });
    }

    //display results in the HTML
    function displayResults(responseReceived){
        document.querySelector(".cityEntered").innerText = `${responseReceived.name}, ${responseReceived.sys.country}`;
        document.querySelector("#mainDegrees").innerHTML = `${Math.round(responseReceived.main.temp)}`;
        document.querySelector(".weather_now").innerText = `${responseReceived.weather[0].main}`;
        document.querySelector(".range_now").innerHTML= `${Math.round(responseReceived.main.temp_min)}&degc / ${Math.round(responseReceived.main.temp_max)}&degc`;
    }

