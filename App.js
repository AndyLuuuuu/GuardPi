import React, { useState } from "react";
import { withTheme } from "styled-components";
import { theme } from "./src/Theme/theme";
import { Container } from "./AppStyled";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import { Dimensions } from "react-native";
import Login from "./src/Components/LoginStack/Login/Login";
import Forgot from "./src/Components/LoginStack/ForgotPass/ForgotPass";
import Home from "./src/Components/DrawerStack/Home/Home";

// let { width, height } = Dimensions.get("window");

const LoginStack = createStackNavigator({
  loginScreen: {
    screen: Login,
    navigationOptions: {
      title: "Login"
    }
  },
  forgotScreen: {
    screen: Forgot,
    navigationOptions: {
      title: "Forgot Password"
    }
  }
});

const DrawerStack = createDrawerNavigator({
  homeScreen: { screen: Home }
});

const PrimaryStack = createStackNavigator(
  {
    loginStack: { screen: LoginStack },
    baseStack: { screen: DrawerStack }
  },
  {
    headerMode: "none",
    title: "Login"
  }
);

const App = createAppContainer(PrimaryStack);
const AppWithTheme = withTheme(({ theme }) => {
  return <App screenProps={{ theme }} />;
});

// const App = () => {
//   return (
//     <Container>
//       <Text>Open up App.js to start working on your app!</Text>
//       <Text>{width}</Text>
//     </Container>
//   );
// };

export default AppWithTheme;
