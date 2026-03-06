import "react-native-get-random-values";
import React from "react";
import {SafeAreaView, View, Text, Switch, TouchableOpacity,} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { AppNavigator } from "./src/navigation/AppNavigator";
import { JobProvider } from "./src/context/AppContext";

export default function App() {
  return (
    <JobProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </JobProvider>
  );
}
