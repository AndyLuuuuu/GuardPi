import styled from "styled-components";

export const Container = styled.View``;

export const DeviceItem = styled.View`
  padding: 20px 30px;
  border-bottom-color: ${props => props.theme.color.grey};
  border-bottom-width: 0.5px;
  flex-direction: row;
`;

export const Left = styled.View`
  flex: 1;
  justify-content: space-evenly;
`;

export const Right = styled.View`
  flex: 1;
  align-items: flex-end;
  justify-content: center;
`;

export const DeviceName = styled.Text`
  font-weight: bold;
  font-size: 16px;
`;

export const DeviceType = styled.Text`
  text-transform: capitalize;
  color: ${props => props.theme.color.grey};
  font-size: 12px;
`;

export const DeviceMAC = styled.Text`
  color: ${props => props.theme.color.grey};
  font-size: 12px;
`;

export const DeviceStatus = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const StatusLabel = styled.Text``;

export const StatusIndicator = styled.Text`
  width: 15px;
  height: 15px;
  background-color: ${props =>
    props.status
      ? props.theme.color.onlineGreen
      : props.theme.color.offlineRed};
  border-radius: 50px;
  justify-content: center;
  align-items: center;
`;

export const ArmBtn = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  background-color: ${props =>
    props.status
      ? props.theme.color.offlineRed
      : props.theme.color.onlineGreen};
  border-radius: 50px;
`;

export const ArmImage = styled.Image`
  width: 40px;
  height: 40px;
`;

export const Button = styled.TouchableOpacity`
  background-color: ${props => props.theme.color.submitBlue};
  padding: 10px;
  border-radius: 5px;
`;

export const BtnText = styled.Text`
  color: ghostwhite;
  font-weight: 700;
`;
