import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { assignment } from "../config/assignment";
import FontAwesome from 'react-native-vector-icons/Ionicons';

const AssignmentsMain = () => {
    const [assignments, setAssignments] = useState(assignment);
    const [qadata, setQadata] = useState();
    const [isShow, setIsShow] = useState(false);

    const handleCategorieData = (data) => {
        setIsShow(!isShow);
        setQadata(data.categorie);
    };

    const handleBack = () => {
        setIsShow(false);
        setQadata();
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {!isShow ? (
                <>
                    {assignments.map((categories) => (
                        <TouchableOpacity
                            style={styles.categoryItem}
                            key={categories.categorie.title}
                            onPress={() => handleCategorieData(categories)}
                        >
                            <View style={styles.categoryContainer}>
                                <Text>{categories.categorie.title}</Text>
                                <FontAwesome size={24} color="#9C6FE4" />
                            </View>
                        </TouchableOpacity>
                    ))}
                </>
            ) : (
                <>
                    <TouchableOpacity
                        style={styles.backButton}
                        key={qadata.title}
                        onPress={handleBack}
                    >
                        <View style={styles.backContainer}>
                            <Text style={{ color: '#9C6FE4', fontWeight: 'bold', fontSize: 20 }}>&lt;-</Text>
                            <Text style={styles.backText}>{qadata.title}</Text>
                        </View>
                    </TouchableOpacity>
                    {qadata.questions?.map((val, index) => {
                        let statusStyle = {};
                        let statusColor = "#CCCCCC"; // Default color

                        switch (val.status) {
                            case "Handed in":
                                statusColor = "#00FF00";
                                break;
                            case "Not Done":
                                statusColor = "#FF0000";
                                break;
                            case "Done Late":
                                statusColor = "#FFA500";
                                break;
                            case "Attach homework in pdf file":
                                statusColor = "#FFFF00";
                                break;
                            default:
                                statusColor = "#CCCCCC";
                                break;
                        }

                        return (
                            <View key={index} style={styles.questionContainer}>
                                <View style={styles.row}>
                                    <Text style={styles.deadline}>
                                        By 29 June, 12:00 pm
                                    </Text>
                                </View>
                                <View style={styles.questionBox}>
                                    <Text>{val.question}</Text>
                                </View>
                                <Text style={[styles.statusText, { backgroundColor: statusColor }]}>
                                    {val.status}
                                </Text>
                            </View>
                        );
                    })}
                </>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
        marginTop: 0
    },
    categoryItem: {
        backgroundColor: "#CCCCCC",
        paddingHorizontal: 10,
        marginBottom: 10,
        width: '90%',
        height: 50
    },
    categoryContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    backButton: {
        backgroundColor: "#CCCCCC",
        paddingHorizontal: 10,
        marginBottom: 10,
        width: '80%',
    },
    backContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    backText: {
        marginLeft: 10,
    },
    questionContainer: {
        marginVertical: 10,
        alignItems: 'center',
        width: '90%',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 10,
    },
    deadline: {
        textAlign: "left",
    },
    questionBox: {
        backgroundColor: "#F0F0F0",
        padding: 10,
        marginHorizontal: 10,
        width: '100%',
    },
    statusText: {
        textAlign: "left",
        backgroundColor: "#CCCCCC",
        padding: 5,
        marginTop: 10, // Add margin to separate from the question
        marginLeft: 20, // Adjust as needed for spacing
    },
});

export default AssignmentsMain;
