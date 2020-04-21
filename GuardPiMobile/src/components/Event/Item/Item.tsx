import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Feather } from '@expo/vector-icons'

type event = {
    devicemac: string,
    devicename: string,
    devicetype: string
    eventmessage: string
    eventtime: string
    id: number
}

export const Item: React.FunctionComponent<{event: event}> = ({
    event
  }) => {

    const formatDate = (date: string) => {
        const months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sept",
          "Oct",
          "Nov",
          "Dec"
        ];
        let temp = new Date(date);
        const month = months[temp.getMonth()];
        const day = temp.getDate();
        const year = temp.getFullYear();
        
        var hours = temp.getHours();
        var minutes: any = temp.getMinutes();
        let seconds:any = temp.getSeconds();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        seconds = seconds < 10 ? '0'+seconds : seconds
        var strTime = hours + ':' + minutes + ":" + seconds + ' ' + ampm;



        return `${month} ${day}, ${year} ${strTime}`;
    }


  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <View style={{flexDirection: "row"}}>
                <Feather name='activity' size={15}/><Text style={[styles.text, {marginLeft: 5, fontSize: 11, color: "rgba(0,0,0,0.8)", fontWeight: "300"}]}>{event.devicename}</Text>
            </View>
            <Text style={styles.text}>{formatDate(event.eventtime)}</Text>
        </View>
        <Text style={[styles.text, {fontSize: 10, color: "rgba(0,0,0,0.5)", fontWeight: '700',}]}>{event.devicetype}</Text>
  <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: 'center'}}><Text style={[styles.text, {textTransform: "uppercase"}]}>{event.devicemac}</Text><Text style={[styles.text, {color: "rgba(0,0,0,0.8)"}]}>{event.eventmessage}</Text></View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    flex: 1,
    padding: 8,
    backgroundColor: "white",
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
    margin: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  section: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {},
  text: {
    fontSize: 11, color: "rgba(0,0,0,0.5)",
    textTransform: 'capitalize',
    fontWeight: '700',
  },
})
