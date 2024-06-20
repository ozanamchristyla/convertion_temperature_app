import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Alert } from 'react-native';
import { MenuProvider, Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { Picker } from '@react-native-picker/picker';

export default function App() {
  const [celsius, setCelsius] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [inputUnit, setInputUnit] = useState('Celsius');
  const [kelvin, setKelvin] = useState(0);
  const [fahrenheit, setFahrenheit] = useState(0);
  const [newton, setNewton] = useState(0);
  const [rankine, setRankine] = useState(0);
  const [reaumur, setReaumur] = useState(0);
  const [nightMode, setNightMode] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (inputValue !== '') {
        const value = parseFloat(inputValue);
        let celsiusValue = 0;
        switch (inputUnit) {
          case 'Celsius':
            celsiusValue = value;
            break;
          case 'Kelvin':
            celsiusValue = value - 273.15;
            break;
          case 'Fahrenheit':
            celsiusValue = (value - 32) * 5 / 9;
            break;
          case 'Newton':
            celsiusValue = value * 100 / 33;
            break;
          case 'Rankine':
            celsiusValue = (value - 491.67) * 5 / 9;
            break;
          case 'Réaumur':
            celsiusValue = value * 5 / 4;
            break;
        }
        setCelsius(celsiusValue);
        setKelvin(celsiusValue + 273.15);
        setFahrenheit((celsiusValue * 9 / 5) + 32);
        setNewton(celsiusValue * 33 / 100);
        setRankine((celsiusValue + 273.15) * 9 / 5);
        setReaumur(celsiusValue * 4 / 5);
      }
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [inputValue, inputUnit]);

  const handleMenuSelect = (value) => {
    if (value === 'about') {
      Alert.alert('About App', 'This is a temperature conversion app.');
    } else if (value === 'share') {
      Alert.alert('Share App', 'Share this app with your friends!');
    } else if (value === 'nightMode') {
      setNightMode(!nightMode);
    }
  };

  return (
    <MenuProvider>
      <ScrollView contentContainerStyle={[styles.container, nightMode && styles.nightMode]}>
        <View style={styles.header}>
          <Text style={styles.title}>Conversion de Température</Text>
          <Menu>
            <MenuTrigger>
              <Text style={styles.menuIcon}>⋮</Text>
            </MenuTrigger>
            <MenuOptions>
              <MenuOption onSelect={() => handleMenuSelect('about')} text='About App' />
              <MenuOption onSelect={() => handleMenuSelect('share')} text='Share App' />
              <MenuOption onSelect={() => handleMenuSelect('nightMode')} text={`Night mode ${nightMode ? 'Off' : 'On'}`} />
            </MenuOptions>
          </Menu>
        </View>
        <View style={styles.inputContainer}>
          <Picker
            selectedValue={inputUnit}
            style={styles.picker}
            onValueChange={(itemValue) => setInputUnit(itemValue)}
          >
            <Picker.Item label="Celsius" value="Celsius" />
            <Picker.Item label="Kelvin" value="Kelvin" />
            <Picker.Item label="Fahrenheit" value="Fahrenheit" />
            <Picker.Item label="Newton" value="Newton" />
            <Picker.Item label="Rankine" value="Rankine" />
            <Picker.Item label="Réaumur" value="Réaumur" />
          </Picker>
          <TextInput
            style={styles.input}
            keyboardType='numeric'
            value={inputValue}
            onChangeText={text => setInputValue(text)}
          />
        </View>
        <View style={styles.resultContainer}>
          <Text style={styles.label}>Celsius</Text>
          <Text style={styles.value}>{celsius.toFixed(2)}</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.resultContainer}>
          <Text style={styles.label}>Kelvin</Text>
          <Text style={styles.value}>{kelvin.toFixed(2)}</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.resultContainer}>
          <Text style={styles.label}>Fahrenheit</Text>
          <Text style={styles.value}>{fahrenheit.toFixed(2)}</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.resultContainer}>
          <Text style={styles.label}>Newton</Text>
          <Text style={styles.value}>{newton.toFixed(2)}</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.resultContainer}>
          <Text style={styles.label}>Rankine</Text>
          <Text style={styles.value}>{rankine.toFixed(2)}</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.resultContainer}>
          <Text style={styles.label}>Réaumur</Text>
          <Text style={styles.value}>{reaumur.toFixed(2)}</Text>
        </View>
      </ScrollView>
    </MenuProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 18,
    backgroundColor: '#fff',
  },
  nightMode: {
    backgroundColor: '#333',
  },
  header: {
    backgroundColor: '#87CEEB',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    textAlign: 'center',
  },
  menuIcon: {
    fontSize: 32,
    padding: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  picker: {
    flex: 1,
    backgroundColor: 'lightgray',
  },
  label: {
    fontSize: 18,
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    width: 100,
    textAlign: 'right',
    fontSize: 18,
    color: '#000',
  },
  resultContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
});