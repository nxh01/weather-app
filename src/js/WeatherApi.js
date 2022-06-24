
//  ===============  Variables ===============

// Naming variables that we will use
const navInput = document.querySelector('.search')



var apiKey = '5bfe7dfb63643534add03d8a6fd4ab5d'
var apiBase = 'https://api.openweathermap.org/data/2.5/weather?q='

// Content Variables
var cityHtml = document.getElementById('city')
var latitudeHtml = document.getElementById('latitude')
var longitudeHtml = document.getElementById('longitude')
var cloudsHtml = document.getElementById('clouds')
var humidityHtml = document.getElementById('humidity')
var windHtml = document.getElementById('wind')

// Headers Variables
var cityHeader = document.getElementById('city-header')
var tempHeader = document.getElementById('temp-header')
var weatherDescMain = document.getElementById('weather-desc-main')
var weatherDesc = document.getElementById('weather-desc')

var Time = document.getElementById('time')


// Date
function NowDate() {
    const date = new Date();

    const day = date.getDate();
    const month = date.getMonth() + 1; // getMonth() returns month from 0 to 11
    const year = date.getFullYear();

    const str = `${day}/${month}/${year}`;

    function getMonthName(month) {
        const d = new Date();
        d.setMonth(month - 1);
        const monthName = d.toLocaleString("default", { month: "long" });
        return monthName;
    }

    var DateTime = getMonthName(month) + ' ' + day + ' ' + year

    Time.innerHTML = DateTime

}


// Validating the text that the user has searched
navInput.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        FetchingData(e);
    }
})

// Fetching API Data From the input search enter
function FetchingData(e) {
    var inputValue = e.target.value

    // Fetching API and getting the json data
    fetch(apiBase + inputValue + '&units=metric&APPID=' + apiKey)
        .then(res => res.json())
        .then(data => {
            var city = data['name']
            var temp = data['main']['temp'] + '&#176;'
            var clouds = data['clouds']['all'] + '%'
            var latitude = data['coord']['lat']
            var longitude = data['coord']['lon']
            var humidity = data['main']['humidity'] + '%'
            var main = data['weather']['0']['main']
            var description = data['weather']['0']['description']
            var wind = data['wind']['speed'] + 'km/h'

            var sky = data['weather']['0']['id']

            // Pushing the data into HTML Content
            cityHtml.innerHTML = city
            latitudeHtml.innerHTML = latitude
            longitudeHtml.innerHTML = longitude
            cloudsHtml.innerHTML = clouds
            humidityHtml.innerHTML = humidity
            windHtml.innerHTML = wind

            // Pushing the data into HTML Headers
            tempHeader.innerHTML = temp
            cityHeader.innerHTML = city
            weatherDescMain.innerHTML = main
            weatherDesc.innerHTML = description

            // ================= Change Weather Background ===========

            // ThunderStorm Sky
            if (sky == 200 || sky == 201 || sky == 202 || sky == 210 || sky == 211 || sky == 212 || sky == 221 || sky == 230 || sky == 231 || sky == 232) {
                document.body.classList.add('thunder_storm')

                document.body.classList.remove('clear_sky')
                document.body.classList.remove('drizzle')
                document.body.classList.remove('rain')
                document.body.classList.remove('snow')
                document.body.classList.remove('fog')
                document.body.classList.remove('cloudy')
            }

            // Drizzle Sky
            else if (sky == 300 || sky == 301 || sky == 302 || sky == 310 || sky == 311 || sky == 312 || sky == 313 || sky == 314 || sky == 321) {
                document.body.classList.add('drizzle')

                document.body.classList.remove('clear_sky')
                document.body.classList.remove('thunder_storm')
                document.body.classList.remove('rain')
                document.body.classList.remove('snow')
                document.body.classList.remove('fog')
                document.body.classList.remove('cloudy')
            }

            // Rain Sky
            else if (sky == 500 || sky == 501 || sky == 502 || sky == 503 || sky == 504 || sky == 511 || sky == 520 || sky == 521 || sky == 522 || sky == 531) {
                document.body.classList.add('rain')

                document.body.classList.remove('clear_sky')
                document.body.classList.remove('thunder_storm')
                document.body.classList.remove('drizzle')
                document.body.classList.remove('snow')
                document.body.classList.remove('fog')
                document.body.classList.remove('cloudy')
            }

            // Snow Sky
            else if (sky == 600 || sky == 601 || sky == 602 || sky == 611 || sky == 612 || sky == 613 || sky == 615 || sky == 616 || sky == 620 || sky == 621 || sky == 622) {
                document.body.classList.add('snow')

                document.body.classList.remove('clear_sky')
                document.body.classList.remove('thunder_storm')
                document.body.classList.remove('drizzle')
                document.body.classList.remove('rain')
                document.body.classList.remove('fog')
                document.body.classList.remove('cloudy')
            }

            // Fog Sky
            else if (sky == 600 || sky == 601 || sky == 602 || sky == 611 || sky == 612 || sky == 613 || sky == 615 || sky == 616 || sky == 620 || sky == 621 || sky == 622) {
                document.body.classList.add('fog')

                document.body.classList.remove('clear_sky')
                document.body.classList.remove('thunder_storm')
                document.body.classList.remove('drizzle')
                document.body.classList.remove('rain')
                document.body.classList.remove('snow')
                document.body.classList.remove('cloudy')
            }

            // Cloudy Sky
            else if (sky == 801 || sky == 802 || sky == 803 || sky == 804) {
                document.body.classList.add('cloudy')

                document.body.classList.remove('clear_sky')
                document.body.classList.remove('thunder_storm')
                document.body.classList.remove('drizzle')
                document.body.classList.remove('rain')
                document.body.classList.remove('snow')
                document.body.classList.remove('fog')
            }

            // Clear Sky
            else if (sky == 800) {
                document.body.classList.add('clear_sky')

                document.body.classList.remove('thunder_storm')
                document.body.classList.remove('drizzle')
                document.body.classList.remove('rain')
                document.body.classList.remove('snow')
                document.body.classList.remove('fog')
                document.body.classList.remove('cloudy')
            }

            // If Error Show only cloudy
            else {
                document.body.classList.add('cloudy')

                document.body.classList.remove('clear_sky')
                document.body.classList.remove('thunder_storm')
                document.body.classList.remove('drizzle')
                document.body.classList.remove('rain')
                document.body.classList.remove('snow')
                document.body.classList.remove('fog')
            }
        })

    // Reset the value of the search input to empty
    navInput.value = ''

    // Pushing Date
    NowDate()
}


