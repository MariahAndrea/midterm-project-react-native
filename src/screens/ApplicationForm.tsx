import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
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

export const ApplyScreen = ({ route, navigation }: any) => {
  const { fromSaved } = route.params || {};
  const { isDarkMode } = useAppContext();
  const styles = getGlobalStyles(isDarkMode);
  const { control, handleSubmit, reset, formState: { errors } } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = () => {
    Alert.alert("Success", "Application Submitted!", [{
      text: "Okay",
      onPress: () => {
        reset();
        // Requirement: Redirect back to Job Finder if opened from saved jobs
        fromSaved ? navigation.navigate("JobFinder") : navigation.goBack();
      }
    }]);
  };

  return (
    <ScrollView style={styles.screen}>
      {['name', 'email', 'phone', 'why'].map(f => (
        <View key={f}>
          <Controller control={control} name={f as any} render={({ field: { onChange, value } }) => (
            <TextInput style={styles.input} placeholder={f.toUpperCase()} placeholderTextColor="#888" onChangeText={onChange} value={value} />
          )} />
          {errors[f as keyof typeof errors] && <Text style={styles.error}>{errors[f as keyof typeof errors]?.message as string}</Text>}
        </View>
      ))}
      <TouchableOpacity style={[styles.btn, { backgroundColor: Colors.light.secondary, marginTop: 20 }]} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.btnText}>Confirm Application</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};