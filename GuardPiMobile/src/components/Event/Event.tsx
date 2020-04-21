import React, { useState, useEffect, createRef } from 'react'
import Axios from 'axios'
import { Feather } from '@expo/vector-icons'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView
} from 'react-native'
import {Item} from './Item/Item'

export const Event: React.FunctionComponent<{ navigation: any }> = ({
  navigation,
}) => {
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refreshStatus()
    })
    return unsubscribe
  }, [navigation])

  const [events, setEvents] = useState([])

  const refreshStatus = () => {
    Axios.get('http://192.168.0.12:3000/status')
      .then((res) => {
        setEvents(res.data.events)
        console.log(res.data.events)
      })
  }

  return (
     <SafeAreaView style={styles.container}>
      <FlatList
        data={events}
        renderItem={({ item }) => <Item event={item} />}
        keyExtractor={item => `${item.id}`}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
})
