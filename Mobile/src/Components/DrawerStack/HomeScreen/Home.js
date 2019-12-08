import React, { useState } from "react";
import { Container } from "./Styled";
import { WebView } from "react-native-webview";
import { Text, Image, StyleSheet, Dimensions, View } from "react-native";

const { width, height } = Dimensions.get("window");

const Home = ({ navigation }) => {
  console.log("home", navigation.getParam("token", "default"));
  return <Container></Container>;
};

export default Home;
