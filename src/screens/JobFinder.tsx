import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  FlatList,
  useWindowDimensions,
} from "react-native";
import { useAppContext } from "../context/AppContext";
import { useFetch } from "../hooks/useFetch";
import { getGlobalStyles, Colors } from "../styles/style";
import { MaterialIcons } from "@expo/vector-icons";
import RenderHtml from "react-native-render-html";

export const JobFinderScreen = ({ navigation }: any) => {
  const { jobs, loading } = useFetch();
  const { isDarkMode, saveJob, savedJobs } = useAppContext();
  const [search, setSearch] = useState("");
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  const { width } = useWindowDimensions();
  const styles = getGlobalStyles(isDarkMode);
  const theme = isDarkMode ? Colors.dark : Colors.light;
  const iconColor = isDarkMode ? "#8E8E93" : "#666";

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const filtered = jobs.filter((j: any) => {
    const searchLower = search.toLowerCase();
    return (
      j.title.toLowerCase().includes(searchLower) ||
      (Array.isArray(j.tags) &&
        j.tags.some((t: string) => t.toLowerCase().includes(searchLower)))
    );
  });

  return (
    <View style={styles.screen}>
      <View style={styles.searchContainer}>
        <MaterialIcons
          name="search"
          size={20}
          color="#888"
          style={{ marginRight: 5 }}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search jobs..."
          placeholderTextColor="#888"
          onChangeText={setSearch}
          value={search}
        />
      </View>
      {loading ? (
        <ActivityIndicator size="large" color={theme.primary} />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const isSaved = savedJobs.some((sj: any) => sj.id === item.id);
            return (
              <View style={styles.card}>
                {/*Title*/}
                <Text style={styles.title}>{item.title}</Text>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 5,
                    marginTop: 5,
                    alignItems: "center",
                  }}
                >
                  <MaterialIcons name="business" size={16} color={iconColor} />
                  <Text style={styles.text}>{item.companyName}</Text>
                </View>

                {/*Location*/}
                <View
                  style={{ flexDirection: "row", gap: 5, alignItems: "center" }}
                >
                  <MaterialIcons name="place" size={16} color={iconColor} />
                  <Text style={styles.text}>{item.locations}</Text>
                </View>

                {/*Salary*/}
                <View
                  style={{ flexDirection: "row", gap: 5, alignItems: "center" }}
                >
                  <MaterialIcons name="payments" size={16} color={iconColor} />
                  <Text style={styles.text}>{item.salary}</Text>
                </View>

                {/*Description*/}
                {expandedIds.includes(item.id) ? (
                  <View style={{ marginTop: 10 }}>
                    <RenderHtml
                      contentWidth={width}
                      source={{ html: item.description }}
                      baseStyle={{ color: theme.text }}
                    />
                    <TouchableOpacity onPress={() => toggleExpand(item.id)}>
                      <Text style={{ color: theme.primary }}>Show Less</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={() => toggleExpand(item.id)}
                    style={{ marginTop: 10 }}
                  >
                    <Text style={{ color: theme.primary }}>
                      View description
                    </Text>
                  </TouchableOpacity>
                )}

                {/*Tags*/}
                <View style={styles.tagContainer}>
                  {Array.isArray(item.tags) &&
                    item.tags.map((t, i) => (
                      <View key={i} style={styles.tag}>
                        <Text style={styles.tagText}>{t}</Text>
                      </View>
                    ))}
                </View>

                {/*Buttons*/}
                <View style={{ flexDirection: "row", gap: 10, marginTop: 10 }}>
                  <TouchableOpacity
                    style={[
                      styles.btn,
                      { backgroundColor: isSaved ? "#888" : theme.primary },
                    ]}
                    onPress={() => saveJob(item)}
                    disabled={isSaved}
                  >
                    <Text style={styles.btnText}>
                      {isSaved ? "Saved" : "Save Job"}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.btn, { backgroundColor: theme.secondary }]}
                    onPress={() =>
                      navigation.navigate("Apply", { fromSaved: false })
                    }
                  >
                    <Text style={styles.btnText}>Apply</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      )}
    </View>
  );
};
