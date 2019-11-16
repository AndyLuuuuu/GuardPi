import React from "react";
import { Text, Dimensions } from "react-native";
import {
  Container,
  LogoView,
  LogoImage,
  Upper,
  Input,
  ErrorText,
  Button,
  ButtonText,
  Lower,
  ForgotText,
  ForgotLink
} from "./Styled";

const { width, height } = Dimensions.get("window");

const Login = ({ navigation }) => {
  return (
    <Container width={width} height={height} behavior="padding">
      <LogoImage
        source={require("../../../../assets/guardPi_logo.png")}
        resizeMode="contain"
      />
      <Upper width={width} height={height}>
        <Input placeholder="Username" />
        <Input placeholder="Password" secureTextEntry={true} />
        <Button
          activeOpacity={0.75}
          onPress={() => navigation.navigate("mainAppStack")}
        >
          <ButtonText>Login</ButtonText>
        </Button>
        <ErrorText>Please check login credentials!</ErrorText>
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
