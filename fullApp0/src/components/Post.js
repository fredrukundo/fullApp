import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { MaterialCommunityIcons, MaterialIcons,FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../Config/theme/colors";
import { ThemeContext } from "../../contexts/ThemeContext";
import { ActivityIndicator } from "react-native";
import { useFlightsApi } from "../../APIs/TripApi";
import moment from "moment";

// function for displaying a post
const PostItem = ({ post }) => {
  const formatDate = (date) => {
    return moment(date).format("MMM DD, YYYY");
  };

// Function to calculate and format time difference
const formatTimeDifference = (creationTime) => {
  const now = moment();
  const creationMoment = moment(creationTime);
  const diffMinutes = now.diff(creationMoment, 'minutes');
  const diffHours = now.diff(creationMoment, 'hours');
  const diffDays = now.diff(creationMoment, 'days');
  const diffMonths = now.diff(creationMoment, 'months');
  const diffYears = now.diff(creationMoment, 'years');

  if (diffYears > 0) {
    return creationMoment.format("MMM YY");
  } else if (diffMonths > 0) {
    return `${diffMonths} ${diffMonths > 1 ? 'months' : 'month'} ago`;
  } else if (diffDays > 0) {
    return `${diffDays} ${diffDays > 1 ? 'days' : 'day'} ago`;
  } else if (diffHours > 0) {
    return `${diffHours} ${diffHours > 1 ? 'hours' : 'hour'} ago`;
  } else if (diffMinutes > 0) {
    return `${diffMinutes} ${diffMinutes > 1 ? 'minutes' : 'minute'} ago`;
  } else {
    return creationMoment.format("MMM YY");
  }
};
 
  
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Details", { id: post.uid })}
      activeOpacity={0.8}
    >
      <View style={styles.post}>
        <View style={styles.header}>
          {post.user.profilePhoto ? (
              <Image source={{ uri: post.user.profilePhoto }} style={styles.profileImage} />
            ) : (
              <FontAwesome5 name="user-circle" size={40} color={activeColors.TextColor} style={styles.profileImage} />
            )}
          <View>
            <View style={{ flexDirection: "row" }}>
              <Text style={[styles.name, { color: activeColors.TextColor }]}>
                {post.user.lastName}
              </Text>
              <MaterialIcons name="verified" size={18} color="#0A64EF" />
            </View>
            <Text style={styles.subtitle}>{formatTimeDifference(post.createdAt)}</Text>
          </View>

          <View style={styles.Kilos}>
            <Text style={[styles.oneKilos, { color: activeColors.TextColor }]}>
              $ {post.price}/
              <MaterialCommunityIcons
                name="weight-kilogram"
                size={24}
                color="#dc661f"
              />
            </Text>
            <Text
              style={[styles.KilosRemaining, { color: activeColors.TextColor }]}
            >
              {post.remainingWeight} kg Remaining
            </Text>
          </View>
        </View>
        <View style={styles.body}>
          <View style={styles.FromAndTO}>
            <View style={styles.from}>
              <Text style={styles.FromAndTOText}>From:</Text>
              <View style={styles.fromDetails}>
                <View style={styles.cityFlag}>
                  <Text
                    style={[styles.city, { color: activeColors.TextColor }]}
                  >
                    {post.from.city}
                  </Text>
                  <Image
                    source={{ uri: post.from.flagPhoto }}
                    style={styles.flags}
                  />
                </View>
                <Text style={styles.country}>{post.from.country}</Text>
              </View>
            </View>
            <View style={styles.to}>
              <Text style={styles.FromAndTOText}>To:</Text>
              <View style={styles.toDetails}>
                <View style={styles.cityFlag}>
                  <Text
                    style={[styles.city, { color: activeColors.TextColor }]}
                  >
                    {post.to.city}
                  </Text>
                  <Image
                    source={{ uri: post.to.flagPhoto }}
                    style={styles.flags}
                  />
                </View>
                <Text style={styles.country}>{post.to.country}</Text>
              </View>
            </View>
          </View>
          <View style={styles.dates}>
            <Text style={[styles.day, { color: activeColors.TextColor }]}>
              {new Date(post.departureTime).getDate()}
            </Text>
            <Text style={styles.month}>{new Date(post.departureTime).toLocaleString('default', { month: 'short' })}</Text>
            <Text style={styles.year}>{new Date(post.departureTime).getFullYear()}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Post = () => {
  const { listAllTrips } = useFlightsApi();
  const [trips, setTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await listAllTrips();
        setTrips(res);
        console.log(res);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTrips();
  }, []);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>{error.message}</Text>;
  }

  const renderItem = ({ item }) => <PostItem post={item} />;

  return <FlatList data={trips} renderItem={renderItem} />;
};

const styles = StyleSheet.create({
  post: {
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "gray",
    padding: 10,
    marginHorizontal: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 10,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  subtitle: {
    color: "gray",
  },
  Kilos: {
    marginLeft: "auto",
  },
  oneKilos: {
    fontWeight: "bold",
  },
  KilosRemaining: {
    fontWeight: "bold",
  },
  body: {
    flexDirection: "row",
  },
  FromAndTO: {
    marginVertical: 20,
  },
  FromAndTOText: {
    fontWeight: "bold",
    fontSize: 20,
    marginRight: 5,
    color: "gray",
  },
  from: {
    flexDirection: "row",
    paddingTop: 10,
  },
  to: {
    flexDirection: "row",
    paddingTop: 10,
  },
  cityFlag: {
    flexDirection: "row",
  },
  city: {
    marginRight: 5,
    fontWeight: "bold",
    fontSize: 18,
  },
  country: {
    color: "gray",
  },
  flags: {
    width: 40,
    height: 20,
  },
  dates: {
    marginLeft: "auto",
    alignItems: "center",
    justifyContent: "center",
  },
  day: {
    fontSize: 34,
    fontWeight: "bold",
  },
  month: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#dc661f",
  },
  year: {
    fontSize: 22,
    fontWeight: "bold",
    color: "gray",
  },
});

