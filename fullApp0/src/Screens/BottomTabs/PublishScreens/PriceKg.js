import { StyleSheet, Text, View, Pressable, TouchableOpacity, Button,Alert } from 'react-native';
import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { colors } from '../../../../Config/theme/colors';
import { ThemeContext } from '../../../../contexts/ThemeContext';
import { useDataContext } from '../../../../contexts/DataContext';
import { useFlightsApi } from '../../../../APIs/TripApi';

const PriceKg = () => {
  /* ------trip creation testing------ */
  // const { createTrip } = useFlightsApi();
  // const tripData = {
  //   from: {
  //     street: "123 Main St",
  //     houseNumber: "456",
  //     city: "New York",
  //     country: "USA",
  //     zipCode: "10001"
  //   },
  //   to: {
  //     street: "789 Maple Ave",
  //     houseNumber: "101",
  //     city: "Toronto",
  //     country: "Canada",
  //     zipCode: "M5H 2N2"
  //   },
  //   departureTime: "2024-07-01T08:00:00.000Z",
  //   arrivalTime: "2024-07-01T12:00:00.000Z",
  //   price: 100,
  //   weight: 50,
  //   remainingWeight: 50,
  //   currency: "USD",
  //   weightUnit: "kg",
  //   description: "Sample trip description",
  //   supportedItemUids: ["item1", "item2"]
  // };

  // const handleCreateTrip = async () => {
  //   try {
  //     const createdTrip = await createTrip(tripData);
  //     if (createdTrip) {
  //       Alert.alert('Success', 'Trip created successfully');
  //     } else {
  //       Alert.alert('Error', 'Failed to create trip');
  //     }
  //   } catch (error) {
  //     Alert.alert('Error', 'An error occurred while creating the trip');
  //   }
  // };
  /* ------trip creation testing------ */

  const { theme } = useContext(ThemeContext);
  const activeColors = colors[theme.mode];
  const { userData, updateUserData } = useDataContext();
  const navigation = useNavigation();

  const handleNextPress = () => {
    navigation.navigate('Trips');
    console.log(userData.pricePerKg);
    console.log(userData);
  };

  return (
    <View style={[styles.container, { backgroundColor: activeColors.bgcolor }]}>
      <View style={styles.content}>
        <View style={styles.TextSection}>
          <Text style={[styles.TextHeader, { color: activeColors.TextColor }]}>
            Set your price per kilo in US Dollar
          </Text>
        </View>

        <View style={styles.countingSection}>
          <Pressable onPress={() => updateUserData({ pricePerKg: Math.max(5, userData.pricePerKg - 0.5) })}>
            <AntDesign name="minuscircleo" size={30} color="#dc661f" />
          </Pressable>

          <Pressable>
            <Text style={[styles.operationText, { color: activeColors.TextColor }]}>
              {userData.pricePerKg}
            </Text>
          </Pressable>

          <Pressable onPress={() => updateUserData({ pricePerKg: Math.min(11, userData.pricePerKg + 0.5) })}>
            <AntDesign name="pluscircleo" size={30} color="#dc661f" />
          </Pressable>
        </View>

        <View style={styles.recomButtonContainer}>
          <Text style={styles.recomButton}>Recommended price: $5 - $11</Text>
        </View>

        <View style={styles.idealTextSection}>
          <Text style={styles.idealText}>
            Ideal price for this trip! you'll be getting customers in no time.
          </Text>
        </View>

        <TouchableOpacity style={styles.nextButton} onPress={handleNextPress}>
          <Text style={[styles.nextText, { color: activeColors.TextColor }]}>
            Next
          </Text>
          <FontAwesome name="arrow-circle-right" size={50} color="#dc661f" style={{ paddingLeft: 6 }} />
        </TouchableOpacity>
        {/* <View>
        <Button title="Create Trip" onPress={handleCreateTrip} />
        </View> */}
      </View>
    </View>
  );
};

export default PriceKg;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    marginTop: 15,
    marginHorizontal: 20,
  },
  TextSection: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextHeader: {
    fontSize: 29,
    fontWeight: '700',
  },
  countingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 25,
  },
  operationText: {
    fontSize: 45,
    fontWeight: 'bold',
  },
  recomButtonContainer: {
    alignItems: 'center',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#dc661f',
  },
  recomButton: {
    color: '#fff',
    fontSize: 18,
  },
  idealTextSection: {
    marginVertical: 10,
  },
  idealText: {
    color: 'gray',
    fontSize: 18,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: '30%',
  },
  nextText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});
