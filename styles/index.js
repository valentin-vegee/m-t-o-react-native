import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F2F1',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#009688',
  },

  header: {
    backgroundColor: '#009688',
    paddingVertical: 40,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 10,
  },
  city: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  temperature: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#fff',
  },
  description: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
    fontStyle: 'italic',
  },
  icon: {
    width: 120,
    height: 120,
  },

  forecastContainer: {
    marginVertical: 10,
  },
  forecastButton: {
    width: 110,
    height: 110,
    backgroundColor: '#4DB6AC',
    borderRadius: 10,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forecastDate: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 4,
  },
  forecastTemp: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },

  detailsContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  forecastDetail: {
    backgroundColor: '#B2DFDB',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    alignItems: 'center',
  },
  detailTime: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#004D40',
  },
  detailTemp: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#004D40',
  },
  detailIcon: {
    width: 50,
    height: 50,
  },
  detailDescription: {
    fontSize: 16,
    color: '#004D40',
    marginTop: 4,
  },
});
