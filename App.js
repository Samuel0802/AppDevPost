import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/routes";
import { StatusBar } from "react-native";
import AuthProvider from "./src/contexts/auth";

export default function App() {
  return (
    <NavigationContainer>
      {/* AuthProvider: Rotas estão tudo dentro de contexts */}
      <AuthProvider>
        <StatusBar barStyle="light-content" backgroundColor="#36394F" />
        <Routes />
        </AuthProvider>
   
    </NavigationContainer>
  );
}
