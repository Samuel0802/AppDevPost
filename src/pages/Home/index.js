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
  const [loadingRefresh, setLoadingRefresh] = useState(false); //Refresh do topo do app para carregar
  const [lastItem, setLastItem] = useState('');  //armanezar o ultimo item renderizado
  const [emptylist, setEmptyList] = useState(false); // lista vazia do post

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

              setEmptyList(!!snapshot.empty)
              setPosts(postList); //colocando os post na lista
              setLastItem(snapshot.docs[snapshot.docs.length - 1])//ultimo post
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

//função de refresh de posts quando arrastar tela do celular pra baixo
  async function RefreshPosts() {

    firestore().collection('posts') //pegando tabela "posts" do firebase
    .orderBy('created', 'desc') //buscar por ordem decrecente
    .limit(5) //paginacao de 5
    .get() //buscando as informação
    .then((snapshot) => { //conteudo do post

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

        setEmptyList(false) //buscando os posts novos
        setPosts(postList); //colocando os post na lista
        setLastItem(snapshot.docs[snapshot.docs.length - 1])//ultimo post
        setLoading(false);
   

    })

    setLoadingRefresh(false); //sair o loading finito
  }

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
            showVerticalScrollIndicator={false}
            data={posts}
            renderItem={({ item }) => (

              <PostList 
               data={item}
                userId={user?.uid} //Buscar User que esta logado da context->auth
               />

            )}

            refreshing={loadingRefresh}// propriedade nativa de refresh na pagina
             onRefresh={RefreshPosts} //quando puxar tela pra cima, chamar uma função
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
