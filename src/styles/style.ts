import { StyleSheet } from 'react-native';

export const Colors = {
    light: {
        background: '#ffffff',
        title: '#5f4086',
        text: '#000000',
        subtext: '#5f4086',
        card: '#ffffff',
        tag: '#dfd5f0',
        border: '#C6C6C8',
        primary: '#815ba1', 
        secondary: '#54ad50',
    },
    dark: {
        background: '#19191a',
        title: '#a36adc',
        text: '#ffffff',
        subtext: '#d1d1d1',
        card: '#19191a',
        tag: '#4a3b57',
        border: '#38383A',
        primary: '#7c658f', 
        secondary: '#54ad50',
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
        alignItems: 'center',
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
        color: theme.title 
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
    tagContainer: { 
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        marginTop: 10,
        gap: 6 
    },
    tag: { 
        backgroundColor: theme.tag, 
        paddingHorizontal: 10, 
        paddingVertical: 4, 
        borderRadius: 16, 
    },
    tagText: { 
        fontSize: 12, 
        color: theme.subtext, 
        fontWeight: '500' 
    }
  });
};