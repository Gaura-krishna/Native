import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { CalendarList } from "react-native-calendars";
// Import CustomDayComponent based on your project structure
import CustomDayComponent from "./CustomDayComponent";
// Import userdetails from config (adjust path as needed)
import { userdetails } from "../config/userdetails";

const Attendance = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getWeekendsCount = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    let weekendsCount = 0;

    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(year, month, day);
      if (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
        // Sunday is day 0 and Saturday is day 6
        weekendsCount++;
      }
    }

    return weekendsCount;
  };

  const getAttendanceStatus = (date) => {
    if (!date || typeof date !== "object" || !date.dateString) {
      console.error("Invalid date object:", date);
      return "absent"; // Default to absent if date is invalid
    }

    const parsedDate = new Date(date.dateString);
    const dateString = parsedDate.toISOString().split("T")[0]; // Assuming 'dateString' is the property name in the date object
    if (!dateString) {
      console.error("Invalid date format:", date);
      return "absent"; // Default to absent if date format is unsupported
    }

    const attendanceData = userdetails.find((item) => item.date === dateString);
    return attendanceData ? attendanceData.attendance : "absent"; // Default to absent if not found
  };

  const CustomToolbar = ({ date, onNavigate }) => {
    const monthYearString = `${date.toLocaleString("default", {
      month: "long",
    })} ${date.getFullYear()}`;
    // Insert console log to verify if CustomToolbar is rendered
    console.log("Rendering CustomToolbar");

    return (
      <View style={styles.toolbarContainer}>
        <TouchableOpacity onPress={() => onNavigate("PREV")}>
          <Text style={styles.toolbarText}>PREV</Text>
        </TouchableOpacity>
        <Text style={styles.month}>{monthYearString}</Text>
        <TouchableOpacity onPress={() => onNavigate("NEXT")}>
          <Text style={styles.toolbarText}>NEXT</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const handleMonthChange = (newDate) => {
    setCurrentMonth(newDate);
  };

  const totalDays = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();
  const weekendsCount = getWeekendsCount(currentMonth);
  const workingDaysCount = totalDays - weekendsCount;

  return (
    <View style={styles.container}>
      <Text style={styles.attend}>Attendance</Text>
      <CalendarList
        pastScrollRange={0}
        futureScrollRange={0}
        scrollEnabled
        showScrollIndicator
        current={currentMonth}
        renderCustomHeader={(date) => (
          <CustomToolbar
            date={date}
            onNavigate={(direction) => {
              const newMonth =
                direction === "NEXT"
                  ? new Date(
                      currentMonth.getFullYear(),
                      currentMonth.getMonth() + 1,
                      1
                    )
                  : new Date(
                      currentMonth.getFullYear(),
                      currentMonth.getMonth() - 1,
                      1
                    );
              handleMonthChange(newMonth);
            }}
          />
        )}
        dayComponent={({ date }) => {
          const attendanceStatus = getAttendanceStatus(date);
          const dayOfWeek = new Date(date.dateString).getDay();
          const isWeekend = dayOfWeek === 0 || dayOfWeek === 6; // Sunday or Saturday
          return (
            <CustomDayComponent
              date={date}
              attendanceStatus={attendanceStatus}
              isWeekend={isWeekend}
            />
          );
        }}
      />
      <View style={styles.attendanceTracker}>
        <Text style={styles.attendanceHead}>No of Working Days</Text>
        <Text style={styles.days}>{workingDaysCount}</Text>
      </View>
      <View style={styles.attendanceTracker}>
        <Text style={styles.attendanceHead}>No of Weekends (Sundays)</Text>
        <Text style={styles.days}>{weekendsCount}</Text>
      </View>
      <View style={styles.attendanceTracker}>
        <Text style={styles.attendanceHead}>No of Absents</Text>
        {/* Placeholder for actual implementation */}
        <Text style={styles.days}>15</Text>
      </View>
      <Text style={styles.juneText}>June Attendance Percentage</Text>
      {/* Placeholder for actual implementation */}
      <Text style={styles.percent}>10%</Text>
      <View>
        <View>
          <View style={styles.indicationOne}>
            <Text style={styles.indicationClg}>College Holidays</Text>
            <Text style={styles.indicationPre}>{totalDays}</Text>
          </View>
          <View style={styles.indicationTwo}>
            <Text style={styles.indicationAbs}>Absent</Text>
            <Text style={styles.indicationWeek}>Weekends</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  toolbarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 20,
    backgroundColor: "lightblue", // Add background color to visualize toolbar
  },
  toolbarText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  month: {
    fontSize: 16,
  },
  attend: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  attendanceTracker: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  attendanceHead: {
    fontSize: 16,
  },
  days: {
    fontSize: 16,
  },
  juneText: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 10,
  },
  percent: {
    textAlign: "center",
    marginVertical: 10,
    fontSize: 16,
  },
  indicationOne: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  indicationClg: {
    fontSize: 16,
  },
  indicationPre: {
    fontSize: 16,
  },
  indicationTwo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  indicationAbs: {
    fontSize: 16,
  },
  indicationWeek: {
    fontSize: 16,
  },
});

export default Attendance;
