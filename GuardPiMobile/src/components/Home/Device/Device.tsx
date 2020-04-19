import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Entypo, Ionicons } from '@expo/vector-icons'

type dataType = {
  state: number
  deviceName: string
  type: string
  mac: string
}

export const Device: React.FunctionComponent<{ data: dataType }> = ({
  data,
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: 'white',
          borderWidth: 0.75,
          borderColor: data.state === 0 ? '#d9534f' : '#5cb85c',
        },
      ]}>
      <View style={styles.section}>
        <Entypo
          name='signal'
          size={25}
          color={data.state === 0 ? '#d9534f' : '#5cb85c'}
        />
      </View>
      <View style={styles.section}>
        <Text style={[styles.text, { fontWeight: '700', fontSize: 14 }]}>
          {data.deviceName}
        </Text>
        <Text style={styles.text}>{data.type}</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 18,
            marginTop: 5,
          }}>
          <View
            style={{
              backgroundColor: data.state === 0 ? '#d9534f' : '#5cb85c',
              width: 7,
              height: 7,
              borderRadius: 20,
              marginRight: 5,
            }}></View>
          <Text style={{ fontSize: 12 }}>
            {data.state === 0 ? 'Offline' : 'Online'}
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    height: '90%',
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
    margin: 5,
  },
  section: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {},
  text: {
    fontSize: 12,
    textTransform: 'capitalize',
  },
})
