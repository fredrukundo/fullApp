// import { View, Text,StyleSheet,ScrollView,TextInput,TouchableOpacity,Modal, ActivityIndicator } from 'react-native'
// import React,{useState, useContext} from 'react'
// import TextAreaInput from '../../../components/TextAreaInput';
// import { Entypo,AntDesign,Ionicons,MaterialCommunityIcons } from '@expo/vector-icons';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';
// import moment from 'moment';
// import PhoneInput from 'react-native-phone-number-input';
// import { colors } from '../../../../Config/theme/colors';
// import { ThemeContext } from '../../../../contexts/ThemeContext';
// import { AuthContext } from '../../../../Authsrc/src/contexts/AuthContext';
// import { useFetchUser } from '../../../../APIs/useFetchUser ';


// const categories = [
//   'Documents',
//   'Clothes',
//   'Shoes',
//   'Electronics',
//   'Jewellery',
//   'Food',
//   'Cosmetics',
//   'Others',
// ];


// const EditProfile = () => {
// const {LogedInUser} = useContext(AuthContext);
// const username = LogedInUser.username;
// console.log(username);
// const {user, isLoading, error} = useFetchUser(username);

// if (isLoading) {
//   return <ActivityIndicator />;
// }

// if (error) {
//   return <Text>{error.message}</Text>;
// }

// if (!user) {
//   return <Text>No user found</Text>;
// }

// // theme color
// const {theme} = useContext(ThemeContext);
// const activeColors = colors[theme.mode];

// // hooks
// const firstname = user?.firstName || "testing";
// const lastname = user?.lastName || "testing";
// const addr = user?.address || "testing";
// const bd = user?.birthDate || "testing";
// console.log(firstname);

// const [fName, setFName] = useState(firstname);
// const [LName, setLName] = useState(LogedInUser.attributes.given_name);
// const [address, setAddress] = useState("");
// const [phone, setPhone] = useState("");
// const [birth, setBirth] = useState("");
// const [nationality, setNationality] = useState("");
// const [email, setEmail] = useState(LogedInUser.attributes.email);
// const [PhoneNumber, setPhoneNumber] = useState(LogedInUser.attributes.phone_number);
// // Gender
// const [gender, setGender] = useState(""); // default to male
// const [showModal, setShowModal] = useState(false); // set the state of the modal to hidden by default

//   const selectGender = (selectedGender) => {
//     setGender(selectedGender);
//     setShowModal(false);
//   };

// // Dates
// const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
//   const [selectedBdDate, setSelectedBdDate] = useState(null);

//   const showDatePicker = () => {
//     setDatePickerVisibility(true);
//   };

//   const hideDatePicker = () => {
//     setDatePickerVisibility(false);
//   };

//   const handleDateConfirm = (date) => {
//     setSelectedBdDate(date);
//     hideDatePicker();
//   };
//   // Category items
//   const [selectedCategories, setSelectedCategories] = useState([]);

//   const handleCategorySelect = (category) => {
//     if (selectedCategories.includes(category)) {
//       setSelectedCategories(selectedCategories.filter((item) => item !== category));
//     } else {
//       setSelectedCategories([...selectedCategories, category]);
//     }
//   };

//   const handleSend = () => {
//     // Implement sending logic here
    
//     console.log('send pressed');
//   };

 
// console.log(user);


//   return (
//     <View style={[styles.container,{backgroundColor:activeColors.bgcolor}]}>
//     <ScrollView>
//       <View style={styles.content}>

//       <View style={styles.infoHead}>
//         <Entypo name="info-with-circle" size={20} color="#dc661f" />
//         <Text style={styles.title2}>Information</Text>
//       </View>
//       <View style={{marginBottom:10}}>
//       <Text style={styles.infoSection}>
//       Completing your profile accurately and fully earns you 1 point out of 5 towards getting the
//        "Certified" badge . Make sure to fill out your profile completely for a better chance 
//        of obtaining this badge.
//         </Text>
//         </View>
//       <Text style={[styles.texts,{color:activeColors.TextColor}]}>First Name</Text>
//          <TextAreaInput
//            values={fName}
//            setValue={setFName}
//            defaultValue={fName}
//            keyboardType="default"
           
