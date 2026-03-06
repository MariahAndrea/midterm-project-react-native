import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator, FlatList } from 'react-native';
import { useAppContext } from '../context/AppContext';
import { useFetch } from '../hooks/useFetch';
import { getGlobalStyles, Colors } from '../styles/style';
import { MaterialIcons } from '@expo/vector-icons';
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';

export const JobFinderScreen = ({ navigation }: any ) => {
    const { jobs, loading } = useFetch();
    const { isDarkMode, saveJob, savedJobs } = useAppContext();
    const [ search, setSearch ] = useState('');
    const [expandedIds, setExpandedIds] = useState<string[]>([]);
    const { width } = useWindowDimensions();
    const styles = getGlobalStyles(isDarkMode);
    const iconColor = isDarkMode ? '#8E8E93' : '#666';

    const toggleExpand = (id: string) => {
        setExpandedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    const filtered = jobs.filter((j: any) => {
        const searchLower = search.toLowerCase();
        
        const titleMatch = j.title.toLowerCase().includes(searchLower);
        
        const tagsMatch = Array.isArray(j.tags) && 
            j.tags.some((tag: string) => tag.toLowerCase().includes(searchLower));

        return titleMatch || tagsMatch;
    });
    
    return(
        <View style={styles.screen}>
        <View style={styles.searchContainer}>
            <MaterialIcons name="search" size={20} color="#888" style={{ marginRight: 5 }} />
            <TextInput 
                style={styles.searchInput} placeholder="Search jobs..." placeholderTextColor="#888" onChangeText={setSearch} value={search}
            />
        </View>
        {loading ? <ActivityIndicator size="large" color={Colors.light.primary} /> : (
            <FlatList data={filtered} keyExtractor={item => item.id}  renderItem={({ item }) => {
            const isSaved = savedJobs.some((sj: any) => sj.id === item.id);
            const isExpanded = expandedIds.includes(item.id);
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

                {/*Salary*/}
                <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                    <MaterialIcons name="payments" size={16} color={iconColor} />
                    <Text style={styles.text}>{item.salary}</Text>  
                </View>

                {/*Description*/}
                {isExpanded ? (
                    <View style={{ marginTop: 10 }}>
                    <RenderHtml
                        contentWidth={width}
                        source={{ html: item.description }}
                        tagsStyles={{
                            h3: { fontSize: 16, fontWeight: 'bold', marginTop: 10 },
                            li: { fontSize: 14, marginBottom: 4 }
                        }}
                    />
                    <TouchableOpacity onPress={() => toggleExpand(item.id)}><Text style={{ color: '#007AFF', marginTop: 5 }}>Show Less</Text></TouchableOpacity>
                    </View>
                ) : (
                    <TouchableOpacity onPress={() => toggleExpand(item.id)} style={{ marginTop: 10 }}>
                    <Text style={{ color: '#815ba1' }}>View description</Text>
                    </TouchableOpacity>
                )}

                {/*Tags*/}
                <View style={styles.tagContainer}>
                    {Array.isArray(item.tags) ? (
                        item.tags.map((tag: string, index: number) => (
                        <View key={index} style={styles.tag}>
                            <Text style={styles.tagText}>{tag}</Text>
                        </View>
                        ))
                    ) : (
                        <Text style={styles.text}>No tags available</Text>
                    )}
                </View>
                
                {/* Action Buttons */}
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