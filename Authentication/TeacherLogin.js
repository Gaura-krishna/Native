import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    StyleSheet,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const TeacherLogin = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleUsernameChange = (text) => {
        setUsername(text);
    };

    const handlePasswordChange = (text) => {
        setPassword(text);
    };

    const handleLogin = async () => {
        if (!username || !password) {
            alert('Please fill in all fields');
            return;
        }
        try {
            const storedUsername = await AsyncStorage.getItem('username');
            const storedPassword = await AsyncStorage.getItem('password');
    
            if (!storedUsername || !storedPassword) {
                Alert.alert('Error', 'No stored credentials found');
                return;
            }
    
            const trimmedStoredUsername = storedUsername.trim();
            const trimmedUsername = username.trim();
    
            if (trimmedStoredUsername !== trimmedUsername) {
                Alert.alert('Login Failed', 'Invalid username');
            } else if (storedPassword !== password) {
                Alert.alert('Login Failed', 'Invalid password');
            } else {
                onLoginSuccess(); // Call onLoginSuccess when login is successful
            }
        } catch (error) {
            // console.log(error)
            Alert.alert('Error', 'Failed to retrieve user details');
        }
    };
    

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.innerContainer}>
                    <View>
                        <Text style={styles.signupHeading}>
                            <Text style={styles.signupHead}>Welcome to</Text>{' '}
                            <Text style={styles.dtdp}>DTDP</Text>{' '}
                            <Text style={styles.studentPortal}>student portal</Text>
                        </Text>
                        <Text style={styles.loginAccess}>
                            Login to access your account
                        </Text>
                    </View>
                    <Text style={styles.signup}>Login</Text>
                    <View style={styles.formContainer}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputFields}>Username</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your username"
                                value={username}
                                onChangeText={handleUsernameChange}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputFields}>Password</Text>
                            <TextInput
                                style={styles.input}
                                secureTextEntry={true}
                                placeholder="Enter your password"
                                value={password}
                                onChangeText={handlePasswordChange}
                            />
                        </View>
                        <TouchableOpacity>
                            <Text style={styles.forgotPassword}>
                                Forgot Password?
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.loginButton}
                            onPress={handleLogin}
                        >
                            <Text style={styles.loginButtonText}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('TeacherRegister')
                            }
                        >
                            <Text style={styles.signupStudent}>
                                Register as Teacher
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.logoContainer}>
                        <Image
                            source={require('../assets/logo.png')}
                            style={styles.logo}
                        />
                    </View>
                    <View style={[styles.logoContainer,]}>
                        <Image source={require('../assets/persons.png')} style={styles.logo} />
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 20,
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'space-between',
    },
    signupHeading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    signupHead: {
        color: '#333333',
    },
    dtdp: {
        color: '#00bfff',
    },
    studentPortal: {
        color: '#333333',
    },
    loginAccess: {
        fontSize: 18,
        marginBottom: 20,
    },
    signup: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    formContainer: {
        marginBottom: 20,
    },
    inputContainer: {
        marginBottom: 15,
    },
    inputFields: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#cccccc',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
    },
    forgotPassword: {
        color: '#00bfff',
        marginBottom: 10,
    },
    loginButton: {
        backgroundColor: '#00bfff',
        paddingVertical: 15,
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 10,
    },
    loginButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    signupStudent: {
        textAlign: 'center',
        color: '#00bfff',
        marginTop: 10,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        // resizeMode: 'contain',
    },
});

export default TeacherLogin;
