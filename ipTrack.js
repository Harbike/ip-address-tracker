"use strict";

const apiKey = "at_fVcOP00Ki1Z8vpGVoi7GIWiRoeITE";
const inputField = document.querySelector(".input_ip");
const searchButton = document.querySelector(".icon-arrow");
const ipDisplay = document.querySelector(".ip");
const locationDisplay = document.querySelector(".locationDisplay");
const timezoneDisplay = document.querySelector(".timezone");
const ispDisplay = document.querySelector(".ispDisplay");
const mapContainer = document.querySelector(".tracker_phase-map");
let map;
let data = null;

async function getIpInfo(ipAddress) {
  const url = `https://geo.ipify.org/api/v2/country?apiKey=${apiKey}&ipAddress=${ipAddress}`

  try {
    const response = await fetch(url)
    data = await response.json()
    console.log(data); 
    ipDisplay.textContent = data.ip;
    locationDisplay.textContent = data.location.country;
    // timezoneDisplay.textContent = data.location.timezone;
    // ispDisplay.textContent = data.isp; 
    if(!timezoneDisplay.textContent) {
      timezoneDisplay.textContent = 'null';
    } else {
      timezoneDisplay.textContent = data.location.timezone;
    }
    if(!ispDisplay.textContent) {
      ispDisplay.textContent = 'null';
    } else {
      ispDisplay.textContent = data.isp; 
    }
  } catch (error) {
    console.log(error); 
  }
}

// click
searchButton.addEventListener("click", () => {
  // get input field value
  let input = inputField.value;
  if (input) {
    // add get request
    getIpInfo(input)
  }
});


