import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { useAppContext } from "../context/AppContext";
import { Colors } from "../styles/style";

export const Header = () => {
  const { isDarkMode, setIsDarkMode, savedJobs } = useAppContext();
  const navigation = useNavigation<any>();
  const theme = isDarkMode ? Colors.dark : Colors.light;

  return (
    <View
      style={[
        styles.navBar,
        { backgroundColor: theme.card, borderBottomColor: theme.border },
      ]}
    >
      <Text style={[styles.storeName, { color: theme.text }]}>JobS</Text>

      <View style={styles.rightSection}>
        {/* Saved Jobs with Badge */}
        <TouchableOpacity
          style={styles.savedButton}
          onPress={() => navigation.navigate("SavedJobs")}
        >
          <FontAwesome name="bookmark" size={24} color={theme.text} />
          {savedJobs.length > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{savedJobs.length}</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Theme Toggle */}
        <TouchableOpacity
          onPress={() => setIsDarkMode(!isDarkMode)}
          style={styles.iconBtn}
        >
          <Feather
            name={isDarkMode ? "sun" : "moon"}
            size={24}
            color={theme.text}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 15,
    borderBottomWidth: 1,
  },
  storeName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 0,
  },
  savedButton: {
    marginRight: 20,
  },
  badge: {
    position: "absolute",
    right: -8,
    top: -8,
    backgroundColor: "#FF3B30",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
});
