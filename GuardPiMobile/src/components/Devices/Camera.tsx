import React, { useEffect, useState } from 'react'
import { WebView } from "react-native-webview";
import { StyleSheet, SafeAreaView, View, Image, Dimensions } from 'react-native'
const { width, height } = Dimensions.get("window");

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
<img src="http://192.168.43.90:8000/stream.mjpg" width="100%"/>
</body>
</html> `;


export const Camera: React.FunctionComponent<{ navigation: any }> = ({
  navigation,
}) => {
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {})
    return unsubscribe
  }, [navigation])

  return (
      <View>
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
      </View>
  )
}

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