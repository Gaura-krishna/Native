import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Linking } from "react-native";
import { memos } from "../config/memo";

const MemosMain = () => {
  const [memosdata, setMemoData] = useState(memos);

  const handleDownload = (link) => {
    Linking.openURL(link).catch((err) => console.error("Failed to open link:", err));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {memosdata.map((memo) => (
        <View style={styles.memoCard} key={memo.id}>
          <View style={styles.memoHeader}>
            <Text style={styles.memoTitle}>{memo.title}</Text>
            {memo.memo_link ? (
              <TouchableOpacity onPress={() => handleDownload(memo.memo_link)}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>Download</Text>
                </View>
              </TouchableOpacity>
            ) : (
              <View style={styles.comingSoon}>
                <Text style={styles.comingSoonText}>Coming Soon</Text>
              </View>
            )}
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  memoCard: {
    backgroundColor: "#ccc",
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
  },
  memoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  memoTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#aaa",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  buttonText: {
    fontSize: 16,
    textAlign: "center",
  },
  comingSoon: {
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#aaa",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  comingSoonText: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
  },
});

export default MemosMain;
