import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { Input, Image, Button } from 'react-native-elements'
import { auth } from '../firebase'

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if(authUser) {
                navigation.replace('Home');
            }
        })

        return unsubscribe
    }, [])

    const signIn = () => {
        auth.signInWithEmailAndPassword(email, password)
        .catch(error => alert(error.message));
    }

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light" />
            <Image
                style={{ width: 200, height: 200 }}
                source={{
                uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Signal-Logo.svg/1200px-Signal-Logo.svg.png',
                }}
            />
            <View style={styles.inputContainer}>
                <Input
                    placeholder="Email"
                    autofocus type="email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <Input
                    placeholder="Password"
                    secureTextEntry
                    type="password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    onSubmitEditing={signIn}
                />
            </View>

            <Button containerStyle={styles.button} title="Login" onPress={signIn}/>
            <Button containerStyle={styles.button} type="outlined" title="Register" onPress={() => navigation.navigate('Register')}/>

            <View style={{ height: 100 }}/>
        </KeyboardAvoidingView>
    )
}

export default Login


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'white'
    },
    inputContainer: {
        width: 300,
    },
    button: {
        width: 200,
        marginTop: 10
    },
})