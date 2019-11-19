import styled from "styled-components";

export const Container = styled.KeyboardAvoidingView`
  justify-content: center;
  align-items: center;
  width: ${props => props.width};
  height: ${props => props.height};
  flex: 1;
  padding: 50px 25px;
`;

export const LogoImage = styled.Image`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin: 50px;
`;

export const Upper = styled.View`
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
`;

export const Input = styled.TextInput`
  border: 1px solid rgba(0, 0, 0, 0.5);
  width: 100%;
  padding: 10px;
  margin: 10px;
  text-align: center;
  font-size: 17px;
  border-radius: 25px;
`;

export const Button = styled.TouchableOpacity`
  width: 100%;
  background-color: ${props => props.theme.color.submitBlue};
  padding: 10px;
  align-items: center;
  margin-top: 5px;
  margin-bottom: 10px;
  border-radius: 25px;
`;

export const ButtonText = styled.Text`
  color: ghostwhite;
  font-size: 18px;
  font-weight: 700;
`;

export const Lower = styled.View`
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;

export const ForgotText = styled.Text``;

export const ForgotLink = styled.Text`
  margin-left: 5px;
  text-decoration: underline;
  color: #038cfc;
`;
