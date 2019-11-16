import styled from "styled-components";

export const MenuContainer = styled.View`
  height: 100%;
  width: 100%;
`;

export const LogoView = styled.View`
  height: 30%;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 50px;
`;

export const LogoImage = styled.Image`
  width: 100%;
  height: 100%;
`;

export const UpperMenu = styled.View`
  flex: 1;
  border-top-color: rgba(0, 0, 0, 0.15);
  border-top-width: 1px;
`;

export const ItemView = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  align-items: center;
  border-bottom-color: rgba(0, 0, 0, 0.15);
  border-bottom-width: 1px;
  padding: 15px;
`;

export const ItemTitle = styled.Text`
  margin-left: 10px;
`;

export const LowerMenu = styled.View`
  border-top-color: rgba(0, 0, 0, 0.15);
  border-top-width: 1px;
`;
