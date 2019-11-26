import styled from "styled-components";

export const Container = styled.View``;

export const EventItem = styled.View`
  padding: 15px;
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
  justify-content: flex-start;
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

export const EventLabel = styled.Text``;

export const EventText = styled.Text``;

export const EventDate = styled.Text`
  color: ${props => props.theme.color.grey};
  font-size: 12px;
`;
