import { StyleSheet } from 'react-native';

export const Colors = {
    light: {
        background: '#ffffff',
        text: '#000000',
        card: '#ffffff',
        border: '#C6C6C8',
        primary: '#007AFF', 
        secondary: '#28A745',
    },
    dark: {
        background: '#19191a',
        text: '#ffffff',
        card: '#19191a',
        border: '#38383A',
        primary: '#0A84FF', 
        secondary: '#30D158',
    }
    
};

export const getGlobalStyles = (isDarkMode: boolean) => {
  const theme = isDarkMode ? Colors.dark : Colors.light;
  return StyleSheet.create({
    header: { 
        backgroundColor: theme.card, 
        padding: 15, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
    },
    screen: { 
        flex: 1, 
        backgroundColor: theme.background, 
        padding: 15 
    },
    card: { 
        backgroundColor: theme.card, 
        padding: 16, 
        borderRadius: 12, 
        marginBottom: 12, 
        borderWidth: 1, 
        borderColor: theme.border 
    },
    title: { 
        fontSize: 18, 
        fontWeight: 'bold', 
        color: theme.text 
    },
    text: { 
        fontSize: 14, 
        color: isDarkMode ? '#8E8E93' : '#666', 
        marginVertical: 4 
    },
    input: { 
        backgroundColor: theme.card, 
        color: theme.text, 
        padding: 12, 
        borderRadius: 8, 
        borderWidth: 1, 
        borderColor: theme.border, 
        marginBottom: 10 
    },
    btnGroup: { 
        flexDirection: 'row', 
        gap: 10, 
        marginTop: 10 
    },
    btn: { 
        padding: 12, 
        borderRadius: 8, 
        flex: 1, 
        alignItems: 'center' 
    },
    btnText: { 
        color: '#FFF', 
        fontWeight: 'bold' 
    },
    error: { 
        color: '#FF3B30', 
        fontSize: 12, 
        marginBottom: 5 
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.card, 
        borderRadius: 20,
        borderWidth: 1,
        borderColor: theme.border,
        paddingHorizontal: 12,
        marginBottom: 15,
        height: 45,
    },
    searchInput: {
        flex: 1, 
        color: theme.text,
        height: '100%',
    },
  });
};