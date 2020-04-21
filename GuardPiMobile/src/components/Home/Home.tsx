import 'react-native-get-random-values';
import React, { useState, useEffect, createRef } from 'react'
import Axios from 'axios'
import { Ionicons } from '@expo/vector-icons'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native'
import { Device } from './Device/Device'
import { Item } from './Overview/Item'

type device = {
  state: number
  deviceName: string
  type: string
  mac: string
}

export const Home: React.FunctionComponent<{ navigation: any }> = ({
  navigation,
}) => {
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refreshStatus()
    })
    return unsubscribe
  }, [navigation])

  const [devices, setDevices] = useState<device[]>([])
  const [events, setEvents] = useState([])
  const [systemStatus, setSystemStatus] = useState('OFF')
  const scrollView = createRef()

  const switchSystemStatus = () => {
    Axios.get(
      `http://192.168.0.12:3000/switchAllOnline?state=${
        systemStatus === 'OFF' ? 'ON' : 'OFF'
      }`
    ).then((res) => {
      setDevices(res.data)
    })
    systemStatus === 'OFF' ? setSystemStatus('ON') : setSystemStatus('OFF')
  }

  const refreshStatus = () => {
    Axios.get('http://192.168.0.12:3000/status')
      .then((res) => {
        setDevices(res.data.devices)
        setEvents(res.data.events)
        return res.data.devices
      })
      .then((devices) => {
        setSystemStatus('OFF')
        for (let i = 0; i < devices.length; i++) {
          console.log(devices[i])
          if (devices[i].state === 1) {
            setSystemStatus('ON')
            console.log('ONE IS ONLINE')
            break
          }
        }
      })
  }

  return (
    <View style={styles.container}>
      <View style={[styles.sections, styles.center]}>
        <View
          style={[
            styles.bigButton,
            {
              width: 140,
              height: 140,
              borderRadius: 150,
              backgroundColor: systemStatus === 'OFF' ? '#e7908e' : '#91cf91',
              opacity: 0.75,
            },
          ]}>
          <TouchableOpacity
            style={[
              styles.bigButton,
              {
                backgroundColor: systemStatus === 'OFF' ? '#d9534f' : '#5cb85c',
              },
            ]}
            activeOpacity={0.75}
            onPress={switchSystemStatus}>
            <Ionicons
              name='ios-power'
              size={30}
              color={systemStatus === 'OFF' ? '#d4d4d4' : '#fff'}
              style={{ marginBottom: 5 }}
            />
            <Text
              style={{
                color: systemStatus === 'OFF' ? '#d4d4d4' : '#fff',
                fontWeight: '700',
              }}>
              {systemStatus}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.sections]}>
        <View style={[styles.card, styles.shadow]}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.title}>Overview</Text>
            <TouchableOpacity activeOpacity={0.75} onPress={refreshStatus}>
              <Ionicons name='md-refresh' size={20} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
            }}>
            <Item title='Total Events' data={events.length} color='#346beb' />
            <Item title='Total Devices' data={devices.length} color='#ff5725' />
            <Item
              title='Online Devices'
              data={devices.filter((device) => device.state !== 0).length}
              color='#5cb85c'
            />
          </View>
        </View>
      </View>
      <View style={[styles.sections]}>
        <View style={[styles.card, styles.shadow]}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.title}>Connected Devices</Text>
            <TouchableOpacity activeOpacity={0.75} onPress={refreshStatus}>
              <Ionicons name='md-refresh' size={20} />
            </TouchableOpacity>
          </View>
          <SafeAreaView
            style={{ flex: 1, padding: 4, justifyContent: 'center' }}>
            <ScrollView
              horizontal
              ref={scrollView}
              onContentSizeChange={() => scrollView.current.scrollTo({ y: 0 })}
              contentContainerStyle={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {devices.map((device) => {
                return <Device data={device} key={device.mac} />
              })}
            </ScrollView>
          </SafeAreaView>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigButton: {
    borderRadius: 100,
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    borderRadius: 5,
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
    padding: 15,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 8,
  },
  sections: {
    flex: 1,
    width: '100%',
    fontFamily: 'Quicksand-Regular',
    padding: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontWeight: '700',
    fontSize: 14,
    color: 'rgba(0,0,0,0.6)',
  },
})
