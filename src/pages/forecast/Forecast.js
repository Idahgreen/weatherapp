import React, { Component } from "react";
import Skycons from "react-skycons";

export default class Forecast extends Component {
  state = { loading: true, weather: [] };

  async componentDidMount() {
    this.setState({
      weather: this.props.weatherData,
      loading: this.props.loading
    });
  }
  render() {
    let weather = this.state.weather;
    let loading = this.state.loading;
    return (
      <div>
        <div>
          <h2>Weekly forecast for Copenhagen, Denmark</h2>
        </div>
        <div className="forecast">
          {loading || !weather ? (
            <div>loading...</div>
          ) : (
            weather.daily.data.map((weatherDaily, index) => {
              //converts the DarkSky API timestamp (UNIX) to UTC time
              let unixTimestamp = weatherDaily.time;
              let milliseconds = unixTimestamp * 1000;
              const dateObject = new Date(milliseconds);

              const UTCTime = dateObject.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric"
              });

              return (
                <div className="forecast-weekly" id={index}>
                  <div>
                    <h3>{UTCTime}</h3>
                  </div>
                  <Skycons
                    icon={weatherDaily.icon.replace(/-/g, "_").toUpperCase()}
                    autoplay={true}
                    color="#A3C7E7"
                    style={{ width: "auto", height: "50px" }}
                  />
                  <div>{weatherDaily.summary}</div>
                  <div>{weatherDaily.temperatureHigh.toFixed(0)}°C</div>
                  <div>{weatherDaily.temperatureLow.toFixed(0)}°C</div>
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  }
}
