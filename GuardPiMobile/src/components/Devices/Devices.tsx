import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { StyleSheet, SafeAreaView, View, FlatList } from 'react-native'
import { Device } from './Device/Device'

type device = {
  state: number
  deviceName: string
  type: string
  mac: string
}

export const Devices: React.FunctionComponent<{ navigation: any }> = ({
  navigation,
}) => {
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      Axios.get('http://192.168.0.12:3000/status').then((res) => {
        setDevices(res.data.devices)
      })
    })
    return unsubscribe
  }, [navigation])

  const [devices, setDevices] = useState<device[]>([])
  const [fetching, isFetching] = useState(false)

  const switchState = (mac: string) => {
    for (let i = 0; i < devices.length; i++) {
      if (devices[i].mac === mac) {
        Axios.get(
          `http://192.168.0.12:3000/switchOnline?mac=${mac}&state=${devices[i].state}`
        ).then((res) => {
          setDevices(res.data)
        })
        break
      }
    }
    // setDevices(temp)
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={devices}
        renderItem={({ item }) => (
          <Device data={item} switchState={switchState} key={item.mac} />
        )}
        onRefresh={() => {
          isFetching(true)
          Axios.get('http://192.168.0.12:3000/status').then((res) => {
            setDevices(res.data.devices)
            isFetching(false)
          })
        }}
        refreshing={fetching}
        keyExtractor={(item) => item.mac}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
})
