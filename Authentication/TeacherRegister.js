import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook

const TeacherRegister = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [username, setUsername] = useState('');
    const [rollNo, setRollNo] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation(); // Initialize navigation hook

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(email);
    };

    const handleSubmit = async () => {
        if (!username || !rollNo || !email || !password) {
            alert('Please fill in all fields');
            return;
        }
        if (!validateEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }
        try {
            await AsyncStorage.setItem('username', username);
            await AsyncStorage.setItem('rollNo', rollNo);
            await AsyncStorage.setItem('email', email);
            await AsyncStorage.setItem('password', password);
            await AsyncStorage.setItem('type', 'Teacher');
            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false);
                navigation.navigate('TeacherLogin'); // Navigate to TeacherLogin screen
            }, 1000);
        } catch (error) {
            // console.log(error);
        }
    };

    // const handleRollNoChange = (text) => {
    //     if (/^\d*$/.test(text)) {
    //         setRollNo(text);
    //     }
    // };

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.signupHeading}>
                    <Text style={styles.signupHead}>Welcome to</Text>
                    <Text style={styles.dtdp}> DTDP </Text>
                    <Text style={styles.studentPortal}>student portal</Text>
                </Text>
                <Text style={styles.loginAccess}>Login to access your account</Text>
            </View>
            <Text style={styles.signup}>Sign Up</Text>
            <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Username</Text>
                    <TextInput
                        style={styles.input}
                        value={username}
                        placeholder="Enter UserName"

                        onChangeText={setUsername}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Phone Number</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType='numeric'
                        value={rollNo}
                        placeholder="Enter Phone Number"
                        onChangeText={setRollNo}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Email"
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>New Password</Text>
                    <TextInput
                        style={styles.input}
                        secureTextEntry={true}
                        value={password}
                        placeholder="Enter Password"
                        onChangeText={setPassword}
                    />
                </View>
                <TouchableOpacity style={styles.signUpBtn} onPress={handleSubmit}>
                    <Text style={styles.btnText}>Sign Up</Text>
                </TouchableOpacity>
                <Text style={styles.signupStudent}>Sign Up as Student</Text>
                <Text style={styles.signupOr}>or</Text>
                <TouchableOpacity style={styles.loginBtn}>
                    <Text style={styles.btnText}>Login</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.logoContainer}>
                <Image source={require('../assets/logo.png')} style={styles.logo} />
            </View>
            {showPopup && (
                <View style={styles.popupContainer}>
                    <View style={styles.popup}>
                        <View style={styles.circle}>
                            <MaterialIcons name="done" size={40} color="green" />
                        </View>
                        <Text style={styles.popupText}>Thank you for signing up</Text>
                        <Text style={styles.popupText}>Soon you will receive a confirmation email from Admin</Text>
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    signupHeading: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    signupHead: {
        fontWeight: 'normal',
    },
    dtdp: {
        fontWeight: 'bold',
        color: '#007bff', // example color
    },
    studentPortal: {
        fontWeight: 'bold',
        color: '#007bff', // example color
    },
    loginAccess: {
        textAlign: 'center',
        marginBottom: 20,
    },
    signup: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    formContainer: {
        width: '100%',
    },
    inputContainer: {
        marginBottom: 10,
    },
    inputLabel: {
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
    },
    signUpBtn: {
        backgroundColor: '#007bff', // example color
        padding: 15,
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 10,
    },
    loginBtn: {
        backgroundColor: '#28a745', // example color
        padding: 15,
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 10,
    },
    btnText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    signupStudent: {
        textAlign: 'center',
        marginBottom: 10,
    },
    signupOr: {
        textAlign: 'center',
        marginBottom: 10,
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    logo: {
        width: 100,
        height: 100,
    },
    popupContainer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    popup: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    circle: {
        backgroundColor: '#28a745', // example color
        borderRadius: 50,
        padding: 10,
        marginBottom: 10,
    },
    popupText: {
        textAlign: 'center',
        marginBottom: 10,
    },
});

export default TeacherRegister;
