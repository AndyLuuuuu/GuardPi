import React, { useState } from "react";
import { Container } from "./Styled";
import { WebView } from "react-native-webview";
import { Text, Image, StyleSheet, Dimensions, View } from "react-native";

const { width, height } = Dimensions.get("window");
const streamUri = "http://192.168.43.90:8000/stream.mjpg";

const html = `
<html>
<head>
<style>
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
</style>
</head>
<body>
<img src="${streamUri}" width="100%"/>
</body>
</html> `;

const Home = ({ navigation }) => {
  // const {userToken, setUserToken} = navigation.getParam("token", "default")
  console.log("home", navigation.getParam("token", "default"));
  return (
    <Container>
      <View style={styles.spacer}></View>
      <WebView
        style={styles.cameraView}
        startInLoadingState={false}
        scrollEnabled={false}
        source={{
          html: html
        }}
      />
      <View style={styles.spacer}></View>
    </Container>
  );
};

var styles = StyleSheet.create({
  cameraView: {
    flex: 1,
    width: width,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden"
  },
  spacer: {
    flexGrow: 0.5
  }
});

export default Home;
