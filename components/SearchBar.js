// components/SearchBar.js
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import styles from '../styles';

const SearchBar = ({ onSubmit }) => {
  const [city, setCity] = useState('');

  const handleSubmit = () => {
    if (city.trim().length > 0) {
      onSubmit(city);
      setCity('');
    }
  };

  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Rechercher une ville..."
        placeholderTextColor="#888"
        value={city}
        onChangeText={setCity}
        onSubmitEditing={handleSubmit}
      />
      <TouchableOpacity style={styles.searchButton} onPress={handleSubmit}>
        <Text style={styles.searchButtonText}>OK</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
