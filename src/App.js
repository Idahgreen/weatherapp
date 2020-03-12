import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Forecast from "./pages/forecast/Forecast";
import Main from "./pages/main/Main";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      weather: []
    };
  }

  async componentDidMount() {
    const url =
      "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/087a6fba0b35094c379fa30b4628fcb5/55.676098,12.568337?units=ca";
    const res = await fetch(url);
    const data = await res.json();
    this.setState({ weather: { data }, loading: false });
    // console.log(this.state.weather);
  }
  render() {
    let weatherData = this.state.weather.data;
    let loading = this.state.loading;
    console.log(weatherData);
    return (
      <Router>
        <div className="App">
          <nav>
            <ul>
              <Link to="/" style={{ textDecoration: "none" }}>
                Home
              </Link>
            </ul>
            <ul>
              <Link to="/forecast" style={{ textDecoration: "none" }}>
                {" "}
                Weekly Forecast
              </Link>
            </ul>
          </nav>

          <Switch>
            <Route
              exact
              path="/"
              component={props => (
                <Main weatherData={weatherData} loading={loading} {...props} />
              )}
            ></Route>

            <Route
              path="/forecast"
              component={props => (
                <Forecast
                  weatherData={weatherData}
                  loading={loading}
                  {...props}
                />
              )}
            ></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
