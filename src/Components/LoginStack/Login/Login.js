import React from "react";
import { Text, Dimensions } from "react-native";
import {
  Container,
  Upper,
  Title,
  Input,
  ErrorText,
  Button,
  ButtonText,
  Lower,
  ForgotText,
  ForgotLink
} from "./LoginStyled";

const { width, height } = Dimensions.get("window");

const Login = ({ navigation }) => {
  return (
    <Container width={width} height={height} behavior="padding">
      <Upper width={width} height={height}>
        <Title>Login</Title>
        <Input placeholder="Username" />
        <Input placeholder="Password" secureTextEntry={true} />
        <ErrorText>Please check details.</ErrorText>
        <Button
          activeOpacity={0.75}
          onPress={() => navigation.navigate("mainAppStack")}
        >
          <ButtonText>Login</ButtonText>
        </Button>
      </Upper>
      <Lower>
        <ForgotText>Forgot your password?</ForgotText>
        <ForgotLink onPress={() => navigation.navigate("forgotScreen")}>
          Click here
        </ForgotLink>
      </Lower>
    </Container>
  );
};

export default Login;
