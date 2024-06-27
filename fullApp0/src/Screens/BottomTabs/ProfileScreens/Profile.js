import { View, Text,StyleSheet, Image,useWindowDimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { MaterialIcons,FontAwesome5 } from '@expo/vector-icons';
import TabViews from '../../../components/TabViews';
import { colors } from '../../../../Config/theme/colors';
import { useContext } from 'react';
import { ThemeContext } from '../../../../contexts/ThemeContext';


const Users = {
  user: {
    id: 11,
    name: "John Smith",
    image: require('../../../../assets/images/profile.jpg'),
    oneKilo: 5.50,
    KilosRemaining: 25,
    gender: "Male",
    PreferredCurrency: "USD",
    memberSince: "july 2021",
    wallet: 0,
    phone: '+212626103440',
    email: 'Dukefred9@gmail.com'

  },
  
  from: {
    country: "United States",
    city: "New York",
    flag: require('../../../../assets/images/USA.png')
  },
  to: {
    country: "France",
    city: "Paris",
    flag: require('../../../../assets/images/france.png')
  },
  departureDate: {
    day: 24,
    month: "May",
    year: 2023
  },
  ArrivalDate: {
    day: 25,
    month: "May",
    year: 2023
  }
}

const Profile = ({route}) => {
  const {loggedUser} = route.params;
  console.log(loggedUser);

  const { width, height } = useWindowDimensions();

// theme colors
  const {theme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  const imageSize = Math.min(width, height) * 0.4;

  return (
    <View style={[styles.container,{backgroundColor:activeColors.bgcolor}]}>
    
    <View style={styles.headerSection}>
    <View style={[styles.profileDetails, {height: imageSize }]}>
        {/* <Image
          source={Users.user.image}
          style={[styles.profileImage, { width: imageSize, height: imageSize }]}
        /> */}
        {loggedUser.profilePhoto ? (
              <Image source={{ uri: loggedUser.profilePhoto }} style={[styles.profileImage, { width: imageSize, height: imageSize }]} />
            ) : (
              <View style={styles.profileAvator} >
              <FontAwesome5 name="user-circle" size={40} color="white" />
              </View>
            )}
        <View style={{flexDirection:'row'}}>
          <Text style={[styles.name,{color:activeColors.TextColor}]}>{loggedUser.firstName}{loggedUser.lastName}</Text>
          <MaterialIcons name="verified" size={18} color="#0A64EF" />
          </View>
        </View>
    </View>
        
        <TabViews/>
      </View>
      
  )
}
const styles = StyleSheet.create({
  container:{
    flex:1,
  },

  background: {
    flex: 1,
    resizeMode: 'cover',
    height:'15%',
    marginTop:0,
    
  },
  profileAvator: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 5,
    borderColor: "#fff",
    backgroundColor:'gray',
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 500,
    borderWidth:5,
    borderColor:'#fff',
  },
  profileDetails: {
   justifyContent:'center',
   alignItems:'center',
  },
  headerSection:{
    marginVertical:10,

  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  subtitle: {
    color: 'gray',
    marginBottom:10,
  },
  Titles2: {
    fontWeight: 'bold',
    fontSize: 18,
    marginHorizontal:20
  },
})
export default Profile