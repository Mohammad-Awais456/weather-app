"use strict";



function updatedata(rdata) {
  let k = 273.15;
  let ctemp = rdata.main.temp;
  ctemp = ctemp - k;
  ctemp = ctemp.toFixed(2); // let mintemp=((rdata.main.temp_min)-k);
  // mintemp=Math.round(mintemp);
  // let maxtemp=((rdata.main.temp_max)-k);
  // maxtemp=Math.round(maxtemp);

  return ctemp;
}

;
let current_date = document.getElementById("date");
let current_day = document.getElementById("day");
let period = "AM";
let monarray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let dayarray = ["Sun", "Mon", "Tue", "Web", "Thur", "Fri", "Sat"];



function setclock(day, month, year, date) {
  // datetime.innerHTML=`${day}|${month},${date}/${year}|${hours}:${minutes} ${period}`;
  current_date.innerHTML = month+","+date+"/"+year;
  current_day.innerHTML = day;
}

function clock() {
  let clock = new Date();
  let month = clock.getMonth();
  let day = clock.getDay();
  let date = clock.getDate();
  let year = clock.getFullYear();


  day = dayarray[day];
  month = monarray[month];
  setclock(day, month, year, date);
}

let inputbtn = document.getElementById("search_button");
let search_field = document.getElementById("searchfield");
let cityname = document.getElementById("cityname");
let countryname = document.getElementById("countryname");
let currenttemp = document.getElementById("currenttemp");
let temp_status = document.getElementById("status");

inputbtn.onclick = function (event) {
  event.preventDefault();
  let searchval = search_field.value;
  searchval=searchval.replace(/ /g, "");
  search_field.value = "";

  if (searchval == "") {
    cityname.innerHTML = "white spaces not allowed !";
    countryname.innerHTML = "";
    currenttemp.innerHTML = "";
  } else {
    const api = "http://api.openweathermap.org/data/2.5/weather?q=" + searchval + "&appid=2bdbcee532f1907edee6a15577eb04d1";
    let data;
    var request = new XMLHttpRequest();
    request.open('GET', api, false);
    request.send();
    data = JSON.parse(request.responseText);

    if (request.status >= "400") {
      console.log("api returns undefined");
      cityname.innerHTML = "Write city name correctly  (*_*)";
      countryname.innerHTML = "";
      currenttemp.innerHTML = "";
    } else {
let tempMood=data.weather[0].main;

    
//condition to check sunny or cloudy
if (tempMood =="Clear") {
  temp_status.innerHTML ="<i  id='weather_icon' class='fas fa-sun' style='color: #eccc68;'></i>";
  }
   else if (tempMood == "Clouds")
    {
  temp_status.innerHTML ='<i id="weather_icon" class="fas fa-cloud " style="color:#f1f2f6;"></i>';
  
  } 
  else if (tempMood == "Rain") 
  {

temp_status.innerHTML ='<i id="weather_icon" class="fas fa-cloud-rain" style="color:skyblue"></i>';
  } 
  else if (tempMood == "Smoke") 
  {

temp_status.innerHTML ='<i id="weather_icon" class="fas fa-smog" style="color: darkgray;filter: drop-shadow(2px 2px 6px gray);"></i>';
  } 
  else
  {
    temp_status.innerHTML = '<i id="weather_icon" class="fas fa-cloud " style="color:#f1f2f6;"></i>';


  }
  



      let temp = updatedata(data);
      console.log(data);
      currenttemp.innerHTML = temp + "°C";
      countryname.innerHTML = data.sys.country;
      cityname.innerHTML = data.name + ",";
    }
  }
};

clock();




  