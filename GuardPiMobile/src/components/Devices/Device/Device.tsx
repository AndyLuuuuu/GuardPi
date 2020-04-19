import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Entypo, Ionicons } from '@expo/vector-icons'

type props = {
  data: {
    state: number
    deviceName: string
    type: string
    mac: string
  }
  switchState: Function
}

export const Device: React.FunctionComponent<props> = ({
  data,
  switchState,
}) => {
  const switchStatus = () => {
    switchState(data.mac)
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, padding: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Entypo
            name='signal'
            size={15}
            color={'rgba(0,0,0,0.5)'}
            style={{ marginRight: 5 }}
          />
          <Text style={styles.text}>{data.deviceName}</Text>
        </View>
        <Text style={[styles.text, styles.smallerText]}>{data.type}</Text>
        <Text style={[styles.text, styles.smallerText]}>{data.mac}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              backgroundColor: data.state === 0 ? '#d9534f' : '#5cb85c',
              width: 7,
              height: 7,
              borderRadius: 20,
              marginRight: 5,
            }}></View>
          <Text style={[styles.text, styles.smallerText]}>
            {data.state === 0 ? 'Offline' : 'Online'}
          </Text>
        </View>
      </View>
      <View
        style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
        <TouchableOpacity
          onPress={switchStatus}
          activeOpacity={0.8}
          style={{
            flex: 1,
            backgroundColor: data.state === 0 ? '#5cb85c' : '#d9534f',
            padding: 15,
            justifyContent: 'center',
            borderTopRightRadius: 5,
            borderBottomRightRadius: 5,
          }}>
          <Ionicons name='ios-power' size={25} color={'rgba(0,0,0,0.5)'} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    backgroundColor: 'white',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
    marginBottom: 10,
  },
  section: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {},
  text: {
    fontSize: 13,
    textTransform: 'capitalize',
    fontWeight: '700',
    color: 'rgba(0,0,0,0.75)',
  },
  smallerText: {
    color: 'rgba(0,0,0,0.5)',
    fontSize: 11,
  },
})