// Searching with search button
const searchButton = document.getElementById('search-icon')

searchButton.addEventListener('click', (e) => {
    // Getting input Value
    var inputValue = document.getElementById('search').value

    // Fetching API and getting the json data
    fetch(apiBase + inputValue + '&units=metric&APPID=' + apiKey)
        .then(res => res.json())
        .then(data => {
            var city = data['name']
            var temp = data['main']['temp'] + '&#176;'
            var clouds = data['clouds']['all'] + '%'
            var latitude = data['coord']['lat']
            var longitude = data['coord']['lon']
            var humidity = data['main']['humidity'] + '%'
            var main = data['weather']['0']['main']
            var description = data['weather']['0']['description']
            var wind = data['wind']['speed'] + 'km/h'

            var sky = data['weather']['0']['id']

            // Pushing the data into HTML Content
            cityHtml.innerHTML = city
            latitudeHtml.innerHTML = latitude
            longitudeHtml.innerHTML = longitude
            cloudsHtml.innerHTML = clouds
            humidityHtml.innerHTML = humidity
            windHtml.innerHTML = wind

            // Pushing the data into HTML Headers
            tempHeader.innerHTML = temp
            cityHeader.innerHTML = city
            weatherDescMain.innerHTML = main
            weatherDesc.innerHTML = description

            // ================= Change Weather Background ===========

            // ThunderStorm Sky
            if (sky == 200 || sky == 201 || sky == 202 || sky == 210 || sky == 211 || sky == 212 || sky == 221 || sky == 230 || sky == 231 || sky == 232) {
                document.body.classList.add('thunder_storm')

                document.body.classList.remove('clear_sky')
                document.body.classList.remove('drizzle')
                document.body.classList.remove('rain')
                document.body.classList.remove('snow')
                document.body.classList.remove('fog')
                document.body.classList.remove('cloudy')
            }

            // Drizzle Sky
            else if (sky == 300 || sky == 301 || sky == 302 || sky == 310 || sky == 311 || sky == 312 || sky == 313 || sky == 314 || sky == 321) {
                document.body.classList.add('drizzle')

                document.body.classList.remove('clear_sky')
                document.body.classList.remove('thunder_storm')
                document.body.classList.remove('rain')
                document.body.classList.remove('snow')
                document.body.classList.remove('fog')
                document.body.classList.remove('cloudy')
            }

            // Rain Sky
            else if (sky == 500 || sky == 501 || sky == 502 || sky == 503 || sky == 504 || sky == 511 || sky == 520 || sky == 521 || sky == 522 || sky == 531) {
                document.body.classList.add('rain')

                document.body.classList.remove('clear_sky')
                document.body.classList.remove('thunder_storm')
                document.body.classList.remove('drizzle')
                document.body.classList.remove('snow')
                document.body.classList.remove('fog')
                document.body.classList.remove('cloudy')
            }

            // Snow Sky
            else if (sky == 600 || sky == 601 || sky == 602 || sky == 611 || sky == 612 || sky == 613 || sky == 615 || sky == 616 || sky == 620 || sky == 621 || sky == 622) {
                document.body.classList.add('snow')

                document.body.classList.remove('clear_sky')
                document.body.classList.remove('thunder_storm')
                document.body.classList.remove('drizzle')
                document.body.classList.remove('rain')
                document.body.classList.remove('fog')
                document.body.classList.remove('cloudy')
            }

            // Fog Sky
            else if (sky == 600 || sky == 601 || sky == 602 || sky == 611 || sky == 612 || sky == 613 || sky == 615 || sky == 616 || sky == 620 || sky == 621 || sky == 622) {
                document.body.classList.add('fog')

                document.body.classList.remove('clear_sky')
                document.body.classList.remove('thunder_storm')
                document.body.classList.remove('drizzle')
                document.body.classList.remove('rain')
                document.body.classList.remove('snow')
                document.body.classList.remove('cloudy')
            }

            // Cloudy Sky
            else if (sky == 801 || sky == 802 || sky == 803 || sky == 804) {
                document.body.classList.add('cloudy')

                document.body.classList.remove('clear_sky')
                document.body.classList.remove('thunder_storm')
                document.body.classList.remove('drizzle')
                document.body.classList.remove('rain')
                document.body.classList.remove('snow')
                document.body.classList.remove('fog')
            }

            // Clear Sky
            else if (sky == 800) {
                document.body.classList.add('clear_sky')

                document.body.classList.remove('thunder_storm')
                document.body.classList.remove('drizzle')
                document.body.classList.remove('rain')
                document.body.classList.remove('snow')
                document.body.classList.remove('fog')
                document.body.classList.remove('cloudy')
            }

            // If Error Show only cloudy
            else {
                document.body.classList.add('cloudy')

                document.body.classList.remove('clear_sky')
                document.body.classList.remove('thunder_storm')
                document.body.classList.remove('drizzle')
                document.body.classList.remove('rain')
                document.body.classList.remove('snow')
                document.body.classList.remove('fog')
            }

        })

    navInput.value = ''

    // Pushing Date
    NowDate()
})

