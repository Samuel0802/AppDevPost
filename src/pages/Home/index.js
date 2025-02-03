import React, { useState, useContext, useCallback } from "react";
import {
  Container,
  ButtonPost,
  ListPosts,
} from "./styles";
import Feather from "react-native-vector-icons/Feather";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Header from "../../components/Header";
import { Text, ActivityIndicator, View } from "react-native";
import { AuthContext } from "../../contexts/auth";
import firestore from '@react-native-firebase/firestore';
import PostList from "../../components/PostList";




export default function Home() {
  const { user } = useContext(AuthContext);//ter acesso ai id do usuario
  const navigation = useNavigation();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  //Primeira renderização com useFocusEffect
  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      //função para buscar os posts
      function Posts() {
        firestore().collection('posts') //pegando tabela "posts" do firebase
          .orderBy('created', 'desc') //buscar por ordem decrecente
          .limit(5) //paginacao de 5
          .get() //buscando as informação
          .then((snapshot) => { //conteudo do post

            if (isActive) {
              setPosts([]);

              const postList = []; //comecando com vazio

              //map: pecorrendo 
              snapshot.docs.map(p => {
                //push:colocar item no array
                postList.push({
                  ...p.data(), //pegando todo conteudo
                  id: p.id,
                })
              })

              setPosts(postList); //colocando os post na lista
              setLoading(false);
            }

          })
      }

      Posts();

      //Desmontar quando sair do componente home
      return () => {
        let isActive = false;//Ñ atualizar nenhum estado
      }

    }, [])
  )


  return (
    <Container>
      <Header />

      {
        loading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={50} color="#E52246" />
          </View>
        ) : (

          <ListPosts
            data={posts}
            renderItem={({ item }) => (
              <PostList 
               data={item}
                userId={user?.uid}
               />
            )}
          />
        )
      }


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
