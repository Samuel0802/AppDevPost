import React, {useState} from "react";
import {
  Container,
  ButtonPost,
  ListPosts,
} from "./styles";
import Feather from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import Header from "../../components/Header";
import { Text } from "react-native";



export default function Home() {
  const navigation = useNavigation();
  const [posts, setPosts] = useState([
    {id: 1, conteudo: 'Teste 123'},
    {id: 2, conteudo: 'Meu segundo post'},
    {id: 3, conteudo: 'meu terceiro post'},
    {id: 4, conteudo: 'bom dia a todos'},
    {id: 5, conteudo: 'Deus é fiel'},
  ]);

  return (
    <Container>
        <Header/>
       <ListPosts
       data={posts}
       renderItem={({item}) => (<Text>{item.conteudo}</Text>)}
       />

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
