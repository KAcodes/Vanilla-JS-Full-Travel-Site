const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];


const deadline = document.querySelector('.deadline');
const items = document.querySelectorAll('.deadline-format h4');
const nextTrip = document.getElementById("next-trip").innerHTML;
const trip = nextTrip.split(" ");

const tripYear = Number(trip[2]);
const tripMonth = months.indexOf(trip[1]);
const tripDay = Number(trip[0]);

const tripDate = new Date(tripYear, tripMonth, tripDay, 00, 00, 0);
const tripTime = tripDate.getTime();

//set countdown for timers
function getRemaindingTime() {

    const today = new Date().getTime();

    const timeDiff = tripTime - today;
    //calculate all values in milliseconds
    const oneDay = 24 * 60 * 60 * 1000;
    const oneHour = 60 * 60 * 1000;
    const oneMinute = 60 * 1000;
    // calculate all values
    let days = timeDiff / oneDay;
    days = Math.floor(days);
    let hours = Math.floor((timeDiff % oneDay) / oneHour);
    let minutes = Math.floor((timeDiff % oneHour) / oneMinute);
    let seconds = Math.floor((timeDiff % oneMinute) / 1000);

    // set values array
    const values = [days, hours, minutes, seconds];
    function format(item) {
        if (item < 10) {
            return (item = `0${item}`);
        }
        return item;
    }

    items.forEach(function (item, index) {
        item.innerHTML = format(values[index]);
    });
}

setInterval(getRemaindingTime, 1000);







const continents = document.querySelectorAll(".slide-continent");
const countrylists = document.querySelectorAll(".country-search");


countrylists.forEach((country) => {
    country.addEventListener("click", (e) => {

        const countryName = e.currentTarget.innerHTML;
        //get flag and country info from RestCountry API 
        const displayCountryInfo = async () => {

            const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
            const result = await response.json();
            const flagPic = result[0].flags.svg;
            const thisCapital = result[0].capital;
            const thisPopulation = result[0].population.toLocaleString();
            console.log(result)

            const imagePics = document.querySelectorAll(".country-pics");
            imagePics.forEach((image) => {
                image.setAttribute("src", flagPic)
            })

            const capitals = document.querySelectorAll(".capital-search");
            capitals.forEach((capital) => {
                capital.innerHTML = `Capital: ${thisCapital}`
            })

            const populations = document.querySelectorAll(".population-search");
            populations.forEach((population) => {
                population.innerHTML = `Population: ${thisPopulation}`
            })
        }

        displayCountryInfo();

    })
});






