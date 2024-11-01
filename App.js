import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';


const API_KEY = 'c67f2f42d2a562dec22002362c3eb757';

export default function App() {
  const [city, setCity] = useState('Olinda');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=pt_br`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error('Erro ao buscar dados do clima:', error);
      alert('Não foi possível obter os dados do clima. Verifique a cidade e tente novamente.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Previsão do Tempo</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite o nome da cidade"
        value={city}
        onChangeText={(text) => setCity(text)}
      />

      <Button title="Buscar Clima" onPress={fetchWeather} />

      {loading ? (
        <Text style={styles.loading}>Carregando...</Text>
      ) : (
        weatherData && (
          <View style={styles.weatherContainer}>
            <Text style={styles.city}>{weatherData.name}</Text>
            <Text style={styles.temp}>{weatherData.main.temp}°C</Text>
            <Text style={styles.desc}>{weatherData.weather[0].description}</Text>
          </View>
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: '100%',
  },
  loading: {
    marginTop: 20,
    fontSize: 18,
  },
  weatherContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  city: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  temp: {
    fontSize: 36,
  },
  desc: {
    fontSize: 18,
    fontStyle: 'italic',
  },
});
