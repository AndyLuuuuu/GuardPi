import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Text, FlatList, Alert } from "react-native";
import {
  Container,
  DeviceItem,
  DeviceName,
  DeviceType,
  DeviceMAC,
  DeviceStatus,
  StatusLabel,
  StatusIndicator
} from "./Styled";

const Monitor = ({ navigation }) => {
  useEffect(() => {
    const ws = new WebSocket("ws://192.168.0.12:3000/ws");
    ws.onopen = () => {
      // connection opened
      let data = JSON.stringify({
        type: "application",
        token: navigation.getParam("token")
      });
      ws.send(data);
    };

    ws.onmessage = e => {
      // a message was received
      console.log(e.data);
      // setDevices(e.data);
    };

    ws.onerror = e => {
      // an error occurred
      console.log(e.message);
    };

    ws.onclose = e => {
      // connection closed
      console.log(e.code, e.reason);
    };
    // Axios.get("http://192.168.0.12:3000/retrieve_devices", {
    //   params: {
    //     token: navigation.getParam("token")
    //   }
    // })
    //   .then(res => {
    //     setDevices(res.data);
    //   })
    //   .catch(err => {
    //     Alert.alert(
    //       "Oh no!",
    //       "Unable to retrieve devices. Check your network.",
    //       [{ text: "OK", onPress: () => console.log("OK Pressed") }],
    //       { cancelable: false }
    //     );
    //     console.log(err);
    //   });
  }, []);
  const [devices, setDevices] = useState([]);
  return (
    <Container>
      {/* {console.log(devices.length)} */}
      {/* <FlatList
        data={devices}
        renderItem={({ item }) => <DeviceItems device={item} />}
        keyExtractor={item => item.deviceid}
      /> */}
    </Container>
  );
};

const DeviceItems = ({ device }) => {
  const { devicename, devicetype, mac, isconnected } = device;
  // console.log(isconnected);
  return (
    <DeviceItem>
      <DeviceName>{devicename}</DeviceName>
      <DeviceType>{devicetype}</DeviceType>
      <DeviceMAC>{mac}</DeviceMAC>
      <DeviceStatus>
        <StatusLabel>Status: </StatusLabel>
        <StatusIndicator online={isconnected}>
          {isconnected ? "ONLINE" : "OFFLINE"}
        </StatusIndicator>
      </DeviceStatus>
    </DeviceItem>
  );
};

export default Monitor;