//           />
//       <Text style={[styles.texts,{color:activeColors.TextColor}]}>Last Name</Text>
//          <TextAreaInput
//            values={LName}
//            setValue={setLName}
//            defaultValue={LName}
//            keyboardType="default"
//           />
//       <Text style={[styles.texts,{color:activeColors.TextColor}]}>Email</Text>
//          <TextAreaInput
//            values={email}
//            setValue={setEmail}
//            defaultValue={email}
//            keyboardType="email-address"
//           />
//       <Text style={[styles.texts,{color:activeColors.TextColor}]}>Where do you live?</Text>
//          <TextAreaInput
//            values={address}
//            setValue={setAddress}
//            placeholder="Address"
//            keyboardType="default"
//           />
//       <Text style={[styles.texts,{color:activeColors.TextColor}]}>Phone</Text>
//          {/* <TextAreaInput
//            values={phone}
//            setValue={setPhone}
//            defaultValue={tel}
//            keyboardType="numeric"
//           /> */}
//           <PhoneInput
//         defaultValue={PhoneNumber}
//         defaultCode="MA"
//         // withShadow
//         onChangeFormattedText={(text)=>{
//           setPhoneNumber(text)
//         }}
//         containerStyle={styles.inputButton1}
//         // textContainerStyle={styles.PhoneInputText}

//       />
//       <Text style={[styles.texts,{color:activeColors.TextColor}]}>Gender</Text>
//           {/* updated gender */}
//           <View style={styles.body}>
//       <View style={{ flex: 1 }}>
//         <View style={styles.inputButton}>
//           <TextInput
//             style={{ flex: 1, padding: 10 }}
//             placeholder="Gender"
//             value={gender}
//             editable={false} // make the input non-editable
//           />
//           <View style={styles.inputButton2} />
//           <TouchableOpacity onPress={() => setShowModal(true)}>
//           <MaterialCommunityIcons name="gender-male" size={24} color="black" style={styles.icon}/>  
//           </TouchableOpacity>
//         </View>
//       </View>
//       <Modal 
//         animationType="fade"
//         transparent={true}
//         visible={showModal}
//         onRequestClose={() => setShowModal(false)}
//       >
//         <TouchableOpacity
//           style={styles.modalContainer}
//           onPress={() => setShowModal(false)}
//         >
//           <View style={styles.modalContent}>
//             <TouchableOpacity onPress={() => selectGender('Male')}>
//               <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                 <Ionicons
//                   name={gender === 'Male' ? 'radio-button-on' : 'radio-button-off'}
//                   size={24}
//                   color={gender === 'Male' ? 'blue' : 'gray'}
//                 />
//                 <Text style={{ marginLeft: 10 }}>Male</Text>
//               </View>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={() => selectGender('Female')}>
//               <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
//                 <Ionicons
//                   name={gender === 'Female' ? 'radio-button-on' : 'radio-button-off'}
//                   size={24}
//                   color={gender === 'Female' ? 'blue' : 'gray'}
//                 />
//                 <Text style={{ marginLeft: 10 }}>Female</Text>
//               </View>
//             </TouchableOpacity>
//           </View>
//         </TouchableOpacity>
//       </Modal>
//     </View>
//     {/* date of birth */}

//           <View style={styles.inputContainer}>
//             <Text style={[styles.texts,{color:activeColors.TextColor}]}>Date of birth</Text>
//             <View style={styles.dateInputContainer}>
            
//               <TextInput
//                 style={[styles.dateInput, selectedBdDate && styles.selectedDateInput]}
//                 value={selectedBdDate ? moment(selectedBdDate).format('MMMM DD, YYYY') : 'date of birth'}
//                 editable={false}
//               />
//               <TouchableOpacity onPress={showDatePicker}>
//               <View style={{backgroundColor:"#dc661f", borderRadius:10, padding:5, marginRight:5}}>
//               <AntDesign name="calendar" size={34} color="#F0F0F0"/>
//               </View>
//               </TouchableOpacity>
//               <DateTimePickerModal
//                  isVisible={isDatePickerVisible}
//                  mode="date"
//                  onConfirm={handleDateConfirm}
//                  onCancel={hideDatePicker}
//                  textColor='#000'
//                 />
//             </View>
//           </View>


