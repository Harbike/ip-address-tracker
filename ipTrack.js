"use strict";

// API key for IP lookup
const apiKey = "at_fVcOP00Ki1Z8vpGVoi7GIWiRoeITE";
const inputField = document.querySelector(".input_ip");
const searchButton = document.querySelector(".icon-arrow");
const ipDisplay = document.querySelector(".ip");
const locationDisplay = document.querySelector(".locationDisplay");
const timezoneDisplay = document.querySelector(".timezone");
const ispDisplay = document.querySelector(".ispDisplay");
const mapContainer = document.querySelector(".tracker_phase-map");
let map;

// map container - dimensions
mapContainer.style.height = "60vh";
mapContainer.style.width = "100%";
mapContainer.style.display = "block";

// Async function to get IP info from the API
async function getIpInfo(ipAddress) {
  const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ipAddress}`;

  try {
    const response = await fetch(url);  // Fetch IP info from the API
    const data = await response.json();  // Parse the response to JSON

    console.log(data);  // Log the data for debugging

    // Display IP details with fallback for missing data
    ipDisplay.textContent = data.ip || "IP not found";
    locationDisplay.textContent = data.location?.country || "Country not found";
    timezoneDisplay.textContent = data.location?.timezone || "Timezone unavailable";
    ispDisplay.textContent = data.isp || "ISP unavailable";

    // update the map with the location data if available
    if (data.location?.lat && data.location?.lng) {
      updateMap(data.location.lat, data.location.lng); // Update map if lat/lng available
    } else {
      // Default to a global center if lat/lng is not provided
      updateMap(51.505, -0.09);
    }

  } catch (error) {
    console.log("Error fetching data:", error);  // Log error if any
  }
}

// Function to initialize or update the map
function updateMap(lat, lng) {
  if (!map) {
    // Initialize map if not already initialized
    map = L.map(mapContainer).setView([lat, lng], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);
  } else {
    // Update the map view and marker
    map.setView([lat, lng], 13);
  }

  // Add a marker to the map
  L.marker([lat, lng]).addTo(map).bindPopup('Location found.').openPopup();
}

// Handle the search button click event
searchButton.addEventListener("click", () => {
  const input = inputField.value.trim();  // Get input from the user
  if (input) {
    getIpInfo(input);  // Call the function with the user's IP address
  }
});
// Trigger search on 'Enter' key press
inputField.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const input = inputField.value.trim();
    if (input) getIpInfo(input);
  }
});

// Initialize map on page load with default coordinates (London)
updateMap(51.505, -0.09);  // Default location in case no IP is searched