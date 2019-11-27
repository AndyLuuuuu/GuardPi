import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Text, FlatList, Alert, View, Image } from "react-native";
import {
  Container,
  DeviceItem,
  Left,
  Right,
  DeviceName,
  DeviceType,
  DeviceMAC,
  DeviceStatus,
  StatusLabel,
  StatusIndicator,
  ArmBtn,
  ArmImage
} from "./Styled";
import { IP } from "../../../DevSettings";
let ws = null;

const Monitor = ({ navigation }) => {
  useEffect(() => {
    ws = new WebSocket(`ws://${IP}/ws`);
    ws.onopen = () => {
      // connection opened
      let data = JSON.stringify({
        event: "add_application",
        token: navigation.getParam("token")
      });
      ws.send(data);
      let retrieve_devices = JSON.stringify({
        event: "retrieve_devices",
        token: navigation.getParam("token")
      });
      ws.send(retrieve_devices);
    };

    ws.onmessage = e => {
      // a message was received
      let data = JSON.parse(e.data);
      console.log(data);
      switch (data.event) {
        case "updated_devices":
          setDevices(data.devices);
          break;
        default:
          break;
      }
      // setDevices(e.data);
    };

    ws.onerror = e => {
      // an error occurred
      console.log(e.message);
      Alert.alert(
        "Oh no!",
        "Unable to retrieve devices. Check your network.",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    };

    ws.onclose = e => {
      // connection closed
      console.log(e.code, e.reason);
    };
  }, []);
  const [devices, setDevices] = useState([]);

  const changeStatus = (mac, status) => {
    let data = JSON.stringify({
      event: "device_status",
      mac: mac,
      status: status
    });
    ws.send(data);
  };
  return (
    <Container>
      {/* {console.log(devices.length)} */}
      <FlatList
        data={devices}
        renderItem={({ item }) => (
          <DeviceItems device={item} changeStatus={changeStatus} />
        )}
        keyExtractor={item => item.mac}
      />
    </Container>
  );
};

const DeviceItems = ({ device, changeStatus }) => {
  const { name, type, mac, status } = device;
  // console.log(isconnected);
  return (
    <DeviceItem>
      <Left>
        <DeviceName>{name}</DeviceName>
        <DeviceType>{type}</DeviceType>
        <DeviceMAC>{mac}</DeviceMAC>
        <DeviceStatus>
          <StatusLabel>Status: </StatusLabel>
          <StatusIndicator status={status}></StatusIndicator>
        </DeviceStatus>
      </Left>
      <Right>
        <ArmBtn status={status} onPress={() => changeStatus(mac, !status)}>
          <ArmImage
            source={require("../../../../assets/power_icon.png")}
            resizeMode="contain"
          />
        </ArmBtn>
      </Right>
    </DeviceItem>
  );
};

export default Monitor;
