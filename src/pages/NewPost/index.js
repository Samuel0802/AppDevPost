import React, {useState, useLayoutEffect} from "react";
import { useNavigation} from "@react-navigation/native";

import { Container, 
          Input, 
          Button,
          ButtonText
 } from "./styles";

export default function NewPost() {
  const navigation = useNavigation();
  const [post, setPost] = useState("");

  //criando botão no meu header
  useLayoutEffect(() =>{
    const options = navigation.setOptions({
      headerRight: () => (
        <Button activeOpacity={0.8}>
          <ButtonText>Publicar</ButtonText>
        </Button>
      )
    })
     
  },[navigation, post])


  return (
    <Container>
      <Input 
        placeholder="O que está Pensando ?"
        placeholderTextColor="#DDD"
        value={post}
        onChangeText={(text) => setPost(text)}
        autoCorrect={false} //desativar o correto do teclado
        multiline={true} //Quebra para linha dp texto para debaixo quando chegar no final
        maxLength={400}
         />
    </Container>
  );
}