//       <Text style={[styles.texts,{color:activeColors.TextColor}]}>Nationality</Text>
//          <TextAreaInput
//            values={nationality}
//            setValue={setNationality}
//            defaultValue="Not set"
//            keyboardType="default"
//           />
//         {/* category items */}
//         <View >
//       <Text style={[styles.title,{color:activeColors.TextColor}]}>Select which categories of items you wish to send</Text>
//       <View style={styles.categoriesContainer}>
//         {categories.map((category) => (
//           <TouchableOpacity
//             key={category}
//             onPress={() => handleCategorySelect(category)}
//             style={[
//               styles.categoryContainer,
//               { backgroundColor: selectedCategories.includes(category) ? "#dc661f" : '#ccc' },
//               selectedCategories.includes(category) && styles.selectedCategory,
//             ]}
//           >
//             <View style={styles.checkbox}>
//               {selectedCategories.includes(category) && (
//                 <Ionicons name="checkmark" size={24} color="white" />
//               )}
//             </View>
//             <Text style={[styles.categoryText, { color: selectedCategories.includes(category) ? 'white' : 'black' }]}>
//               {category}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//       <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
//         <Text style={styles.sendButtonText}>Send</Text>
//       </TouchableOpacity>
//     </View>
//       </View>
//       </ScrollView>
//     </View>
//   )
// }
// const styles = StyleSheet.create({
//     container:{
//         flex:1,
//         // backgroundColor:'#fff'
//       },
//     texts:{
//         fontWeight:"bold",
//         fontSize:16,
//       },
//       content: {
//         marginHorizontal:20,
//      },
//      infoSection: {
//         fontSize: 16,
//         color:colors.grayColor
//       },
//       infoHead: {
//         flexDirection:'row',
//         marginVertical:10
//       },
//       title2: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         marginLeft:5,
//         color:"#dc661f"
//       },
//       inputContainer: {
//         marginBottom: 20,
//       },
//       label: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         marginBottom: 10,
//       },
    
//       dateInputContainer: {
//         flexDirection: 'row',
//         alignItems: 'center'
//       },
//       dateInput: {
//         backgroundColor:'#F9FBFC',
//         borderColor:'#e8e8e8',
//         borderWidth: 1,
//         borderRadius: 9,
//         padding: 10,
//         flex: 1,
//         marginRight: 10,
//         fontSize: 16,
//       },
//       selectedDateInput: {
//         color:'black',
//         fontWeight: 'bold',
//         fontSize:18
//       },
//       body:{ 
//         flexDirection: 'row', 
//         // marginHorizontal:20, 
//         marginVertical:5 
//       },
//       modalContainer: {
//         flex: 1,
//         backgroundColor: 'rgba(0, 0, 0, 0.5)',
//         justifyContent: 'center',
//         alignItems: 'center',
//       },
//       modalContent: {
//         backgroundColor: 'white',
//         borderRadius: 5,
//         padding: 20,
//       },
//       inputButton:{
//          flexDirection: 'row', 
//          alignItems: 'center',
//          borderWidth: 1, 
//          borderColor: '#e8e8e8', 
//          borderRadius: 9,
//          backgroundColor: '#F9FBFC',
         
//       },
//       inputButton1:{
//          alignItems: 'center',
//          borderWidth: 1, 
//          borderColor: '#e8e8e8', 
//          borderRadius: 9,
//          backgroundColor: '#F9FBFC',
//       },
//       inputButton2:{ 
//         borderRightWidth: 2, 
//         borderColor: '#e8e8e8', 
//         height: 47, 
//         marginHorizontal: 5,
        
//        },
//       icon:{ 
//         margin:5
//        },
//        title: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginVertical: 16,
//       },
//       categoriesContainer: {
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//       },
//       categoryContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         paddingVertical: 8,
//         paddingHorizontal: 16,
//         borderRadius: 25,
//         borderWidth: 1,
//         borderColor: 'gray',
//         marginRight: 8,
//         marginBottom: 8,
//       },
//       selectedCategory: {
//         borderWidth: 1,
//         borderColor: '#007AFF',
//       },
//       checkbox: {
//         width: 25,
//         height: 25,
//         borderRadius: 12,
//         borderWidth: 1,
//         borderColor: 'gray',
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginRight: 8,
//       },
//       categoryText: {
//         fontSize: 18,
//         fontWeight:'bold'
//       },
//       sendButton: {
//         backgroundColor: '#800020',
//         padding: 16,
//         borderRadius: 10,
//         marginVertical: 16,
//       },
//       sendButtonText: {
//         color: 'white',
//         fontSize: 16,
//         fontWeight: 'bold',
//         textAlign: 'center',
//       },
      
