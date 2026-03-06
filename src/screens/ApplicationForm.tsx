import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAppContext } from '../context/AppContext';
import { getGlobalStyles, Colors } from '../styles/style';

const schema = z.object({
  name: z.string().min(2, "Name required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Invalid phone"),
  why: z.string().min(10, "Tell us more"),
});

const formFields = [
  { key: 'name', label: 'Full Name' },
  { key: 'email', label: 'Email Address' },
  { key: 'phone', label: 'Phone Number' },
  { key: 'why', label: 'Why should we hire you?' },
];

export const ApplyScreen = ({ route, navigation }: any) => {
  const { fromSaved } = route.params || {};
  const { isDarkMode } = useAppContext();
  const styles = getGlobalStyles(isDarkMode);
  const theme = isDarkMode ? Colors.dark : Colors.light;

  const { control, handleSubmit, reset, formState: { errors } } = useForm({ 
    resolver: zodResolver(schema) 
  });

  const onSubmit = () => {
    Alert.alert("Success", "Application Submitted!", [
      {
        text: "Okay",
        onPress: () => {
          reset();
          if (fromSaved) {
            navigation.navigate("JobFinder");
          } else {
            navigation.goBack();
          }
        }
      }
    ]);
  };

  return (
    <ScrollView style={styles.screen}>
      {formFields.map(({ key, label }) => (
        <View key={key} style={{ marginBottom: 15 }}>
          <Text style={[styles.text, { fontWeight: 'bold', marginBottom: 5 }]}>
            {label}
          </Text>
          <Controller 
            control={control} 
            name={key as any} 
            render={({ field: { onChange, value } }) => (
              <TextInput 
                style={styles.input} 
                placeholder={label} 
                placeholderTextColor="#888" 
                onChangeText={onChange} 
                value={value} 
              />
            )} 
          />
          {errors[key as keyof typeof errors] && (
            <Text style={styles.error}>{errors[key as keyof typeof errors]?.message as string}</Text>
          )}
        </View>
      ))}
      <TouchableOpacity 
        style={[styles.btn, { backgroundColor: theme.secondary, marginTop: 20 }]} 
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={styles.btnText}>Confirm Application</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};