import styled from "styled-components";

export const Container = styled.KeyboardAvoidingView`
  justify-content: center;
  align-items: center;
  width: ${props => props.width};
  height: ${props => props.height};
  padding: 40px;
`;

export const Upper = styled.View`
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  font-weight: 700;
  font-size: 40px;
  margin-bottom: 30px;
`;

export const Input = styled.TextInput`
  border: 1px solid rgba(0, 0, 0, 0.75);
  width: 100%;
  padding: 8px;
  margin: 10px;
  text-align: center;
  font-size: 17px;
  border-radius: 25px;
`;

export const ErrorText = styled.Text`
  color: ${props => props.theme.color.errorRed};
  margin: 5px 0;
  opacity: 0;
`;

export const Button = styled.TouchableOpacity`
  width: 100%;
  background-color: ${props => props.theme.color.submitBlue};
  padding: 10px;
  align-items: center;
  margin: 10px 0;
`;

export const ButtonText = styled.Text`
  color: ghostwhite;
  font-size: 20px;
  font-weight: 700;
`;

export const Lower = styled.View`
  flex-direction: row;
  padding: 20px 0;
`;

export const ForgotText = styled.Text``;

export const ForgotLink = styled.Text`
  margin-left: 5px;
  text-decoration: underline;
  color: #038cfc;
`;