// })
// export default EditProfile

import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import TextAreaInput from '../../../components/TextAreaInput';
import { Entypo, AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import PhoneInput from 'react-native-phone-number-input';
import { colors } from '../../../../Config/theme/colors';
import { ThemeContext } from '../../../../contexts/ThemeContext';
import { AuthContext } from '../../../../Authsrc/src/contexts/AuthContext';
import { useFetchUser } from '../../../../APIs/useFetchUser ';

const categories = [
  'Documents',
  'Clothes',
  'Shoes',
  'Electronics',
  'Jewellery',
  'Food',
  'Cosmetics',
  'Others',
];

const EditProfile = () => {
  const { LogedInUser } = useContext(AuthContext);
  const username = LogedInUser.username;

  const { user, isLoading, error } = useFetchUser(username);

  // theme color
  const { theme } = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  // hooks for user data
  const [fName, setFName] = useState("");
  const [LName, setLName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [birth, setBirth] = useState("");
  const [nationality, setNationality] = useState("");
  const [email, setEmail] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");

  // Gender
  const [gender, setGender] = useState(""); // default to male
  const [showModal, setShowModal] = useState(false); // set the state of the modal to hidden by default

  // Dates
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedBdDate, setSelectedBdDate] = useState(null);

  // Category items
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Populate the user data after fetching
  useEffect(() => {
    if (user) {
      setFName(user.firstName);
      setLName(user.lastName);
      setEmail(user.email);
      setPhoneNumber(user.phoneNumber);
      setAddress(user.address || "your address");
      setBirth(user.birthDate);
      setGender(user.gender);
    }
  }, [user]);

  const selectGender = (selectedGender) => {
    setGender(selectedGender);
    setShowModal(false);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    setSelectedBdDate(date);
    hideDatePicker();
  };

  const handleCategorySelect = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((item) => item !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleSend = () => {
    // Implement sending logic here
    console.log('send pressed');
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>{error.message}</Text>;
  }

  if (!user) {
    return <Text>No user found</Text>;
  }

  return (
    <View style={[styles.container, { backgroundColor: activeColors.bgcolor }]}>
      <ScrollView>
        <View style={styles.content}>
          <View style={styles.infoHead}>
            <Entypo name="info-with-circle" size={20} color="#dc661f" />
            <Text style={styles.title2}>Information</Text>
          </View>
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.infoSection}>
              Completing your profile accurately and fully earns you 1 point out of 5 towards getting the
              "Certified" badge . Make sure to fill out your profile completely for a better chance
              of obtaining this badge.
            </Text>
          </View>
          <Text style={[styles.texts, { color: activeColors.TextColor }]}>First Name</Text>
          <TextAreaInput
            values={fName}
            setValue={setFName}
            defaultValue={fName}
            keyboardType="default"
          />
          <Text style={[styles.texts, { color: activeColors.TextColor }]}>Last Name</Text>
          <TextAreaInput
            values={LName}
            setValue={setLName}
            defaultValue={LName}
            keyboardType="default"
          />
          <Text style={[styles.texts, { color: activeColors.TextColor }]}>Email</Text>
          <TextAreaInput
            values={email}
            setValue={setEmail}
            defaultValue={email}
            keyboardType="email-address"
          />
          <Text style={[styles.texts, { color: activeColors.TextColor }]}>Where do you live?</Text>
          <TextAreaInput
            values={address}
            setValue={setAddress}
            defaultValue={address}
            keyboardType="default"
          />
          <Text style={[styles.texts, { color: activeColors.TextColor }]}>Phone</Text>
          <PhoneInput
            defaultValue={PhoneNumber}
            defaultCode="MA"
            onChangeFormattedText={(text) => {
              setPhoneNumber(text);
            }}
            containerStyle={styles.inputButton1}
          />
          <Text style={[styles.texts, { color: activeColors.TextColor }]}>Gender</Text>
          <View style={styles.body}>
            <View style={{ flex: 1 }}>
              <View style={styles.inputButton}>
                <TextInput
                  style={{ flex: 1, padding: 10 }}
                  placeholder="Gender"
                  value={gender}
                  editable={false} // make the input non-editable
                />
                <View style={styles.inputButton2} />
                <TouchableOpacity onPress={() => setShowModal(true)}>
                  <MaterialCommunityIcons name="gender-male" size={24} color="black" style={styles.icon} />
                </TouchableOpacity>
              </View>
            </View>
            <Modal
              animationType="fade"
              transparent={true}
              visible={showModal}
              onRequestClose={() => setShowModal(false)}
            >
              <TouchableOpacity
                style={styles.modalContainer}
                onPress={() => setShowModal(false)}
              >
                <View style={styles.modalContent}>
                  <TouchableOpacity onPress={() => selectGender('Male')}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Ionicons
                        name={gender === 'Male' ? 'radio-button-on' : 'radio-button-off'}
                        size={24}
                        color={gender === 'Male' ? 'blue' : 'gray'}
                      />
                      <Text style={{ marginLeft: 10 }}>Male</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => selectGender('Female')}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                      <Ionicons
                        name={gender === 'Female' ? 'radio-button-on' : 'radio-button-off'}
                        size={24}
                        color={gender === 'Female' ? 'blue' : 'gray'}
                      />
                      <Text style={{ marginLeft: 10 }}>Female</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </Modal>
          </View>
          <View style={styles.inputContainer}>
            <Text style={[styles.texts, { color: activeColors.TextColor }]}>Date of birth</Text>
            <View style={styles.dateInputContainer}>
              <TextInput
                style={[styles.dateInput, selectedBdDate && styles.selectedDateInput]}
                value={selectedBdDate ? moment(selectedBdDate).format('MMMM DD, YYYY') : birth}
                editable={false}
              />
              <TouchableOpacity onPress={showDatePicker}>
                <View style={{ backgroundColor: "#dc661f", borderRadius: 10, padding: 5, marginRight: 5 }}>
                  <AntDesign name="calendar" size={34} color="#F0F0F0" />
                </View>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleDateConfirm}
                onCancel={hideDatePicker}
                textColor='#000'
              />
            </View>
          </View>
          <Text style={[styles.texts, { color: activeColors.TextColor }]}>Nationality</Text>
          <TextAreaInput
            values={nationality}
            setValue={setNationality}
            defaultValue="Not set"
            keyboardType="default"
          />
          <View>
            <Text style={[styles.title, { color: activeColors.TextColor }]}>Select which categories of items you wish to send</Text>
            <View style={styles.categoriesContainer}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category}
                  onPress={() => handleCategorySelect(category)}
                  style={[
                    styles.categoryContainer,
                    { backgroundColor: selectedCategories.includes(category) ? "#dc661f" : '#ccc' },
                    selectedCategories.includes(category) && styles.selectedCategory,
                  ]}
                >
                  <View style={styles.checkbox}>
                    {selectedCategories.includes(category) && (
                      <Ionicons name="checkmark" size={24} color="white" />
                    )}
                  </View>
                  <Text style={[styles.categoryText, { color: selectedCategories.includes(category) ? 'white' : 'black' }]}>
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  texts: {
    fontWeight: "bold",
    fontSize: 16,
  },
  content: {
    marginHorizontal: 20,
  },
  infoSection: {
    fontSize: 16,
    color: colors.grayColor,
  },
  infoHead: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  title2: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
    color: "#dc661f",
  },
  inputContainer: {
    marginBottom: 20,
  },
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateInput: {
    backgroundColor: '#F9FBFC',
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 9,
    padding: 10,
    flex: 1,
    marginRight: 10,
    fontSize: 16,
  },
  selectedDateInput: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
  body: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 20,
  },
  inputButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e8e8e8',
    borderRadius: 9,
    backgroundColor: '#F9FBFC',
  },
  inputButton1: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e8e8e8',
    borderRadius: 9,
    backgroundColor: '#F9FBFC',
  },
  inputButton2: {
    borderRightWidth: 2,
    borderColor: '#e8e8e8',
    height: 47,
    marginHorizontal: 5,
  },
  icon: {
    margin: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'gray',
    marginRight: 8,
    marginBottom: 8,
  },
  selectedCategory: {
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  checkbox: {
    width: 25,
    height: 25,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  categoryText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sendButton: {
    backgroundColor: '#800020',
    padding: 16,
    borderRadius: 10,
    marginVertical: 16,
  },
  sendButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default EditProfile;
