import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import styles from '../styles';

const ForecastList = ({ dailyForecast, setSelectedDay }) => {
  return (
    <View style={styles.forecastContainer}>
      <FlatList
        data={dailyForecast}
        horizontal
        keyExtractor={(item) => item.dateKey}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.forecastButton}
            onPress={() => setSelectedDay(item.details)}
          >
            <Text style={styles.forecastDate}>{item.displayDate}</Text>
            <Text style={styles.forecastTemp}>
              {Math.round(item.min)}° / {Math.round(item.max)}°
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ForecastList;
