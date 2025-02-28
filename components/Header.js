import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from '../styles';

const Header = ({ weather }) => {
  if (!weather) return null;

  return (
    <View style={styles.header}>
      <Text style={styles.city}>{weather.name}</Text>
      <Text style={styles.temperature}>{Math.round(weather.main.temp)}°C</Text>
      <Text style={styles.description}>{weather.weather[0].description}</Text>
      <Image
        source={{
          uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`,
        }}
        style={styles.icon}
      />
    </View>
  );
};

export default Header;