export default Post;



// import React from 'react';
// import { StyleSheet, Text, View, Image,TouchableOpacity, ImageBackground } from 'react-native';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';
// import { MaterialIcons } from '@expo/vector-icons';
// import { colors } from '../../Config/theme/colors';
// import { useContext } from 'react';
// import { ThemeContext } from '../../contexts/ThemeContext';


// const Post = ({ post }) => {
//   const navigation = useNavigation();

//   // theme colors
//   const {theme} = useContext(ThemeContext);
//   const activeColors = colors[theme.mode];


//   return (
//     <TouchableOpacity onPress={() => navigation.navigate('Details', { postId: post.id, post })} activeOpacity={0.8}>
//     <View style={styles.post}>
//       <View style={styles.header}>
//         <Image
//           source={post.user.image}
//           style={styles.profileImage}
//         />
//         <View>
//         <View style={{flexDirection:'row'}}>
//           <Text style={[styles.name,{color: activeColors.TextColor}]}>{post.user.name}</Text>
//           <MaterialIcons name="verified" size={18} color="#0A64EF" />
//           </View>
//           <Text style={styles.subtitle}>{post.createdAt} Ago</Text>
//           </View>
        
//         <View style={styles.Kilos}>
//           <Text style={[styles.oneKilos,{color: activeColors.TextColor}]}>$ {post.user.oneKilo}/<MaterialCommunityIcons name="weight-kilogram" size={24} color="#dc661f" /></Text>
//           <Text style={[styles.KilosRemaining, {color: activeColors.TextColor}]}>{post.user.KilosRemaining} kg Remaining</Text>
//         </View>
//       </View>
//       <View style={styles.body}>
//         <View style={styles.FromAndTO}>
//           <View style={styles.from}>
//             <Text style={styles.FromAndTOText}>
//               From:
//             </Text>
//             <View style={styles.fromDetails}>
//                <View style={styles.cityFlag}>
//                  <Text style={[styles.city,{color: activeColors.TextColor}]}>{post.from.city}</Text>
//                  <Image
//                   source={post.from.flag}
//                   style={styles.flags}
//                  />
//                </View>
//                <Text style={styles.country}>{post.from.country}</Text>
//             </View>
//           </View>
//           <View style={styles.to}>
//             <Text style={styles.FromAndTOText}>
//               To:
//             </Text>
//             <View style={styles.toDetails}>
//               <View style={styles.cityFlag}>
//                 <Text style={[styles.city,{color: activeColors.TextColor}]}>{post.to.city}</Text>
//                 <Image
//                   source={post.to.flag}
//                   style={styles.flags}
//                 />
//               </View>
//               <Text style={styles.country}>{post.to.country}</Text>
//             </View>
//           </View>
//         </View>
//         <View style={styles.dates}>
//           <Text style={[styles.day,{color: activeColors.TextColor}]}>{post.departureTime}</Text>
//           <Text style={styles.month}>{post.departureTime}</Text>
//           <Text style={styles.year}>{post.departureTime}</Text>
//         </View>
//       </View>
//     </View>
//     </TouchableOpacity>
    
//   );
// }

// const styles = StyleSheet.create({
  
//   post: {
//     marginVertical: 5,
//     borderWidth: 1,
//     borderRadius: 20,
//     borderColor: 'gray',
//     padding: 5,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     width: '100%',
//   },
//   profileImage: {
//     width: 40,
//     height: 40,
//     borderRadius: 25,
//     marginRight: 5,
//   },
//   name: {
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   subtitle: {
//     color: 'gray',
//   },
//   Kilos: {
//     marginLeft: 'auto',
//   },
//   oneKilos: {
//     fontWeight: 'bold',
//   },
//   KilosRemaining: {
//     fontWeight: 'bold',
//   },
//   body: {
//     flexDirection: 'row',
//   },
//   FromAndTO: {
//     marginVertical: 10,
//   },
//   FromAndTOText: {
//     fontWeight: 'bold',
//     fontSize: 20,
//     marginRight: 5,
//     color:'gray'
//   },
//   from: {
//     flexDirection: 'row',
//     //paddingTop: 10,
    
//   },
//   to: {
//     flexDirection: 'row',
//     paddingTop: 5,
//   },
//   cityFlag: {
//     flexDirection: 'row',
//   },
//   city: {
//     marginRight: 5,
//     fontWeight: 'bold',
//     fontSize: 18,
//   },
//   country: {
//     color: 'gray',
//   },
//   flags: {
//     width: 40,
//     height: 20,
//   },
//   dates: {
//     marginLeft: 'auto',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   day: {
//     fontSize: 25,
//     fontWeight: 'bold',
//   },
//   month: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#dc661f',
//   },
//   year: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: 'gray',
//   },
// });

// export default Post;