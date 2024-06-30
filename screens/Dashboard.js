import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import AttendanceIcon from "../assets/AttendanceIcon.png";
import MemoIcon from "../assets/MemoIcon.png";
import AssignmentsIcon from "../assets/AssginmentsIcon.png";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Dashboard = () => {
    const [menuItems, setMenuItems] = useState([]);
    const navigation = useNavigation();

    const handleUser = async () => {
        const storedType = await AsyncStorage.getItem('type');
        if (storedType === "Teacher") {
            setMenuItems([
                {
                    title: "Take Attendance",
                    imageurl: AttendanceIcon,
                    routeLink: "AttendanceSheet",
                },
                {
                    title: "Assign Homework",
                    imageurl: AssignmentsIcon,
                    routeLink: "AssignmentsMain",
                },
            ]);
        } else if (storedType === "Student") {
            setMenuItems([
                {
                    title: "Track your Attendance",
                    imageurl: AttendanceIcon,
                    routeLink: "Attendance",
                },
                {
                    title: "Get your Memos",
                    imageurl: MemoIcon,
                    routeLink: "MemosMain",
                },
                {
                    title: "Assignments",
                    imageurl: AssignmentsIcon,
                    routeLink: "AssignmentsMain",
                },
            ]);
        }
    };

    useEffect(() => {
        handleUser();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.headPart}>
                <Image style={styles.logo} source={require('../assets/logo.png')} />
            </View>
            {menuItems.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.menuItem}
                    onPress={() => navigation.navigate(item.routeLink)}
                >
                    <View style={styles.menuItemContent}>
                        <Image source={item.imageurl} style={styles.icon} />
                        <Text style={styles.title}>{item.title}</Text>
                    </View>
                </TouchableOpacity>
            ))}
            <View style={styles.signUpLogo}>
                <Image source={require('../assets/persons.png')} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    menuItem: {
        width: "80%",
        marginVertical: 10,
        borderRadius: 10,
        backgroundColor: "#ccc",
        padding: 10,
    },
    menuItemContent: {
        flexDirection: "row",
        alignItems: "center",
    },
    icon: {
        width: 50,
        height: 50,
        marginRight: 20,
    },
    title: {
        fontSize: 20,
    },
    headPart: {
        position: "absolute",
        top: 20,
    },
    signUpLogo: {
        position: "absolute",
        bottom: 0,
        alignSelf: "center",
    },
    logo: {
        width: 100,
        height: 100,
    },
});

export default Dashboard;
