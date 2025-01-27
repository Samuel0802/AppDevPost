import React, { useState} from "react";
import { 
    Container, 
       Titulo,
       Input,
       Button,
       ButtonText,
       SignUpButton, 
       SignUpButtonText
} from "./styles";
import { Text } from "react-native";


export default function Login(){
  const [login, setLogin] = useState(true);

  function toogleLogin(){
    setLogin(!login);
  }


  if(login){
    return(
      <Container>
      <Titulo>Dev<Text style={{color: "#E52246"}}>Post</Text></Titulo>
 
      <Input
       placeholder="Digite seu e-mail"
       keyboardType="email-address"
      />
 
      <Input
       placeholder="Digite sua senha"
       secureTextEntry={true}
      />
 
    
      <Button>
        <ButtonText>Entrar</ButtonText>
      </Button>
 
      <SignUpButton onPress={toogleLogin}> 
        <SignUpButtonText>Criar uma conta</SignUpButtonText>
      </SignUpButton>
 
     </Container>
    );
  }

  return(
    <Container>
     <Titulo>Dev<Text style={{color: "#E52246"}}>Post</Text></Titulo>

     <Input
      placeholder="Digite seu nome"
     />

     <Input
      placeholder="Digite seu e-mail"
      keyboardType="email-address"
     />

     <Input
      placeholder="Digite sua senha"
      secureTextEntry={true}
     />

   
     <Button>
       <ButtonText>Entrar</ButtonText>
     </Button>

     <SignUpButton onPress={toogleLogin}>
       <SignUpButtonText>Já tenho uma conta</SignUpButtonText>
     </SignUpButton>

    </Container>


  );
}
