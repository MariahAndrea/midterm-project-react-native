import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useAppContext } from '../context/AppContext';
import { Colors } from '../styles/style';

export const ThemeToggle = () => {
  const { isDarkMode, setIsDarkMode } = useAppContext();
  const theme = isDarkMode ? Colors.dark : Colors.light;

  return (
    <TouchableOpacity 
      onPress={() => setIsDarkMode(!isDarkMode)} 
      style={{ marginRight: 15 }}
    >
      <Feather 
        name={isDarkMode ? 'sun' : 'moon'} 
        size={24} 
        color={theme.text} 
      />
    </TouchableOpacity>
  );
};