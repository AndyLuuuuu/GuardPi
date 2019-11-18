import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { DrawerMenuView } from "./Styled";

export const DrawerMenuIcon = ({ navigation }) => {
  return (
    <DrawerMenuView>
      <Icon name="menu" size={35} onPress={() => navigation.openDrawer()} />
    </DrawerMenuView>
  );
};
