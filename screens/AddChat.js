import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Input, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import { db } from '../firebase'

const AddChat = ({ navigation }) => {
    const [input, setInput] = useState('')

    const createChat = async () => {
        await db.collection('chats').add({
            chatName: input
        })
        .then(() => {
            navigation.goBack()
        })
        .catch(err => alert(err))
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Add a new Chat",
            headerBackTitle: "Chats"
        })
    }, [navigation])

    return (
        <View>
            <Input
                placeholder="Enter a chat name"
                value={input}
                onChangeText={(text) => setInput(text)}
                onSubmitEditing={createChat}
                leftIcon={
                    <Icon
                        name="wechat"
                        type="antdesign"
                        size={24}
                        color="black"
                    />
                }
            />
            <Button disabled={!input} onPress={createChat} title="Create a new chat"/>
        </View>
    )
}

export default AddChat

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 30,
        height: "100%"   
    },
})
