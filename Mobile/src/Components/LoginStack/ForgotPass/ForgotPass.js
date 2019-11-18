import React from "react";
import { Text, Dimensions, KeyboardAvoidingView } from "react-native";
import { Container, Title, Input, Button, ButtonText } from "./Styled";
const { width, height } = Dimensions.get("window");

const Forgot = () => {
  return (
    <Container width={width} height={height} behavior="padding">
      <Title>Forgot Password</Title>
      <Input placeholder="Username" />
      <Input placeholder="Email" />
      <Button activeOpacity={0.75}>
        <ButtonText>Reset Password</ButtonText>
      </Button>
    </Container>
  );
};

export default Forgot;
