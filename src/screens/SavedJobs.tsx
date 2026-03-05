import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useAppContext } from '../context/AppContext';
import { getGlobalStyles, Colors } from '../styles/style';

export const SavedJobsScreen = ({ navigation }: any) => {
  const { savedJobs, removeJob, isDarkMode } = useAppContext();
  const styles = getGlobalStyles(isDarkMode);

  return (
    <View style={styles.screen}>
      <FlatList data={savedJobs} keyExtractor={item => item.id} renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
            <TouchableOpacity style={[styles.btn, { backgroundColor: '#FF3B30' }]} onPress={() => removeJob(item.id)}>
              <Text style={styles.btnText}>Remove</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, { backgroundColor: Colors.light.secondary }]} onPress={() => navigation.navigate('Apply', { fromSaved: true })}>
              <Text style={styles.btnText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      )} ListEmptyComponent={<Text style={styles.text}>No saved jobs yet.</Text>} />
    </View>
  );
};