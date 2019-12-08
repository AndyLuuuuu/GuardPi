import React, { useState } from "react";
import { Container } from "./Styled";
import { WebView } from "react-native-webview";
import { Text, Image, StyleSheet, Dimensions, View } from "react-native";
import { streamURI } from "../../../DevSettings";
const { width, height } = Dimensions.get("window");
const streamUri = streamURI;

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

const Camera = () => {
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
    width: width,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden"
  },
  spacer: {
    flexGrow: 1
  }
});

export default Camera;
