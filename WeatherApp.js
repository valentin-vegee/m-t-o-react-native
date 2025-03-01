import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';

import SearchBar from './components/SearchBar';
import Header from './components/Header';
import ForecastList from './components/ForecastList';
import ForecastDetail from './components/ForecastDetail';

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

  const fetchWeatherByCity = async (city) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=fr`
      );
      const data = await response.json();
      if (data.cod !== 200) {
        console.log('Erreur :', data.message);
        setLoading(false);
        return;
      }
      setWeather(data);

      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=fr`
      );
      const forecastData = await forecastResponse.json();
      setForecast(forecastData.list);
      setSelectedDay(null);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  const groupedForecast = forecast.reduce((acc, item) => {
    const dateObj = new Date(item.dt * 1000);
    const dateKey = dateObj.toLocaleDateString('fr-FR'); 
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(item);
    return acc;
  }, {});

  const dailyForecast = Object.keys(groupedForecast).map((dateKey) => {
    const temps = groupedForecast[dateKey].map((item) => item.main.temp);

    const firstItem = groupedForecast[dateKey][0];
    const dateObj = new Date(firstItem.dt * 1000);
    const options = { day: 'numeric', month: 'long' }; 
    const formattedDate = dateObj.toLocaleDateString('fr-FR', options);

    return {
      dateKey, 
      displayDate: formattedDate, 
      min: Math.min(...temps),
      max: Math.max(...temps),
      details: groupedForecast[dateKey],
    };
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <SearchBar onSubmit={fetchWeatherByCity} />

        <Header weather={weather} />

        <ForecastList dailyForecast={dailyForecast} setSelectedDay={setSelectedDay} />

        <ForecastDetail selectedDay={selectedDay} />
      </View>
    </SafeAreaView>
  );
};

export default WeatherApp;
