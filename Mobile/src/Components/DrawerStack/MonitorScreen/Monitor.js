import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Text, FlatList, Alert } from "react-native";
import { Container } from "./Styled";

const Monitor = () => {
  useEffect(() => {
    Axios.get("http://192.168.43.122:3000/retrieve_devices")
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        Alert.alert(
          "Oh no!",
          "Unable to retrieve devices. Check your network.",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
        console.log(err);
      });
  }, []);
  const [devices, setDevices] = useState([]);
  return (
    <Container>
      <Text>Monitor</Text>
    </Container>
  );
};

export default Monitor;
