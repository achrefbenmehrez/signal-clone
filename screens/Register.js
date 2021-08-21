import { StatusBar } from 'expo-status-bar'
import React, { useLayoutEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native'
import { Input, Button, Text } from 'react-native-elements'
import { auth } from '../firebase'

const Register = ({ navigation }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [imageUrl, setImageUrl] = useState('')

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: 'Login'
        })
    }, [navigation])

    const register = () => {
        auth.createUserWithEmailAndPassword(email, password)
        .then(authUser => {
            authUser.user.updateProfile({
                displayName: name,
                photoURL: imageUrl ? imageUrl : 'https://www.donkey.bike/wp-content/uploads/2020/12/user-member-avatar-face-profile-icon-vector-22965342-300x300.jpg'
            })
        })
        .catch((error) => alert(error.message))
    }

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light"></StatusBar>

            <Text h3 style={{ marginBottom: 50 }}>
                Create a Signal account
            </Text>

            <View style={styles.inputContainer}>
                <Input 
                    placeholder="Full Name"
                    autofocus
                    type="text"
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
                <Input 
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <Input 
                    placeholder="Password"
                    type="password"
                    value={password}
                    secureTextEntry
                    onChangeText={(text) => setPassword(text)}
                />
                <Input 
                    placeholder="Profile picture Url (optional)"
                    type="text"
                    value={imageUrl}
                    onChangeText={(text) => setImageUrl(text)}
                    onSubmitEditing={register}
                />
            </View>
            
            <Button
                containerStyle={styles.Button}
                raised
                title="Register"
                onPress={register}
            />
        </KeyboardAvoidingView>
    )
}

export default Register

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'white'
    },
    button: {
        width: 200,
        marginTop: 10
    },
    inputContainer: {
        width: 300
    }
})
