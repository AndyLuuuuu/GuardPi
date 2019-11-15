import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { DrawerMenuView } from "./HeaderStyled";

export const DrawerMenuIcon = ({ navigation }) => {
  return (
    <DrawerMenuView>
      <Icon name="menu" size={32} onPress={() => navigation.openDrawer()} />
    </DrawerMenuView>
  );
};
