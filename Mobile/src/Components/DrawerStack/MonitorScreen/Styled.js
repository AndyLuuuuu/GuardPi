import styled from "styled-components";

export const Container = styled.View``;

export const DeviceItem = styled.View`
  padding: 20px;
  border-bottom-color: ${props => props.theme.color.grey};
  border-bottom-width: 0.5px;
  justify-content: space-evenly;
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
  padding: 1px 6px;
  background-color: ${props =>
    props.online
      ? props.theme.color.onlineGreen
      : props.theme.color.offlineRed};
  font-size: 12px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
`;
