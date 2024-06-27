import { View, Text, Image, TouchableOpacity, Switch, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useState, useContext,useEffect } from 'react';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Octicons, Ionicons,FontAwesome5 } from '@expo/vector-icons';
import StarRating from '../components/StarRating';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../Config/theme/colors';
import { ThemeContext } from '../../contexts/ThemeContext';
import { AuthContext } from '../../Authsrc/src/contexts/AuthContext';
import { useUsersApi } from '../../APIs/UserApi';

const CustomDrawer = (props) => {
  const { authState, LogedInUser, logout } = useContext(AuthContext);
  // theme colors
  const { theme, updateTheme } = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  const navigation = useNavigation();
  const [isActive, setIsActive] = useState(theme.mode === 'dark');

  const toggleTheme = () => {
    updateTheme();
    setIsActive((previousState) => !previousState);
  };
   // Get the user's name or a anonymous name
   const userNames = authState.authenticated && LogedInUser.attributes 
   ? `${LogedInUser.attributes.given_name} ${LogedInUser.attributes.family_name}` 
   : "Anonymous";

   const handlePhoto = () =>{
    console.warn("edit profilePhoto");
   }

/*------ get a user by username ----*/
const { getUserByUsername } = useUsersApi();
const username = LogedInUser.username;

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserByUsername(username);
        setUser(res);
        console.log(res);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [username]);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>{error.message}</Text>;
  }

  if (!user) {
    return(
      <View style = {{alignItems:"center",justifyContent:"center",}}>
      <Text>No user found</Text>
      </View>
    )
  }
  return (
    <View style={[styles.container, { backgroundColor: activeColors.bgcolor }]}>
    <View style={styles.contentDrawer}>

      <DrawerContentScrollView {...props}>
          {/* Header section */}
          <View style={styles.SectionLine}>
            <Text style={[styles.Titles1, { color: activeColors.TextColor }]}>TravoMate</Text>
            <TouchableOpacity onPress={handlePhoto}>
            {user.profilePhoto ? (
              <Image source={{ uri: user.profilePhoto }} style={{height: 80,width: 80,borderRadius: 40,marginBottom: 10,}} />
            ) : (
              <View style={styles.profileAvator} >
              <FontAwesome5 name="user-circle" size={40} color="white" />
              </View>
            )}
            </TouchableOpacity>
            <Text style={[styles.Titles1, { color: activeColors.TextColor }]}>{userNames}</Text>
            <Text style={{ marginBottom: 10 }}>
              <StarRating />
            </Text>
          </View>
          {/* LANGUAGE & THEME SECTION */}
          <View style={styles.SectionLine}>
            {/* LANGUAGE SECTION */}
            <TouchableOpacity onPress={() => {}} style={{ paddingVertical: 8 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={[{ fontSize: 18 }, { color: activeColors.TextColor }]}>Language:</Text>
                {user.lang === "en" ? (
                  <Image
                  source={require('../../assets/images/usaIcon.png')}
                  style={{
                    height: 20,
                    width: 40,
                    marginLeft: 'auto',
                  }}
                />
                ) : (
                  <Image
                  source={require('../../assets/images/france.png')}
                  style={{
                    height: 20,
                    width: 40,
                    marginLeft: 'auto',
                  }}
                />
                )}
                
              </View>
            </TouchableOpacity>
            {/* THEME SECTION */}
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flexDirection: 'row', paddingVertical: 8 }}>
                <Text style={[{ fontSize: 18, marginRight: 5 }, { color: activeColors.TextColor }]}>Theme:</Text>
                <Text style={{ fontSize: 18, color: 'gray' }}>{theme.mode}</Text>
              </View>
              <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={'#f5dd4b'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleTheme}
                value={isActive}
                style={{ marginLeft: 'auto' }}
              />
            </View>
          </View>
          {/* Drawer List Items */}
          <View style={{ flex: 1, paddingTop: 5 }}>
            <DrawerItemList {...props} />
          </View>
       
      </DrawerContentScrollView>
    </View>
      {/* Footer section */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => { navigation.navigate('Profile',{loggedUser: user}) }} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="person-circle" size={27} color="#0A64EF" />
            <Text style={[{ fontSize: 15, marginLeft: 5 }, { color: activeColors.TextColor }]}>
              Profile
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={logout} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Octicons name="sign-out" size={24} color="#0A64EF" />
            <Text style={[{ fontSize: 15, marginLeft: 5 }, { color: activeColors.TextColor }]}>
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentDrawer: {
    flex: 1,
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
  Titles1: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  SectionLine: {
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingHorizontal: 20,
    bottom:20
  },
});

export default CustomDrawer;