import React, { useState, useCallback } from "react";
import styles from "./WeatherApp.module.scss";
import data from "../../db/data";
import { WeatherDisplay } from "../WeatherDisplay/WeatherDisplay.jsx";

const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

export const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const searchCity = useCallback(
    debounce((cityName) => {
      if (!cityName) {
        setWeather(null);
        setError("");
        return;
      }

      const foundKey = Object.keys(data).find((key) =>
        key.toLowerCase().includes(cityName.toLowerCase())
      );

      if (foundKey) {
        setWeather(data[foundKey]);
        setError("");
      } else {
        setWeather(null);
        setError("error");
      }
    }, 500),
    []
  );

  const handleChange = (e) => {
    const value = e.target.value.trim();
    setCity(value);
    searchCity(value);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Прогноз погоды</h1>
      <input
        className={styles.input}
        type="text"
        placeholder="Введите город"
        value={city}
        onChange={handleChange}
      />
      {error && <p className={styles.error}>{error}</p>}
      {weather && <WeatherDisplay data={weather} city={city} />}
    </div>
  );
};
