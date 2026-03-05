import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator, FlatList } from 'react-native';
import { useAppContext } from '../context/AppContext';
import { useFetch } from '../hooks/useFetch';
import { getGlobalStyles, Colors } from '../styles/style';

export const JobFinderScreen = ({ navigation }: any ) => {
    const { jobs, loading } = useFetch();
    const { isDarkMode, saveJob, savedJobs } = useAppContext();
    const [ search, setSearch ] = useState('');
    const styles = getGlobalStyles(isDarkMode);

    const filtered = jobs.filter( (j: any) => j.title.toLowerCase().includes(search.toLowerCase()));
    
    return(
        <View style={styles.screen}>
        <TextInput style={styles.input} placeholder="Search jobs..." placeholderTextColor="#888" onChangeText={setSearch} />
        {loading ? <ActivityIndicator size="large" color={Colors.light.primary} /> : (
            <FlatList data={filtered} keyExtractor={item => item.id} renderItem={({ item }) => {
            const isSaved = savedJobs.some((sj: any) => sj.id === item.id);
            return (
                <View style={styles.card}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.text}>{item.companyName} • {item.salary}</Text>
                <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
                    <TouchableOpacity style={[styles.btn, { backgroundColor: isSaved ? '#888' : Colors.light.primary }]} onPress={() => saveJob(item)} disabled={isSaved}>
                    <Text style={styles.btnText}>{isSaved ? "Saved" : "Save Job"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btn, { backgroundColor: Colors.light.secondary }]} onPress={() => navigation.navigate('Apply', { fromSaved: false })}>
                    <Text style={styles.btnText}>Apply</Text>
                    </TouchableOpacity>
                </View>
                </View>
            );
            }} />
        )}
        </View>
  );
}