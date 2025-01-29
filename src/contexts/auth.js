import React, {useState, createContext} from "react";
import auth from "@react-native-firebase/auth"; //importando firebase
import firestore from "@react-native-firebase/firestore";



//Isso cria um contexto chamado AuthContext
export const AuthContext = createContext({});


function AuthProvider({children}){
    //!!user: converter variavel para boleano
    //caso tenha algo no user = vai receber como true senão false
    const[user, setUser] = useState(null);

    
async function LogarUser(email, password,name){
  await auth().createUserWithEmailAndPassword(email, password) //Criar um user com email e senha que mandar
  
  .then(async (dados) => {
    let uid = dados.user.uid; //pegando id do user para ser cadastrado
  
     await firestore().collection('users')
     .doc(uid).set({ //acessando com id cadastrado, cadastrar nome do user
      nome: name,
      createdAt: new Date(),
     })
     .then(() => { //repassando os dados para useState user
     let data = {
      uid: uid,
      nome: name,
      email: value.user.email,
     }
      setUser(data); //passando as informação do user
     })
     
  }) 
   .catch((error) =>{
    console.log(error);
   })
 

}
return(

 //AuthContext.Provider: é o componente que fornece os valores do contexto para os componentes filhos.
  <AuthContext.Provider value={{logado: !!user, LogarUser}}>
 {children}
  </AuthContext.Provider>
);
}

export default AuthProvider;