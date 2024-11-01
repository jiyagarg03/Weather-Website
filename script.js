const apiUrl =
  "https://api.weatherapi.com/v1/current.json?key=19189ca52b544b6db0a135745242810";
const locationInput = document.getElementById("locationInput");
const searchButton = document.getElementById("searchButton");
const locationName = document.getElementById("location");
const weatherIcon = document.getElementById("weather-icon");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const loadingT = document.getElementById("loadingT");
const parentDiv = document.getElementsByClassName("weather-info");

searchButton.addEventListener("click", () => {
  const location = locationInput.value;
  if (location === "") {
    alert("Please enter a location.");
  } else {
    //   loadingT.style.display = "none";
    //    parentDiv.style.display = "none";
    getWeatherData(location);
  }
});

let loading = false;
async function getWeatherData(location) {
  loading = true;
  parentDiv[0].style.display = "none";
  loadingT.style.display = "block";

  try {
    const wait = (t) =>
      new Promise((resolve, reject) => setTimeout(resolve, t));
    const wait2sec = await wait(1000);

    const response = await fetch(`${apiUrl}&q=${location}`);
    const data = await response.json();

    if (response.ok) {
      locationName.textContent = data.location.name;
      temperature.textContent = data.current.temp_c;
      description.textContent = data.current.condition.text;
      weatherIcon.innerHTML = `<img src="${data.current.condition.icon}">`;

      //   parentDiv.style.display = "block";
    } else {
      alert("Please elnter a valid location.");
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
  } finally {
    loading = false;
    loadingT.style.display = "none";
    parentDiv[0].style.display = "block";
  }
}