// Favorite Search
const FavoriteSearch = document.querySelectorAll('.recent')

FavoriteSearch.forEach(element => {
    element.addEventListener('click', (e) => {
        // Variable of the input value
        var targetVal = e.target.innerHTML
        var inputValue = document.getElementById('search').value
        // Pushing the target val into input value
        inputValue = targetVal

        // Fetching API and getting the json data
        fetch(apiBase + inputValue + '&units=metric&APPID=' + apiKey)
            .then(res => res.json())
            .then(data => {
                var city = data['name']
                var temp = data['main']['temp'] + '&#176;'
                var clouds = data['clouds']['all'] + '%'
                var latitude = data['coord']['lat']
                var longitude = data['coord']['lon']
                var humidity = data['main']['humidity'] + '%'
                var main = data['weather']['0']['main']
                var description = data['weather']['0']['description']
                var wind = data['wind']['speed'] + 'km/h'

                var sky = data['weather']['0']['id']


                // Pushing the data into HTML Content
                cityHtml.innerHTML = city
                latitudeHtml.innerHTML = latitude
                longitudeHtml.innerHTML = longitude
                cloudsHtml.innerHTML = clouds
                humidityHtml.innerHTML = humidity
                windHtml.innerHTML = wind

                // Pushing the data into HTML Headers
                tempHeader.innerHTML = temp
                cityHeader.innerHTML = city
                weatherDescMain.innerHTML = main
                weatherDesc.innerHTML = description

                // ================= Change Weather Background ===========

                // ThunderStorm Sky
                if (sky == 200 || sky == 201 || sky == 202 || sky == 210 || sky == 211 || sky == 212 || sky == 221 || sky == 230 || sky == 231 || sky == 232) {
                    document.body.classList.add('thunder_storm')

                    document.body.classList.remove('clear_sky')
                    document.body.classList.remove('drizzle')
                    document.body.classList.remove('rain')
                    document.body.classList.remove('snow')
                    document.body.classList.remove('fog')
                    document.body.classList.remove('cloudy')
                }

                // Drizzle Sky
                else if (sky == 300 || sky == 301 || sky == 302 || sky == 310 || sky == 311 || sky == 312 || sky == 313 || sky == 314 || sky == 321) {
                    document.body.classList.add('drizzle')

                    document.body.classList.remove('clear_sky')
                    document.body.classList.remove('thunder_storm')
                    document.body.classList.remove('rain')
                    document.body.classList.remove('snow')
                    document.body.classList.remove('fog')
                    document.body.classList.remove('cloudy')
                }

                // Rain Sky
                else if (sky == 500 || sky == 501 || sky == 502 || sky == 503 || sky == 504 || sky == 511 || sky == 520 || sky == 521 || sky == 522 || sky == 531) {
                    document.body.classList.add('rain')

                    document.body.classList.remove('clear_sky')
                    document.body.classList.remove('thunder_storm')
                    document.body.classList.remove('drizzle')
                    document.body.classList.remove('snow')
                    document.body.classList.remove('fog')
                    document.body.classList.remove('cloudy')
                }

                // Snow Sky
                else if (sky == 600 || sky == 601 || sky == 602 || sky == 611 || sky == 612 || sky == 613 || sky == 615 || sky == 616 || sky == 620 || sky == 621 || sky == 622) {
                    document.body.classList.add('snow')

                    document.body.classList.remove('clear_sky')
                    document.body.classList.remove('thunder_storm')
                    document.body.classList.remove('drizzle')
                    document.body.classList.remove('rain')
                    document.body.classList.remove('fog')
                    document.body.classList.remove('cloudy')
                }

                // Fog Sky
                else if (sky == 600 || sky == 601 || sky == 602 || sky == 611 || sky == 612 || sky == 613 || sky == 615 || sky == 616 || sky == 620 || sky == 621 || sky == 622) {
                    document.body.classList.add('fog')

                    document.body.classList.remove('clear_sky')
                    document.body.classList.remove('thunder_storm')
                    document.body.classList.remove('drizzle')
                    document.body.classList.remove('rain')
                    document.body.classList.remove('snow')
                    document.body.classList.remove('cloudy')
                }

                // Cloudy Sky
                else if (sky == 801 || sky == 802 || sky == 803 || sky == 804) {
                    document.body.classList.add('cloudy')

                    document.body.classList.remove('clear_sky')
                    document.body.classList.remove('thunder_storm')
                    document.body.classList.remove('drizzle')
                    document.body.classList.remove('rain')
                    document.body.classList.remove('snow')
                    document.body.classList.remove('fog')
                }

                // Clear Sky
                else if (sky == 800) {
                    document.body.classList.add('clear_sky')

                    document.body.classList.remove('thunder_storm')
                    document.body.classList.remove('drizzle')
                    document.body.classList.remove('rain')
                    document.body.classList.remove('snow')
                    document.body.classList.remove('fog')
                    document.body.classList.remove('cloudy')
                }

                // If Error Show only cloudy
                else {
                    document.body.classList.add('cloudy')

                    document.body.classList.remove('clear_sky')
                    document.body.classList.remove('thunder_storm')
                    document.body.classList.remove('drizzle')
                    document.body.classList.remove('rain')
                    document.body.classList.remove('snow')
                    document.body.classList.remove('fog')
                }

            })

        // Reset The value of the input
        navInput.value = ''

        // Pushing Date
        NowDate()
    })
});

