import React, {useState, createContext} from "react";

//Isso cria um contexto chamado AuthContext
export const AuthContext = createContext({});

function AuthProvider({children}){
    //!!user: converter variavel para boleano
    //caso tenha algo no user = vai receber como true senão false
    const[user, setUser] = useState(null);
return(

 //AuthContext.Provider: é o componente que fornece os valores do contexto para os componentes filhos.
  <AuthContext.Provider value={{logado: !!user}}>
 {children}
  </AuthContext.Provider>
);
}

export default AuthProvider;