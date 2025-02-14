import React, {useState, useLayoutEffect, useContext} from "react";
import { useNavigation} from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import { AuthContext } from "../../contexts/auth";

import { Container, 
          Input, 
          Button,
          ButtonText
 } from "./styles";

export default function NewPost() {
  const {user} = useContext(AuthContext);
  const navigation = useNavigation();
  const [post, setPost] = useState("");

  //criando botão no meu header
  useLayoutEffect(() =>{
    const options = navigation.setOptions({
      headerRight: () => (
        <Button activeOpacity={0.8} onPress={() => PostUser()}>
          <ButtonText>Publicar</ButtonText>
        </Button>
      )
    })
     
  },[navigation, post])

  async function PostUser(){
   if(post === ''){
   console.log("Seu post não tem conteudo");
   return;
   }

   //comece com null
   let avatarUrl = null;

   //verifica se tem foto dentro storage users -> uid
   try {
     let response = await storage().ref('users').child(user?.uid).getDownloadURL();
     avatarUrl = response;
   }
    catch(err){
    avatarUrl = null;
    }

    //Criando POST do usuario
    await firestore().collection('posts')
    .add({ //.add : gerando um id aleatorio 
      created: new Date(),
      conteudo: post,
      autor: user?.nome,// user logado
      userId: user?.uid, //id logado
      like: 0,
      avatarUrl,
    })
 
     //Caso vier da tudo certo entra na (Promises)
    .then(()=> {
      setPost('');
      console.log('Criado com sucesso');
  
    })

    .catch((error)=>{
      console.log("Error ao criar o post", error);
    })

    navigation.goBack();


}


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
