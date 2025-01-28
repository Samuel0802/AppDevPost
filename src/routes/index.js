import React, {useContext} from "react";
import {View, ActivityIndicator} from "react-native";
import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes"; 
import { AuthContext } from "../contexts/auth";


export default function Routes(){
  
  const {logado} = useContext(AuthContext);

    const loading = false;

    if(loading){
        <View style={{
             flex:1,
               justifyContent:"center",
                 alignItems:"center",
                   backgroundColor:"#36394F"}}>
       <ActivityIndicator size={50} color="#E52246" />
        </View>
    }

    return(
        // Se usuario tiver logado entrar para tela AppRoutes
        logado ? <AppRoutes /> : <AuthRoutes />
    );
}