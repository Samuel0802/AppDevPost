import React, {useState, createContext} from "react";
import auth, { firebase } from "@react-native-firebase/auth"; //importando firebase
import firestore from "@react-native-firebase/firestore";



//Isso cria um contexto chamado AuthContext
export const AuthContext = createContext({});


function AuthProvider({children}){
    //!!user: converter variavel para boleano
    //caso tenha algo no user = vai receber como true senão false
    const[user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);

  
    //função de cadastrar user no firebase
async function CadastrarUser(email, password,name){
 
  setLoadingAuth(true);
   
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
      setLoadingAuth(false);
     })
     
  }) 
   .catch((error) =>{
    console.log(error);
    setLoadingAuth(false);
   })
 
}

async function LogarUser(email, password){
  setLoadingAuth(true);

   await auth().signInWithEmailAndPassword(email, password)

    .then( async (value) => {
     let uid = value.user.uid;

      //se tiver tudo certo buscar no banco os dados do user
      const userProfile = await  firestore().collection('users')
       .doc(uid).get(); //buscando no banco
 
       //add em um obbjeto os dados
      let data = {
        uid: uid,
        nome: userProfile.data().nome,
        email: value.user.email,

      };
      //passar para useState fazer o login
      setUser(data);
      setLoadingAuth(false);
    })

    .catch((error) => {
   console.log(error);
   setLoadingAuth(false);
    })

}



return(

 //AuthContext.Provider: é o componente que fornece os valores do contexto para os componentes filhos.
  <AuthContext.Provider value={{logado: !!user, CadastrarUser, LogarUser, loadingAuth}}>
 {children}
  </AuthContext.Provider>
);
}

export default AuthProvider;