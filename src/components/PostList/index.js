import React from "react";
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


export default function PostList() {
    return (
        <Container>
            <Header>
                <Avatar source={require("../../assets/avatar.png")} />
                <Name numberOfLines={1} ellipsizeMode="tail">Samuel Souza</Name>
            </Header>

            <ConteudoView>
                <Content>Todo conteudo do post</Content>
            </ConteudoView>

            <Actions>
                <LikeButton>
                    <Like>12</Like>
                    <MaterialCommunityIcons
                        name="heart-plus-outline"
                        size={20}
                        color="#E52246" />
                </LikeButton>

                <TimePost>Há um minuto</TimePost>
            </Actions>

        </Container>
    );
}