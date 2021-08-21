import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'
import { db } from '../firebase'

const CustomListItem = ({ id, chatName, enterChat }) => {
    const [chatMessages, setChatMessages] = useState([])

    useEffect(() => {
        const unsubscribe = db.collection('chats').doc(id).collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot(snapshot => 
            setChatMessages(snapshot.docs.map(doc => doc.data()))
        )

        return unsubscribe
    }, [])

    return (
        <ListItem key={id} bottomDivider onPress={() => enterChat(id, chatName)}>
            <Avatar
                rounded
                source={{
                    uri:
                    chatMessages?.[chatMessages.length - 1]?.photoURL ||
                    'https://365psd.com/images/istock/previews/1009/100996291-male-avatar-profile-picture-vector.jpg',
                }}
                />
            <ListItem.Content>
                <ListItem.Title style={{ fontWeight: "800" }}>
                    {chatName}
                </ListItem.Title>
                <ListItem.Subtitle
                    numberOfLines={1}
                    ellipsizeMode='tail'
                >
                    {chatMessages?.[chatMessages.length - 1].displayName} : {chatMessages?.[chatMessages.length - 1].message}
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default CustomListItem

const styles = StyleSheet.create({})
