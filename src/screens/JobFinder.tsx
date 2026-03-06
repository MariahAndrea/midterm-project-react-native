import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator, FlatList } from 'react-native';
import { useAppContext } from '../context/AppContext';
import { useFetch } from '../hooks/useFetch';
import { getGlobalStyles, Colors } from '../styles/style';
import { MaterialIcons } from '@expo/vector-icons';

export const JobFinderScreen = ({ navigation }: any ) => {
    const { jobs, loading } = useFetch();
    const { isDarkMode, saveJob, savedJobs } = useAppContext();
    const [ search, setSearch ] = useState('');
    const styles = getGlobalStyles(isDarkMode);
    const iconColor = isDarkMode ? '#8E8E93' : '#666';

    const filtered = jobs.filter( (j: any) => j.title.toLowerCase().includes(search.toLowerCase()));
    
    return(
        <View style={styles.screen}>
        <View style={styles.searchContainer}>
            <MaterialIcons name="search" size={20} color="#888" style={{ marginRight: 5 }} />
            <TextInput 
                style={styles.searchInput} placeholder="Search jobs..." placeholderTextColor="#888" onChangeText={setSearch} value={search}
            />
        </View>
        {loading ? <ActivityIndicator size="large" color={Colors.light.primary} /> : (
            <FlatList data={filtered} keyExtractor={item => item.id} renderItem={({ item }) => {
            const isSaved = savedJobs.some((sj: any) => sj.id === item.id);
            return (
                <View style={styles.card}>
                    
                <Text style={styles.title}>{item.title}</Text>

                {/*Company Name*/}
                <View style={{ flexDirection: 'row', gap: 5, marginTop: 5, alignItems: 'center' }}>
                    <MaterialIcons name="business" size={16} color={iconColor} />
                    <Text style={styles.text}>{item.companyName}</Text>
                </View>
                
                {/*Location*/}
                <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                    <MaterialIcons name="place" size={16} color={iconColor} />
                    <Text style={styles.text}>{item.locations}</Text>
                </View>

                {/*Location*/}
                <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                    <MaterialIcons name="payments" size={16} color={iconColor} />
                    {item.minSalary === "Not Disclosed" || item.maxSalary === "Not Disclosed" ? (
                        <Text style={styles.text}>Not Disclosed</Text>
                        ) : (
                        <Text style={styles.text}>{item.minSalary} - {item.maxSalary} {item.currency}</Text>
                    )}  
                </View>

                

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