// Landing City
function LandingCity() {
    // Fetching API and getting the json data
    fetch(apiBase + 'London' + '&units=metric&APPID=' + apiKey)
        .then(res => res.json())
        .then(data => {
            var city = data['name']
            var temp = data['main']['temp'] + '&#176;'
            var clouds = data['clouds']['all'] + '%'
            var latitude = data['coord']['lat']
            var longitude = data['coord']['lon']
            var humidity = data['main']['humidity'] + '%'
            var main = data['weather']['0']['main']
            var description = data['weather']['0']['description']
            var wind = data['wind']['speed'] + 'km/h'

            var sky = data['weather']['0']['id']

            // Pushing the data into HTML Content
            cityHtml.innerHTML = city
            latitudeHtml.innerHTML = latitude
            longitudeHtml.innerHTML = longitude
            cloudsHtml.innerHTML = clouds
            humidityHtml.innerHTML = humidity
            windHtml.innerHTML = wind

            // Pushing the data into HTML Headers
            tempHeader.innerHTML = temp
            cityHeader.innerHTML = city
            weatherDescMain.innerHTML = main
            weatherDesc.innerHTML = description

            // ================= Change Weather Background ===========

            // ThunderStorm Sky
            if (sky == 200 || sky == 201 || sky == 202 || sky == 210 || sky == 211 || sky == 212 || sky == 221 || sky == 230 || sky == 231 || sky == 232) {
                document.body.classList.add('thunder_storm')

                document.body.classList.remove('clear_sky')
                document.body.classList.remove('drizzle')
                document.body.classList.remove('rain')
                document.body.classList.remove('snow')
                document.body.classList.remove('fog')
                document.body.classList.remove('cloudy')
            }

            // Drizzle Sky
            else if (sky == 300 || sky == 301 || sky == 302 || sky == 310 || sky == 311 || sky == 312 || sky == 313 || sky == 314 || sky == 321) {
                document.body.classList.add('drizzle')

                document.body.classList.remove('clear_sky')
                document.body.classList.remove('thunder_storm')
                document.body.classList.remove('rain')
                document.body.classList.remove('snow')
                document.body.classList.remove('fog')
                document.body.classList.remove('cloudy')
            }

            // Rain Sky
            else if (sky == 500 || sky == 501 || sky == 502 || sky == 503 || sky == 504 || sky == 511 || sky == 520 || sky == 521 || sky == 522 || sky == 531) {
                document.body.classList.add('rain')

                document.body.classList.remove('clear_sky')
                document.body.classList.remove('thunder_storm')
                document.body.classList.remove('drizzle')
                document.body.classList.remove('snow')
                document.body.classList.remove('fog')
                document.body.classList.remove('cloudy')
            }

            // Snow Sky
            else if (sky == 600 || sky == 601 || sky == 602 || sky == 611 || sky == 612 || sky == 613 || sky == 615 || sky == 616 || sky == 620 || sky == 621 || sky == 622) {
                document.body.classList.add('snow')

                document.body.classList.remove('clear_sky')
                document.body.classList.remove('thunder_storm')
                document.body.classList.remove('drizzle')
                document.body.classList.remove('rain')
                document.body.classList.remove('fog')
                document.body.classList.remove('cloudy')
            }

            // Fog Sky
            else if (sky == 600 || sky == 601 || sky == 602 || sky == 611 || sky == 612 || sky == 613 || sky == 615 || sky == 616 || sky == 620 || sky == 621 || sky == 622) {
                document.body.classList.add('fog')

                document.body.classList.remove('clear_sky')
                document.body.classList.remove('thunder_storm')
                document.body.classList.remove('drizzle')
                document.body.classList.remove('rain')
                document.body.classList.remove('snow')
                document.body.classList.remove('cloudy')
            }

            // Cloudy Sky
            else if (sky == 801 || sky == 802 || sky == 803 || sky == 804) {
                document.body.classList.add('cloudy')

                document.body.classList.remove('clear_sky')
                document.body.classList.remove('thunder_storm')
                document.body.classList.remove('drizzle')
                document.body.classList.remove('rain')
                document.body.classList.remove('snow')
                document.body.classList.remove('fog')
            }

            // Clear Sky
            else if (sky == 800) {
                document.body.classList.add('clear_sky')

                document.body.classList.remove('thunder_storm')
                document.body.classList.remove('drizzle')
                document.body.classList.remove('rain')
                document.body.classList.remove('snow')
                document.body.classList.remove('fog')
                document.body.classList.remove('cloudy')
            }

            // If Error Show only cloudy
            else {
                document.body.classList.add('cloudy')

                document.body.classList.remove('clear_sky')
                document.body.classList.remove('thunder_storm')
                document.body.classList.remove('drizzle')
                document.body.classList.remove('rain')
                document.body.classList.remove('snow')
                document.body.classList.remove('fog')
            }

        })

    // Pushing Date
    NowDate()

}
LandingCity();