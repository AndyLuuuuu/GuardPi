import React from "react";
import { Text, Dimensions } from "react-native";
import { Container, Title, Input, Button } from "./LoginStyled";

const { width, height } = Dimensions.get("window");

const Login = () => {
  return (
    <Container width={width} height={height}>
      <Title>Login</Title>
      <Input />
      <Input />
      <Button>
        <Text>Login</Text>
      </Button>
    </Container>
  );
};

export default Login;
