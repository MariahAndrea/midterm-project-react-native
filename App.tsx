import 'react-native-get-random-values';
import React from 'react';
import { SafeAreaView, View, Text, Switch, TouchableOpacity } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { JobProvider, useAppContext } from './src/context/AppContext';
import { JobFinderScreen } from './src/screens/JobFinder';
import { SavedJobsScreen } from './src/screens/SavedJobs';
import { ApplyScreen } from './src/screens/ApplicationForm';
import { getGlobalStyles } from './src/styles/style';

const Stack = createStackNavigator();

const CustomHeader = () => {
  const { isDarkMode, setIsDarkMode, savedJobs } = useAppContext();
  const styles = getGlobalStyles(isDarkMode);
  const navigation = useNavigation<any>();

  return (
    <View style={styles.header}>
      <Text style={styles.title}>JobFinder</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
        <TouchableOpacity onPress={() => navigation.navigate('SavedJobs')}>
          <Text style={{ color: isDarkMode ? '#0A84FF' : '#007AFF', fontWeight: 'bold' }}>Saved ({savedJobs.length})</Text>
        </TouchableOpacity>
        <Switch value={isDarkMode} onValueChange={setIsDarkMode} />
      </View>
    </View>
  );
};

const MainLayout = () => {
  const { isDarkMode } = useAppContext();
  const themeBg = isDarkMode ? '#000' : '#F2F2F7';
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: themeBg }}>
      <CustomHeader />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="JobFinder" component={JobFinderScreen} />
        <Stack.Screen name="SavedJobs" component={SavedJobsScreen} />
        <Stack.Screen name="Apply" component={ApplyScreen} />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default function App() {
  return (
    <JobProvider>
      <NavigationContainer>
        <MainLayout />
      </NavigationContainer>
    </JobProvider>
  );
}