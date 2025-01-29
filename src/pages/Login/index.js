import React, { useState, useContext} from "react";
import { 
    Container, 
       Titulo,
       Input,
       Button,
       ButtonText,
       SignUpButton, 
       SignUpButtonText
} from "./styles";
import {  Text } from "react-native";
import { AuthContext } from "../../contexts/auth";


export default function Login(){
  const [login, setLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {LogarUser} = useContext(AuthContext);

 //Si
  function toogleLogin(){
    setLogin(!login);
    setEmail('');
    setPassword('');
    setName('');
  }

  function handleSignIn(){
    //Validando os campos vazios de login
  if(email === '' || password === ''){
    console.log('PREENCHA TODOS OS CAMPOS')
    return;
  }

  //Fazer o login do user

  }

  async function handleSignUp(){
    //Validando os campos vazios de cadastrar
   if(name === '' || email === '' || password === ''){
    console.log('PREENCHA TODOS OS CAMPOS')
    return;
   }

   //Cadastrar user no app
   await LogarUser( email, password, name);

  }

 //Se login for true entra no primeiro if "Tela de login"
  if(login){
    return(
      <Container>
      <Titulo>Dev<Text style={{color: "#E52246"}}>Post</Text></Titulo>
 
      <Input
       placeholder="Digite seu e-mail"
       keyboardType="email-address"
       value={email}
       onChangeText={(item) => setEmail(item)}
      
      />
 
      <Input
       placeholder="Digite sua senha"
       secureTextEntry={true}
       value={password}
       onChangeText={(item) => setPassword(item)}

      />
 
    
      <Button onPress={handleSignIn}>
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
      value={name}
      onChangeText={(item) => setName(item)}
     />

     <Input
      placeholder="Digite seu e-mail"
      keyboardType="email-address"
      value={email}
     onChangeText={(item) => setEmail(item)}
     />

     <Input
      placeholder="Digite sua senha"
      secureTextEntry={true}
      value={password}
      onChangeText={(item) => setPassword(item)}
     />

   
     <Button onPress={handleSignUp}>
       <ButtonText>Cadastrar</ButtonText>
     </Button>

     <SignUpButton onPress={toogleLogin}>
       <SignUpButtonText>Já tenho uma conta</SignUpButtonText>
     </SignUpButton>

    </Container>


  );
}
