import styled from "styled-components";

export const Container = styled.KeyboardAvoidingView`
  justify-content: center;
  align-items: center;
  width: ${props => props.width};
  height: ${props => props.height};
  padding: 30px 40px;
`;

export const Title = styled.Text`
  font-weight: 700;
  font-size: 35px;
  margin-bottom: 10px;
`;

export const Input = styled.TextInput`
  border: 1px solid;
  width: 100%;
  padding: 8px;
  margin: 10px;
  text-align: center;
  font-size: 17px;
  border-radius: 25px;
`;

export const Button = styled.TouchableOpacity`
  width: 100%;
  background-color: #038cfc;
  padding: 10px;
  align-items: center;
  margin: 10px 0;
  border-radius: 25px;
`;

export const ButtonText = styled.Text`
  color: ghostwhite;
  font-size: 20px;
  font-weight: 700;
`;
