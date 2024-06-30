import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Updated import
import { useNavigation } from '@react-navigation/native'; // Import navigation hook

const StudentRegister = () => {
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
            await AsyncStorage.setItem('type', 'Student');
            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false);
                navigation.navigate('StudentLogin'); // Navigate to TeacherLogin screen
            }, 1000);
        } catch (error) {
        }
    };
    // const handleRollNoChange = (text) => {
    //     if (/^\d*$/.test(text)) {
    //         setRollNo(text);
    //     }
    // };
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View>
                <Text style={styles.signupHeading}>
                    <Text>Welcome to{'\n'}</Text>
                    <Text style={styles.dtdp}>DTDP{'\n'}</Text>
                    <Text style={styles.studentPortal}>student portal</Text>
                </Text>
                <Text style={styles.loginAccess}>Login to access your account</Text>
            </View>
            <Text style={styles.signUpText}>Sign Up</Text>
            <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Username</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter username"
                        value={username}
                        onChangeText={setUsername}
                        autoCapitalize="none"
                        keyboardType="default"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Roll No</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="default"
                        value={rollNo}
                        placeholder="Enter roll number"
                        onChangeText={setRollNo}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>e-Mail</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter email"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>New Password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter new password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                        autoCapitalize="none"
                        keyboardType="default"
                    />
                </View>
                <Button title="Sign Up" onPress={handleSubmit} />
                <Text style={styles.signupStudent}>Sign Up as Student</Text>
                <Text style={styles.signupOr}>or</Text>
                <Button title="Login" onPress={() => console.log('Login button pressed')} />
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
                        <Text style={styles.popupText}>Thank you student for signing up</Text>
                        <Text style={styles.popupText}>Soon you will receive a confirmation mail from Admin</Text>
                    </View>
                </View>
            )}
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    signupHeading: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 10,
    },
    dtdp: {
        fontWeight: 'bold',
        fontSize: 28,
    },
    studentPortal: {
        fontSize: 18,
    },
    loginAccess: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    signUpText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    formContainer: {
        width: '100%',
        marginBottom: 20,
    },
    inputContainer: {
        marginBottom: 10,
    },
    label: {
        marginBottom: 5,
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        height: 40,
    },
    signupStudent: {
        textAlign: 'center',
        marginBottom: 5,
    },
    signupOr: {
        textAlign: 'center',
        marginVertical: 5,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 100,
        height: 100,
    },
    popupContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    popup: {
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        padding: 20,
        borderRadius: 10,
    },
    circle: {
        backgroundColor: 'lightgreen',
        borderRadius: 50,
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    popupText: {
        textAlign: 'center',
        marginBottom: 5,
    },
});

export default StudentRegister;
