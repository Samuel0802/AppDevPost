import React, {useState} from "react";
import {
    Container,
    Header,
    Avatar,
    ConteudoView,
    Content,
    Name,
    Actions,
    LikeButton,
    Like,
    TimePost,
} from "./styles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {formatDistance} from 'date-fns';
import {ptBR} from 'date-fns/locale';


export default function PostList({data, userId}) {
  console.log(data);
  const [likePost, setLikePost] = useState(data?.like);//armazenar os likes

  function formatarData() {
    const datePost = new Date(data.created.seconds * 1000); //pegando data do banco de dados

    return formatDistance( //formatando a distancia
        new Date(), //pegando data de hoje
        datePost, //comparando data que foi criado
        {
            locale: ptBR,
           
        }
    )
  }

    return (
        <Container>
            <Header>
                {/*Se avatarUrl for true carregar foto do avatar senão img fixa */}
              {data.avatarUrl ? ( 
                 <Avatar source={{uri: data.avatarUrl}} />
                 
                ) : (
                    <Avatar source={require("../../assets/avatar.png")} />
                )
                }
    
              
                <Name numberOfLines={1} ellipsizeMode="tail">{data?.autor}</Name>
            </Header>

            <ConteudoView>
                <Content>{data?.conteudo}</Content>
            </ConteudoView>

            <Actions>
                <LikeButton>
                    <Like>
                        {likePost === 0 ? '' : likePost}
                    </Like>
                    <MaterialCommunityIcons
                        name={likePost === 0 ? 'heart-plus-outline' :  'cards-heart'}
                        size={20}
                        color="#E52246" />
                </LikeButton>

                {/* <TimePost>{formatarData()}</TimePost> */}
            </Actions>

        </Container>
    );
}