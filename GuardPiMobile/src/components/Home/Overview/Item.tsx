import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Feather } from '@expo/vector-icons'

type props = {
  title: string
  data: string | number
  color: string
}

const getIcon = (title: string, color: string) => {
  switch (title) {
    case 'Total Events':
      return <Feather name='activity' size={20} color={color} />
    case 'Total Devices':
      return <Feather name='radio' size={20} color={color} />
    case 'Online Devices':
      return <Feather name='power' size={20} color={color} />
  }
}

export const Item: React.FunctionComponent<props> = ({
  title,
  data,
  color,
}) => {
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: 'white', borderColor: color, borderWidth: 0.75 },
      ]}>
      {getIcon(title, color)}
      <Text
        style={{ fontSize: 30, fontWeight: '700', color: 'rgba(0,0,0,0.7)' }}>
        {data}
      </Text>
      <Text
        style={{
          fontSize: 8.5,
          textTransform: 'uppercase',
          fontWeight: '700',
          color: 'rgba(0,0,0,0.55)',
        }}>
        {title}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    flex: 1,
    height: '75%',
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
