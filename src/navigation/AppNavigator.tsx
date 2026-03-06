import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { JobFinderScreen } from "../screens/JobFinder";
import { SavedJobsScreen } from "../screens/SavedJobs";
import { ApplyScreen } from "../screens/ApplicationForm";
import { Header } from "../components/Header";
import { useAppContext } from "../context/AppContext";
import { Colors } from "../styles/style";
import { ThemeToggle } from "../components/ThemeToggle";

export type RootStackParamList = {
  JobFinder: undefined;
  SavedJobs: { title?: string };
  Apply: { fromSaved: boolean };
};

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  const { isDarkMode } = useAppContext();
  const theme = isDarkMode ? Colors.dark : Colors.light;

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.card,
          borderBottomColor: theme.border,
          borderBottomWidth: 1,
        },
        headerTintColor: theme.text,
        headerTitleStyle: { color: theme.text },
        headerRight: () => <ThemeToggle />,
      }}
    >
      <Stack.Screen
        name="JobFinder"
        component={JobFinderScreen}
        options={{ header: () => <Header /> }}
      />
      <Stack.Screen
        name="SavedJobs"
        component={SavedJobsScreen}
        options={{ title: "Saved Jobs" }}
      />
      <Stack.Screen
        name="Apply"
        component={ApplyScreen}
        options={{ title: "Submit Application" }}
      />
    </Stack.Navigator>
  );
};
