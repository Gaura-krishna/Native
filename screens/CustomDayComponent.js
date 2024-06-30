import React from "react";
import { View, Text, StyleSheet } from "react-native";
 
const CustomDayComponent = ({ date, attendanceStatus, isWeekend }) => {
  const textStyle = isWeekend ? styles.weekendText : styles.regularText;
  const backgroundColorStyle = !isWeekend
    ? attendanceStatus === "present"
      ? styles.presentBackground
      : styles.absentBackground
    : null;
 
  return (
    <View style={[styles.container, backgroundColorStyle]}>
      <Text style={[styles.dateText, textStyle]}>{date.day}</Text>
      {isWeekend && <Text style={[styles.statusText, textStyle]}></Text>}
    </View>
  );
};
 
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4, // optional, to give a rounded effect
    padding: 5,
    margin: 2,
  },
  dateText: {
    fontSize: 16,
  },
  statusText: {
    fontSize: 12,
  },
  weekendText: {
    color: "red",
  },
  regularText: {
    color: "black",
  },
  presentBackground: {
    backgroundColor: "green",
  },
  absentBackground: {
    backgroundColor: "red",
  },
});
 
export default CustomDayComponent;