import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { loginCreator } from '../redux/reducers/slices/authSlice';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const dispatch = useDispatch()
    const validateEmail = (email) => {
        // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const emailRegex = /^[A-Za-z]+$/
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        // const passwordRegex = /^(?=.*[A-Z])(?=.*[\W])(?=.*\d).{6,}$/;
        const passwordRegex = /^[A-Za-z]+$/
        return passwordRegex.test(password);
    };

    const handleLogin = () => {
        setEmailError('');
        setPasswordError('');

        let valid = true;

        if (!validateEmail(email)) {
            setEmailError('Invalid email format');
            valid = false;
        }

        if (!validatePassword(password)) {
            setPasswordError('Password must contain at least 1 uppercase, 1 special char, and 1 number');
            valid = false;
        }

        if (valid) {
            // Alert.alert('Login Successful', `Welcome, ${email}!`);
            dispatch(loginCreator({username: email, password }))

        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />
            {emailError ? <Text style={styles.error}>{emailError}</Text> : null}

            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '80%',
        padding: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    error: {
        color: 'red',
        fontSize: 14,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 12,
        borderRadius: 5,
        marginTop: 10,
        width: '80%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default LoginScreen;
