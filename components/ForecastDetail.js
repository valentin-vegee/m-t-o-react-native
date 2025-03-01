import React from 'react';
import { FlatList, View, Text, Image } from 'react-native';
import styles from '../styles';

const ForecastDetail = ({ selectedDay }) => {
  if (!selectedDay) return null;

  return (
    <FlatList
      style={styles.detailsContainer}
      data={selectedDay}
      keyExtractor={(item) => item.dt.toString()}
      renderItem={({ item }) => {
        const time = new Date(item.dt * 1000).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });
        return (
          <View style={styles.forecastDetail}>
            <Text style={styles.detailTime}>{time}</Text>
            <Text style={styles.detailTemp}>{Math.round(item.main.temp)}°C</Text>
            <Image
              source={{
                uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`,
              }}
              style={styles.detailIcon}
            />
            <Text style={styles.detailDescription}>{item.weather[0].description}</Text>
          </View>
        );
      }}
    />
  );
};

export default ForecastDetail;
