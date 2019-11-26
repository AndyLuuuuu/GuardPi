import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Text, FlatList } from "react-native";
import {
  Container,
  EventItem,
  Left,
  Right,
  DeviceName,
  DeviceType,
  DeviceMAC,
  EventLabel,
  EventText,
  EventDate
} from "./Styled";

const Event = () => {
  useEffect(() => {
    Axios.get("http://192.168.43.122:3000/events").then(res => {
      console.log(res.data);
      setEvents([...res.data.reverse()]);
    });
  }, []);
  const [events, setEvents] = useState([]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    Axios.get("http://192.168.43.122:3000/events")
      .then(res => {
        console.log(res.data);
        setEvents([...res.data.reverse()]);
      })
      .then(() => {
        setIsRefreshing(false);
      });
  };

  const [isRefreshing, setIsRefreshing] = useState(false);
  return (
    <Container>
      <FlatList
        data={events}
        renderItem={({ item }) => <EventItems event={item} />}
        keyExtractor={item => item.id.toString()}
        refreshing={isRefreshing}
        onRefresh={() => handleRefresh()}
      />
    </Container>
  );
};

const EventItems = ({ event }) => {
  const formatDate = date => {
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
    const hour = temp.getHours() % 12 || 12;
    const AMPM = temp.getHours() >= 12 ? "PM" : "AM";
    const minutes = temp.getMinutes();
    return `${month} ${day}, ${year} ${hour}:${minutes} ${AMPM}`;
  };
  return (
    <EventItem>
      <Left>
        <DeviceName>{event.devicename}</DeviceName>
        <DeviceType>{event.devicetype}</DeviceType>
        <DeviceMAC>{event.devicemac}</DeviceMAC>
        <EventLabel>
          Event: <EventText>{event.eventmessage}</EventText>
        </EventLabel>
      </Left>
      <Right>
        <EventDate>{formatDate(event.eventtime)}</EventDate>
      </Right>
    </EventItem>
  );
};

export default Event;
