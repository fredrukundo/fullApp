import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React from "react";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
  FontAwesome,
  FontAwesome5,
} from "@expo/vector-icons";
import { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../../../../Config/theme/colors";
import { useContext } from "react";
import { ThemeContext } from "../../../../../contexts/ThemeContext";
import moment from "moment";

const formatDate = (date) => {
  return moment(date).format("MMM YYYY");
};
const UserProfile = ({ route }) => {
  const navigation = useNavigation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [Review, setReview] = useState(false);

  // theme colors
  const { theme } = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  const handleReport = () => {
    console.warn("report profile");
  };
  const handlePress = () => {
    // Navigate to the next screen here
    console.log("Navigate to the next screen");
  };

  const { uzer } = route.params;
  console.log(uzer);

  return (
    <View style={[styles.container, { backgroundColor: activeColors.bgcolor }]}>
      <View style={styles.profileDetails}>
        {uzer.profilePhoto ? (
          <Image
            source={{ uri: uzer.profilePhoto }}
            style={styles.profileImage}
          />
        ) : (
          <View style={styles.profileAvator}>
            <FontAwesome5 name="user-circle" size={40} color="black" />
          </View>
        )}
        <View style={{ flexDirection: "row" }}>
          <Text style={[styles.name, { color: activeColors.TextColor }]}>
            {uzer.lastName}
          </Text>
          <MaterialIcons name="verified" size={18} color="#0A64EF" />
        </View>
      </View>

      <ScrollView>
        <View style={[styles.body, {}]}>
          <View style={styles.bodyChild}>
            <Text style={[styles.Titles2, { color: activeColors.TextColor }]}>
              About
            </Text>
            <View
              style={[
                styles.detailBox,
                { backgroundColor: activeColors.bgcolor },
              ]}
            >
              <View
                style={[
                  styles.detailItem,
                  {
                    borderBottomWidth: 1,
                    borderBottomColor: "gray",
                    paddingBottom: 10,
                  },
                ]}
              >
                <Text
                  style={[styles.itemsText, { color: activeColors.TextColor }]}
                >
                  Names
                </Text>
                <Text style={[styles.subItemsText, { marginLeft: "auto" }]}>
                  {uzer.lastName}
                </Text>
              </View>

              <View
                style={[
                  styles.detailItem,
                  {
                    borderBottomWidth: 1,
                    borderBottomColor: "gray",
                    paddingBottom: 10,
                  },
                ]}
              >
                <Text
                  style={[styles.itemsText, { color: activeColors.TextColor }]}
                >
                  Gender
                </Text>
                {uzer.gender ? (
                  <Text style={[styles.subItemsText, { marginLeft: "auto" }]}>
                    {uzer.gender}
                  </Text>
                ) : (
                  <Text style={[styles.subItemsText, { marginLeft: "auto" }]}>
                    not set
                  </Text>
                )}
              </View>

              <View
                style={[
                  styles.detailItem,
                  {
                    borderBottomWidth: 1,
                    borderBottomColor: "gray",
                    paddingBottom: 10,
                  },
                ]}
              >
                <Text
                  style={[styles.itemsText, { color: activeColors.TextColor }]}
                >
                  {" "}
                  Preferred Currency
                </Text>
                {uzer.preferredCurrency ? (
                  <Text style={[styles.subItemsText, { marginLeft: "auto" }]}>
                    {uzer.preferredCurrency}
                  </Text>
                ) : (
                  <Text style={[styles.subItemsText, { marginLeft: "auto" }]}>
                    not set
                  </Text>
                )}
              </View>
              <>
                <TouchableOpacity style={styles.header} onPress={toggleExpand}>
                  <Text
                    style={[
                      styles.headerText,
                      { color: activeColors.TextColor },
                    ]}
                  >
                    Transported items
                  </Text>
                  <Ionicons
                    name={isExpanded ? "chevron-up" : "chevron-down"}
                    size={24}
                    color={activeColors.TextColor}
                  />
                </TouchableOpacity>

                {isExpanded && (
                  <>
                    <View style={styles.list}>
                      <Text style={styles.listItem}>• Documents</Text>
                      <Text style={styles.listItem}>• Clothes-Shoes</Text>
                      <Text style={styles.listItem}>• Electronics</Text>
                      <Text style={styles.listItem}>• Jewellery</Text>
                      <Text style={styles.listItem}>• Food</Text>
                      <Text style={styles.listItem}>• Cosmetics</Text>
                      <Text style={styles.listItem}>• Others</Text>
                    </View>
                  </>
                )}
              </>
            </View>
          </View>

          <View style={styles.bodyChild}>
            <View style={styles.TitleSection}>
              <Text style={[styles.Titles2, { color: activeColors.TextColor }]}>
                Verifications
              </Text>
            </View>

            <View
              style={[
                styles.detailBox,
                { backgroundColor: activeColors.bgcolor },
              ]}
            >
              <View
                style={[
                  styles.detailItem,
                  {
                    borderBottomWidth: 1,
                    borderBottomColor: "gray",
                    paddingBottom: 10,
                  },
                ]}
              >
                <FontAwesome
                  name="phone-square"
                  size={26}
                  color="white"
                  style={{
                    backgroundColor: "#0077C8",
                    borderRadius: 4,
                    padding: 3,
                    marginRight: 8,
                  }}
                />
                <Text
                  style={[styles.itemsText, { color: activeColors.TextColor }]}
                >
                  Phone
                </Text>
                {uzer.phoneNumber && uzer.isPhoneNumberVerified ? (
                  <Text
                    style={{
                      marginLeft: "auto",
                      color: "green",
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    Verified
                  </Text>
                ) : (
                  <Text
                    style={{
                      marginLeft: "auto",
                      color: "#FF0000",
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    Not Verified
                  </Text>
                )}
              </View>

              <View
                style={[
                  styles.detailItem,
                  {
                    borderBottomWidth: 1,
                    borderBottomColor: "gray",
                    paddingBottom: 10,
                  },
                ]}
              >
                <MaterialCommunityIcons
                  name="email"
                  size={24}
                  color="white"
                  style={{
                    backgroundColor: "#FF0000",
                    borderRadius: 4,
                    padding: 3,
                    marginRight: 8,
                  }}
                />
                <Text
                  style={[styles.itemsText, { color: activeColors.TextColor }]}
                >
                  Email
                </Text>
                {uzer.email && uzer.isEmailVerified ? (
                  <Text
                    style={{
                      marginLeft: "auto",
                      color: "green",
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    Verified
                  </Text>
                ) : (
                  <Text
                    style={{
                      marginLeft: "auto",
                      color: "#FF0000",
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    Not Verified
                  </Text>
                )}
              </View>

              <View
                style={[
                  styles.detailItem,
                  {
                    borderBottomWidth: 1,
                    borderBottomColor: "gray",
                    paddingBottom: 10,
                  },
                ]}
              >
                <MaterialCommunityIcons
                  name="facebook"
                  size={24}
                  color="white"
                  style={{
                    backgroundColor: "#0077C8",
                    borderRadius: 4,
                    padding: 3,
                    marginRight: 8,
                  }}
                />
                <Text
                  style={[styles.itemsText, { color: activeColors.TextColor }]}
                >
                  Facebook
                </Text>
                {uzer.faceBookAccount && uzer.isFaceBookAccountVerified ? (
                  <Text
                    style={{
                      marginLeft: "auto",
                      color: "green",
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    Verified
                  </Text>
                ) : (
                  <Text
                    style={{
                      marginLeft: "auto",
                      color: "#FF0000",
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    Not Verified
                  </Text>
                )}
              </View>

              <View
                style={[
                  styles.detailItem,
                  {
                    borderBottomWidth: 1,
                    borderBottomColor: "gray",
                    paddingBottom: 10,
                  },
                ]}
              >
                <Ionicons
                  name="person-sharp"
                  size={24}
                  color="white"
                  style={{
                    backgroundColor: "#E0D26A",
                    borderRadius: 4,
                    padding: 3,
                    marginRight: 8,
                  }}
                />
                <Text
                  style={[styles.itemsText, { color: activeColors.TextColor }]}
                >
                  Profile
                </Text>
                {uzer.isPhoneNumberVerified && uzer.isEmailVerified ? (
                  <Text
                    style={{
                      marginLeft: "auto",
                      color: "#1DB954",
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    Completed
                  </Text>
                ) : (
                  <Text
                    style={{
                      marginLeft: "auto",
                      color: "#FF0000",
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    Not completed
                  </Text>
                )}
              </View>

              <View style={[styles.detailItem]}>
                <FontAwesome
                  name="id-card-o"
                  size={24}
                  color="white"
                  style={{
                    backgroundColor: "#616B1B",
                    borderRadius: 4,
                    padding: 3,
                    marginRight: 8,
                  }}
                />
                <Text
                  style={[styles.itemsText, { color: activeColors.TextColor }]}
                >
                  ID documents
                </Text>
                {uzer.identityDocument && uzer.isIdentityDocVerified ? (
                  <Text
                    style={{
                      marginLeft: "auto",
                      color: "#1DB954",
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    Verified
                  </Text>
                ) : (
                  <Text
                    style={{
                      marginLeft: "auto",
                      color: "#FF0000",
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    Not Verified
                  </Text>
                )}
              </View>
            </View>
          </View>
          <View>
            {Review ? (
              <>
                <View style={styles.ReviewSection}>
                  <Text style={styles.ReviewCount}>Review (3)</Text>
                </View>
              </>
            ) : (
              <View style={styles.ReviewSection}>
                <Text style={styles.ReviewCount}>Review (0)</Text>
                <Text style={styles.ReviewDisplay}>No Review Found</Text>
              </View>
            )}

            <View>
              <Pressable onPress={handleReport} style={styles.reportProfile}>
                <Text style={styles.reportProfileText}>
                  Report this Profile
                </Text>
              </Pressable>
            </View>
            <View style={styles.memberSince}>
              <Text style={styles.memberSinceText}>
                Member Since {formatDate(uzer.memberSince)}
              </Text>
            </View>
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
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 5,
    borderColor: "#fff",
  },
  profileAvator: {
    width: 80,
    height: 80,
    borderRadius: 10,
    borderWidth: 5,
    borderColor: "#fff",
    //backgroundColor:'red',
    alignItems: "center",
    justifyContent: "center",
  },
  profileDetails: {
    justifyContent: "center",
    alignItems: "center",
  },
  headerSection: {
    marginVertical: 20,
    paddingBottom: 20,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  subtitle: {
    color: "gray",
    marginBottom: 10,
  },
  Titles2: {
    fontWeight: "bold",
    fontSize: 18,
    marginHorizontal: 20,
  },
  body: {
    marginHorizontal: 5,
  },
  bodyChild: {
    marginVertical: 20,
  },
  detailBox: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    backgroundColor: "#F0F0F0",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    margin: 8,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  itemsText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  subItemsText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "gray",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  list: {
    paddingBottom: 10,
  },

  listItem: {
    paddingLeft: 10,
    marginBottom: 5,
    color: "gray",
    fontSize: 18,
  },
  ReviewSection: {
    marginHorizontal: 10,
    marginVertical: 20,
  },
  ReviewCount: {
    color: "#dc661f",
    fontSize: 18,
    fontWeight: "700",
    paddingBottom: 7,
  },
  ReviewDisplay: {
    color: "#B3B3B3",
    fontWeight: "bold",
    marginHorizontal: 20,
  },
  reportProfile: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  reportProfileText: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
  },
  memberSince: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    marginBottom: 10,
  },
  memberSinceText: {
    color: "gray",
    fontSize: 16,
  },
});
export default UserProfile;
