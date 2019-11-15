import React from "react";
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
} from "./MenuStyled";

const Menu = () => {
  const UpperMenuItems = [
    { title: "Home", iconName: "home" },
    { title: "Monitor", iconName: "camera-control" },
    { title: "Event Logs", iconName: "calendar-text" }
  ];

  const LowerMenuItems = [
    { title: "Settings", iconName: "settings" },
    { title: "Sign out", iconName: "logout" }
  ];

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
            <ItemView key={index}>
              <Icon name={item.iconName} size={20} color="#1c1c1c" />
              <ItemTitle>{item.title}</ItemTitle>
            </ItemView>
          );
        })}
      </UpperMenu>
      <LowerMenu>
        {LowerMenuItems.map((item, index) => {
          return (
            <ItemView key={index}>
              <Icon name={item.iconName} size={20} color="#1c1c1c" />
              <ItemTitle>{item.title}</ItemTitle>
            </ItemView>
          );
        })}
      </LowerMenu>
    </MenuContainer>
  );
};

export default Menu;
