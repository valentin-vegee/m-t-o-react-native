// WeatherApp.js
import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';

// Composants séparés
import Header from './components/Header';
import ForecastList from './components/ForecastList';
import ForecastDetail from './components/ForecastDetail';

// Styles globaux
import styles from './styles';

const API_KEY = 'dd1e0d670b6085bd1792e9a04f98b936';

const WeatherApp = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission refusée');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      fetchWeather(location.coords.latitude, location.coords.longitude);
    })();
  }, []);

  const fetchWeather = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=fr`
      );
      const data = await response.json();
      setWeather(data);
      fetchForecast(lat, lon);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchForecast = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=fr`
      );
      const data = await response.json();
      setForecast(data.list);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  // Regrouper la prévision par date
  const groupedForecast = forecast.reduce((acc, item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});

  // Extraire min/max par jour
  const dailyForecast = Object.keys(groupedForecast).map((date) => {
    const temps = groupedForecast[date].map((item) => item.main.temp);
    return {
      date,
      min: Math.min(...temps),
      max: Math.max(...temps),
      details: groupedForecast[date],
    };
  });

  return (
    <View style={styles.container}>
      {/* Header : ville + température actuelle */}
      <Header weather={weather} />

      {/* Liste horizontale des jours */}
      <ForecastList dailyForecast={dailyForecast} setSelectedDay={setSelectedDay} />

      {/* Détails horaires du jour sélectionné */}
      <ForecastDetail selectedDay={selectedDay} />
    </View>
  );
};

export default WeatherApp;
