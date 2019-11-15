import React, { useState } from "react";
import { Text } from "react-native";
import { ThemeProvider } from "styled-components";
import { theme } from "./src/Theme/theme";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import Login from "./src/Components/LoginStack/Login/Login";
import Forgot from "./src/Components/LoginStack/ForgotPass/ForgotPass";
import { DrawerMenuIcon } from "./src/Components/Headers/Headers";
import DrawerMenu from "./src/Components/DrawerMenu/Menu";
import Home from "./src/Components/DrawerStack/Home/Home";
import Sensor from "./src/Components/DrawerStack/Sensor/Sensor";

// let { width, height } = Dimensions.get("window");

const withHeader = (routeName, component, title) => {
  return createStackNavigator({
    [routeName]: {
      screen: component,
      // Import navigation here
      navigationOptions: ({ navigation }) => ({
        title: title,
        // Return action to open drawer when clicked
        headerLeft: <DrawerMenuIcon navigation={navigation} />
      })
    }
  });
};

const LoginStack = createStackNavigator({
  loginScreen: {
    screen: Login,
    navigationOptions: {
      headerShown: false
    }
  },
  forgotScreen: {
    screen: Forgot,
    navigationOptions: {
      headerTransparent: true
    }
  }
});

const DrawerStack = createDrawerNavigator(
  {
    // Must create stack navigator for each screen to show header...
    Home: withHeader("homeScreen", Home, "Home"),
    Sensor: withHeader("sensorScreen", Sensor, "Sensor")
  },
  {
    contentComponent: DrawerMenu
  }
);

const PrimaryStack = createSwitchNavigator(
  {
    loginStack: {
      screen: LoginStack
    },
    mainAppStack: { screen: DrawerStack }
  },
  {
    // headerMode: "none",
    // initialRouteName: "mainAppStack"
  }
);

const App = createAppContainer(PrimaryStack);

const ThemedApp = () => {
  return (
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  );
};

export default ThemedApp;
// export default

// const App = () => {
//   return (
//     <Container>
//       <Text>Open up App.js to start working on your app!</Text>
//       <Text>{width}</Text>
//     </Container>
//   );
// };
