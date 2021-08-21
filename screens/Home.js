import React, { useEffect, useLayoutEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View, SafeAreaView, ActivityIndicator, TouchableOpacity } from 'react-native'
import { Avatar, Button } from 'react-native-elements'
import CustomListItem from '../components/CustomListItem'
import { auth, db } from '../firebase'
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons'

const Home = ({ navigation }) => {
    const [chats, setChats] = useState([])
    const [loading, setloading] = useState(true)

    const signOut = () => {
        auth.signOut()
        .then(() => {
            navigation.replace('Login')
        })
        .catch(err => {
            alert(err)
        })
    }

    useEffect(() => {
        const unsubscribe = db.collection("chats").onSnapshot((snapshot) => {
            snapshot.docs.map((doc) => {
                setChats(prevState => {
                    prevState.push({
                        id: doc.id,
                        data: doc.data()
                    })
                    return prevState
                })
            })
            setloading(false)
        })

        return unsubscribe
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Signal",
            headerStyle: { backgroundColor: "white" },
            headerTitleStyle: { color: "black" },
            headerTintColor: "black",
            headerLeft: () => (
                <View style={{ marginLeft: 20 }}>
                    <TouchableOpacity onPress={signOut} activeOpacity={0.5}>
                        <Avatar
                            rounded
                            source={{
                                uri: auth?.currentUser?.photoURL
                            }}
                        />
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: 80,
                    marginRight: 20,
                }}>
                    <TouchableOpacity activeOpacity={0.5}>
                        <AntDesign name="camerao" size={24} color="black"/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('AddChat')} activeOpacity={0.5}>
                        <SimpleLineIcons name="pencil" size={24} color="black"/>
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation])

    const enterChat = (id, chatName) => {
        navigation.navigate("Chat", {
            id,
            chatName
        })
    }

    return (
        <SafeAreaView>
            <ScrollView>
                {loading ? <ActivityIndicator size="large" style={{ paddingTop: 30 }} /> :
                chats.map(({ id, data: { chatName } }) => (
                    <CustomListItem key={id} id={id} chatName={chatName} enterChat={enterChat}/>
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        height: '100%',
        
    }
})
