import React from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet } from 'react-native';
import { useAppContext } from '../context/AppContext';
import { Colors } from '../styles/style';
import { useNavigation } from '@react-navigation/native';

export const Header = () => {
    const { isDarkMode, setIsDarkMode, savedJobs } = useAppContext();
    const navigation = useNavigation<any>();
    const theme = isDarkMode ? Colors.dark : Colors.light;

    return(
        <View style={[style.header, { backgroundColor : theme.card, borderBottomColor: theme.border }]}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', color: theme.text }}>JobFinder</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
                <TouchableOpacity onPress={() => navigation.navigate('SavedJobs')}>
                    <Text style={{ color: theme.primary, fontWeight: '600' }}>Saved ({savedJobs.length})</Text>
                </TouchableOpacity>
                <Switch value={ isDarkMode} onValueChange={setIsDarkMode} />
            </View>
        </View>
    )
};

const style = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
})