const reportJokes: Joke[] = [];
let currentJoke: Joke;
type Joke = {
  joke: string;
  score?: number;
  date: Date;
};

function printJoke() {
  const randomNumber: number = Math.random();
  let apiUrl: string;

  let headers: { [key: string]: string } = {
    Accept: "application/json",
  };

  if (randomNumber < 0.5) {
    apiUrl = "https://icanhazdadjoke.com/";
    headers = {
      ...headers,
    };
  } else {
    apiUrl = "https://api.api-ninjas.com/v1/jokes";
    headers = {
      ...headers,
      "X-Api-Key": "HJD2gqc4YWsYH8n2mHYbcQ==4npjThAysWE0WVI5",
    };
  }

  fetch(apiUrl, { headers })
    .then((response) => response.json())
    .then((data) => {
      const joke: string =
        apiUrl === "https://icanhazdadjoke.com/" ? data.joke : data[0].joke;
      console.log(apiUrl);
      console.log(joke);

      document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
              <div>
                  ${joke}
              </div>
          `;

      currentJoke = { joke: joke, score: undefined, date: new Date() };
    });
}

function updateReportJokes() {
  reportJokes.push(currentJoke);
  console.log("currentJoke", currentJoke);
  console.log("Array", reportJokes);
}

function saveScore(score: number) {
  currentJoke.score = score;
  console.log(currentJoke);
}

function manageNextJokeButton() {
  printJoke();
  updateReportJokes();
}

printJoke();

document
  .getElementById("button")
  ?.addEventListener("click", manageNextJokeButton);
document
  .getElementById("button1")
  ?.addEventListener("click", () => saveScore(1));
document
  .getElementById("button2")
  ?.addEventListener("click", () => saveScore(2));
document
  .getElementById("button3")
  ?.addEventListener("click", () => saveScore(3));

function showWeatherInfo() {
  fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=41.3888&longitude=2.159&current=temperature_2m,relative_humidity_2m,wind_speed_10m"
  )
    .then((response) => response.json())
    .then((data) => {
      // Extraemos los datos relevantes
      const currentWeather = data.current;

      const dateTimeParts: string[] = currentWeather.time.split("T");
      const formattedDateTime: string = dateTimeParts[0];

      const currentWeatherMessage: string = `Barcelona now: ${formattedDateTime}<br>
                                      Current Temperature: ${currentWeather.temperature_2m}°C<br>
                                      Humidity: ${currentWeather.relative_humidity_2m}%<br>
                                      Wind Speed: ${currentWeather.wind_speed_10m} m/s`;

      document.getElementById("weather-info")!.innerHTML =
        currentWeatherMessage;
    });
}

showWeatherInfo();
