import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const AttendanceSheet = () => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;

    const students = [
        { name: "Rambabu", rollNumber: 1 },
        { name: "Sita", rollNumber: 2 },
        { name: "Arjun", rollNumber: 3 },
        { name: "Lakshmi", rollNumber: 4 },
        { name: "Krishna", rollNumber: 5 },
        { name: "Radha", rollNumber: 6 }
    ];

    const initialAttendance = students.reduce((acc, student) => {
        acc[student.rollNumber] = null; 
        return acc;
    }, {});

    const [attendance, setAttendance] = useState(initialAttendance);

    const handleAttendance = (rollNumber, status) => {
        setAttendance(prevState => ({
            ...prevState,
            [rollNumber]: status
        }));
    };

    const totalStudents = students.length;
    const presentCount = Object.values(attendance).filter(status => status === 'P').length;
    const absentCount = Object.values(attendance).filter(status => status === 'A').length;

    return (
        <View style={[styles.container, { backgroundColor: '#D9D9D9' }]}>
            <View style={styles.studentsHead}>
                <Text style={styles.heading}>IV Year</Text>
                <Text style={styles.date}>{formattedDate}</Text>
            </View>
            <View style={styles.preAbsContainer}>
                <Text style={[styles.preAbsText, { color: 'green' }]}>P</Text>
                <Text style={[styles.preAbsText, { color: 'red' }]}>A</Text>
            </View>
            <View>
                {students.map((student) => (
                    <View key={student.rollNumber} style={styles.studentContainer}>
                        <Text style={styles.studentText}>{student.rollNumber}</Text>
                        <Text style={styles.studentText}>{student.name}</Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={[styles.button, attendance[student.rollNumber] === 'P' && styles.activeButton, { backgroundColor: attendance[student.rollNumber] === 'P' ? 'green' : 'transparent' }]}
                                onPress={() => handleAttendance(student.rollNumber, 'P')}
                            >
                                <Text style={[styles.buttonText, { color: attendance[student.rollNumber] === 'P' ? '#ffffff' : '#333333' }]}>P</Text>
                                </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, attendance[student.rollNumber] === 'A' && styles.activeButton, { backgroundColor: attendance[student.rollNumber] === 'A' ? 'red' : 'transparent' }]}
                                onPress={() => handleAttendance(student.rollNumber, 'A')}
                            >
                                <Text style={[styles.buttonText, { color: attendance[student.rollNumber] === 'A' ? '#' : '#333333' }]}>A</Text>
                                </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </View>
            <View style={styles.bottomContainer}>
                <View style={styles.infoContainer}>
                    <Text>Total Students: {totalStudents}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text>No. of Present: {presentCount}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text>No. of Absent: {absentCount}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop:50
    },
    studentsHead: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    date: {
        fontSize: 16,
        color: '#666666',
    },
    preAbsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-start',
        marginBottom: 10,
    },
    preAbsText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333333',
    },
    studentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#dddddd',
        backgroundColor:999999,
        paddingBottom: 5,
        padding:6
    },
    studentText: {
        fontSize: 18,
        color: '#333333',
    },
    buttonContainer: {
        flexDirection: 'row',
    },
    button: {
        padding: 10,
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: '#999999',
        borderRadius: 5,
        backgroundColor:"#fff"
    },
    activeButton: {
        borderColor: 'blue',
    },
    buttonText: {
        fontSize: 16,
        color: '#333333',
        textAlign: 'center',
    },
    bottomContainer: {
        marginTop: 20,
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
});

export default AttendanceSheet;
