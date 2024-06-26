import { SafeAreaView } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import moment from "moment";
import { colors } from "../../../../Config/theme/colors";
import { ThemeContext } from "../../../../contexts/ThemeContext";
import { useDataContext } from "../../../../contexts/DataContext";



const DepartureDate = () => {

  const formatDate = (date) => {
    return moment(date).format('MMM DD, YYYY');
  };

  const { theme } = useContext(ThemeContext);
  const activeColors = colors[theme.mode];
  const { userData, updateUserData } = useDataContext();

  const navigation = useNavigation();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    const depDate = formatDate(date);
    
    updateUserData({ dep_date: depDate });
    hideDatePicker();
  };

  
  const handleNextPress = () => {
    navigation.navigate("Arrival date");
    console.log(userData.dep_date);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: activeColors.bgcolor }]}
    >
      <View style={styles.content}>
        <View style={styles.TextSection}>
          <Text style={[styles.TextHeader, { color: activeColors.TextColor }]}>
            When are you leaving?
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: activeColors.TextColor }]}>
            Departure date
          </Text>
          <View style={styles.dateInputContainer}>
            <TextInput
              placeholder="select a date"
              style={[
                styles.dateInput,
                userData.dep_date && {
                  color: activeColors.TextColor,
                  fontWeight: "bold",
                  fontSize: 17,
                },
              ]}
              value={
                userData.dep_date || ""
              }
              editable={false}
              placeholderTextColor="gray"
            />
            <TouchableOpacity onPress={showDatePicker}>
              <AntDesign
                name="calendar"
                size={34}
                color="#F0F0F0"
                style={{
                  backgroundColor: "#dc661f",
                  borderRadius: 10,
                  padding: 5,
                  marginRight: 5,
                }}
              />
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleDateConfirm}
              onCancel={hideDatePicker}
              //display="spinner"
              textColor="#000"
            />
          </View>
        </View>

        {userData.dep_date && (
          <TouchableOpacity style={styles.nextButton} onPress={handleNextPress}>
            <Text style={[styles.nextText, { color: activeColors.TextColor }]}>Next</Text>
            <FontAwesome
              name="arrow-circle-right"
              size={50}
              color="#dc661f"
              style={{ paddingLeft: 6 }}
            />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default DepartureDate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    marginTop: 15,
    marginHorizontal: 20,
  },
  TextSection: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  TextHeader: {
    fontSize: 29,
    fontWeight: "700",
  },
  inputContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  dateInputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateInput: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    flex: 1,
    marginRight: 10,
    fontSize: 16,
  },
  nextButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: "60%",
  },
  nextText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});
