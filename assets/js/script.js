const apiKey = 'e0a5a474ab61de557c949047ef184fee';
let city;

var timeDate = setInterval(function() {
    var date = dayjs().format('ddd, DD MMM YYYY')
    var time = dayjs().format('HH : MM')    
    $('#time').text(time)
    $('#date').text(date)        
}, 1000)


function handleForm(e) {
    e.preventDefault()

    const search = $('#search-input').val();
        console.log(search);
        city = search
        getWeather()
}

$('#search-button').on('click', handleForm);

function getWeather() {
    
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=e0a5a474ab61de557c949047ef184fee&units=metric`)
    
    .then(function(response){
        return response.json();
    })
    .then(function(data) {
        console.log(data);
    
    
    $('.forecast-section').empty();
    
    
    weatherData = {
      city: city,
      forecast: [],
    };
    
    for(var i = 0; i <= 34; i += 8) {
        // set i === 6 so it will iterate through the data skipping 6 every iteration
        var forecast = $('<div>').addClass('forecast forecast-container');
        
        var forecastSection = $('.forecast-section');
        forecastSection.addClass('forecast-section');
        forecastSection.append(forecast);
        
            var iconUrl = `https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png`;
            var icon = $('<img>').attr('src', iconUrl);
            var day =  $('<p>').text(dayjs(data.list[i].dt_txt).format('dddd'));
            var report = $('<p>').text(data.list[i].weather[0].description);
            var high = $('<p>').text(`Temp: ${data.list[i].main.temp}  \u00B0`);
            var feelsLike = $('<p>').text(`Feels like: ${data.list[i].main.feels_like}  \u00B0`);
            var wind = $('<p>').text(`Wind: ${data.list[i].wind.speed} kts ${data.list[i].wind.deg} \u00B0 `);
        
        forecast.append(icon, day, report, high, feelsLike, wind);
        
        
        //create an object with the weather data so it can be stored to local storage as an object 
        // easily retrievable format
        var forecastData = {
            iconUrl: `https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png`,
            icon: $('<img>').attr('src', iconUrl),
            day:  $('<p>').text(dayjs(data.list[i].dt_txt).format('dddd')),
            report: $('<p>').text(data.list[i].weather[0].description),
            high: $('<p>').text(`Temp: ${data.list[i].main.temp}  \u00B0`),
            feelsLike: $('<p>').text(`Feels like: ${data.list[i].main.feels_like}  \u00B0`),
            wind: $('<p>').text(`Wind: ${data.list[i].wind.speed} kts ${data.list[i].wind.deg} \u00B0 `),
        }

        weatherData.forecast.push(forecastData)
    };

    localStorage.setItem('weather-' + city, JSON.stringify(weatherData));
    console.log(weatherData);
    

  $('#search-history');


   for (var i = 1; i <= 1; i++) {
    var button = $('<button>').addClass('search-history-btn btn btn-outline-primary');
    $('#search-history').append(button)
    button.text(city)
    var buttonData = {
        city: city,
        className: button.attr('class'),
        text: button.text()
    };
    localStorage.setItem('button-' + city, JSON.stringify(buttonData));
}
        
    })
    
}

function retrieveButtonsFromLocalStorage() {
    Object.keys(localStorage).forEach(function(key) {
        if (key.startsWith('button-')) {
            var buttonData = JSON.parse(localStorage.getItem(key));
            var button = $('<button>').addClass(buttonData.className);
            button.text(buttonData.text);
            $('#search-history').append(button);
            console.log(button);

            button.on('click', function(e) {
                console.log(e.target);
                getWeather(city = e.target.innerText)
                return;
                
            })
        }
    });
}

retrieveButtonsFromLocalStorage()


