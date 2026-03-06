import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { useAppContext } from "../context/AppContext";
import { getGlobalStyles, Colors } from "../styles/style";
import { MaterialIcons } from "@expo/vector-icons";
import RenderHtml from "react-native-render-html";

export const SavedJobsScreen = ({ navigation }: any) => {
  const { savedJobs, removeJob, isDarkMode } = useAppContext();
  const styles = getGlobalStyles(isDarkMode);
  const { width } = useWindowDimensions();
  const [expandedIds, setExpandedIds] = useState<string[]>([]);

  const theme = isDarkMode ? Colors.dark : Colors.light;
  const iconColor = isDarkMode ? "#8E8E93" : "#666";

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  return (
    <View style={styles.screen}>
      <FlatList
        data={savedJobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isExpanded = expandedIds.includes(item.id);
          return (
            <View style={styles.card}>
              <Text style={styles.title}>{item.title}</Text>

              {/* Company Name*/}
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

              {/* Location */}
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
                  <Text style={{ color: theme.primary }}>View description</Text>
                </TouchableOpacity>
              )}

              {/* Tags */}
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
              <View style={{ flexDirection: "row", gap: 10, marginTop: 10 }}>
                <TouchableOpacity
                  style={[styles.btn, { backgroundColor: "#a73b35" }]}
                  onPress={() => removeJob(item.id)}
                >
                  <Text style={styles.btnText}>Remove</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.btn, { backgroundColor: theme.secondary }]}
                  onPress={() =>
                    navigation.navigate("Apply", { fromSaved: true })
                  }
                >
                  <Text style={styles.btnText}>Apply</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
        ListEmptyComponent={
          <Text style={[styles.text, { textAlign: "center", marginTop: 20 }]}>
            No saved jobs yet.
          </Text>
        }
      />
    </View>
  );
};
