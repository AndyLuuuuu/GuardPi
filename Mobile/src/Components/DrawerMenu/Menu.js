import React, { useState, useEffect } from "react";
import { Text, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  MenuContainer,
  LogoView,
  LogoImage,
  UpperMenu,
  LowerMenu,
  ItemView,
  ItemTitle
} from "./Styled";

const Menu = ({ navigation }) => {
  useEffect(() => {
    // Somehow find HomeScreen and pass token param.
    // Somehow find HomeScreen and pass token param.
    // Somehow find HomeScreen and pass token param.
    // Somehow find HomeScreen and pass token param.
    // Somehow find HomeScreen and pass token param.
    setUserToken(navigation.getParam("token"));
    console.log("drawer", navigation.getParam("token"));
  }, []);
  const [userToken, setUserToken] = useState("");
  const UpperMenuItems = [
    { title: "Home", iconName: "home", route: "homeScreen" },
    { title: "Monitor", iconName: "camera-control", route: "monitorScreen" },
    { title: "Event Logs", iconName: "calendar-text", route: "eventScreen" }
  ];
  // const LowerMenuItems = [
  //   { title: "Settings", iconName: "settings", route: "settingScreen" },
  //   { title: "Sign out", iconName: "logout" }
  // ];

  const Logout = () => {
    navigation.navigate("loginStack");
  };

  return (
    <MenuContainer>
      <LogoView>
        <LogoImage
          source={require("../../../assets/guardPi_logo.png")}
          resizeMode="contain"
        />
      </LogoView>
      <UpperMenu>
        {UpperMenuItems.map((item, index) => {
          return (
            <ItemView
              key={index}
              onPress={() =>
                navigation.navigate(item.route, { token: userToken })
              }
              activeOpacity={0.5}
            >
              <Icon name={item.iconName} size={20} color="#1c1c1c" />
              <ItemTitle>{item.title}</ItemTitle>
            </ItemView>
          );
        })}
      </UpperMenu>
      <LowerMenu>
        <ItemView
          onPress={() => navigation.navigate("settingScreen")}
          activeOpacity={0.5}
        >
          <Icon name="settings" size={20} color="#1c1c1c" />
          <ItemTitle>Settings</ItemTitle>
        </ItemView>
        <ItemView onPress={() => Logout()} activeOpacity={0.5}>
          <Icon name="logout" size={20} color="#1c1c1c" />
          <ItemTitle>Sign out</ItemTitle>
        </ItemView>
      </LowerMenu>
    </MenuContainer>
  );
};

export default Menu;
