import React from "react";
import {
  Container,
  ButtonPost
} from "./styles";
import Feather from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";



export default function Home() {
  const navigation = useNavigation();
  return (
    <Container>

      <ButtonPost activeOpacity={0.8} onPress={() => navigation.navigate('NewPost')}>
        <Feather
          name="edit-2"
          color="#FFF"
          size={25}
        />
      </ButtonPost>
    </Container>
  );
}
