import React, { Component } from "react";
import Skycons from "react-skycons";

export default class Main extends Component {
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
          <h2> Current weather for Copenhagen, Denmark</h2>
        </div>
        <div className="forecast-current">
          {loading || !weather ? (
            <div>loading...</div>
          ) : (
            <div>
              <div>{weather.currently.summary}</div>
              <div>{weather.currently.temperature.toFixed(0)}°C</div>
              <Skycons
                icon={weather.currently.icon.replace(/-/g, "_").toUpperCase()}
                autoplay={true}
                color="#A3C7E7"
                style={{ width: "auto", height: "150px" }}
              />
              {/* toFixed(0) prevents decimals */}

              <div className="forecast-current-details">
                <div>
                  <p>Feels like:</p>
                  <p>
                    {weather.currently.apparentTemperature.toFixed(0)}
                    °C
                  </p>
                </div>
                <div>
                  <p>Chance of precipitation:</p>
                  <p>{weather.currently.precipProbability.toFixed(0)}%</p>
                </div>
                <div>
                  <p>Wind Speed:</p>
                  <p>
                    {weather.currently.windSpeed.toFixed(1).replace(".", ",")}{" "}
                    m/s
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
