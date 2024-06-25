import {TouchableOpacity,StyleSheet,View} from "react-native";
import React, { useLayoutEffect} from "react";
import {Entypo } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import Post from '../../../../components/Post';
import { colors } from "../../../../../Config/theme/colors";
import { useContext } from "react";
import { ThemeContext } from "../../../../../contexts/ThemeContext";
import FloatingButton from "../../../../components/FloatingButton";


const Home = () => {
  const route = useRoute();
   
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Entypo name="menu" size={44} color="white" style={{ marginLeft: 12 }}/>
      </TouchableOpacity>
      ),
      title: "TravoMate",
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
        
      },
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: "#800020",
        height: 110,
        borderBottomColor: "transparent",
        shadowColor: "transparent",
      },
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Help')}>  
      <Entypo name="help-with-circle" size={30} color="white" style={{ marginRight: 12 }}/>
      </TouchableOpacity>
      ),
    });
  }, []);

  // theme colors
  const {theme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];


  const navigation = useNavigation();

    return (
        <View style={[styles.container,{backgroundColor: activeColors.bgcolor}]}>
          <Post/>
          <FloatingButton/>
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex:1,
      },
    });

export default Home


