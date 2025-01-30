import React, {useState, createContext, useEffect} from "react";
import auth from '@react-native-firebase/auth'; // importando autenticação do firebase
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";


//Isso cria um contexto chamado AuthContext
export const AuthContext = createContext({});


function AuthProvider({children}){
    //!!user: converter variavel para boleano
    //caso tenha algo no user = vai receber como true senão false
    const[user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingAuth, setLoadingAuth] = useState(true);

    //buscando do AsyncStorage
    useEffect(() => {
      async function loadStorage(){
         const storageUser = await AsyncStorage.getItem('@devapp');

         if(storageUser){
        setUser(JSON.parse(storageUser)) 
        setLoading(false);  
         }
         setLoading(false); 
      }

      loadStorage();
    },[])
   
    
 // função de deixar o user logado após fechar o app
 async function storageUser(data){ //data: todas as informações pra salvar
  await AsyncStorage.setItem('@devapp', JSON.stringify(data)) //garantir que vai salvar 
 }   

  
//função de cadastrar user no firebase
async function CadastrarUser(email, password,name){
 
  setLoadingAuth(true);
   
  await auth().createUserWithEmailAndPassword(email, password) //Criar um user com email e senha que mandar
  

  //esse .then vai cadastrar o nome
  .then(async (dados) => {
    let uid = dados.user.uid; //pegando id do user para ser cadastrado
  
     await firestore().collection('users')  //collection('users'): users nome do banco no firebase
     .doc(uid).set({ //acessando com id cadastrado, cadastrar nome do user
      nome: name,
      createdAt: new Date(),
     })

     //caso der tudo certo entra na (Promises)
     .then(() => { //repassando os dados para useState user
     let data = {
      uid: uid,
      nome: name,
      email: value.user.email,
     }
      setUser(data); //passando as informação do user
      storageUser(data);
      setLoadingAuth(false);
     })
     
  }) 
   .catch((error) =>{
    console.log(error);
    setLoadingAuth(false);
   })
 
}

//função de login do user
async function LogarUser(email, password){
  setLoadingAuth(true);

   await auth().signInWithEmailAndPassword(email, password)

    //se ocorrer tudo certo vai cair no .then
    .then( async (value) => {
     let uid = value.user.uid;

      //se tiver tudo certo buscar no banco os dados do user
      const userProfile = await  firestore().collection('users')
       .doc(uid).get(); //buscando no banco
 
       //add em um objeto os dados
      let data = {
        uid: uid,
        nome: userProfile.data().nome,
        email: value.user.email,
      };

      //passar para useState fazer o login
      setUser(data);
      storageUser(data);
      setLoadingAuth(false);
    })

    //caso der errado
    .catch((error) => {
   console.log(error);
   setLoadingAuth(false);
    })

}




return(
 //AuthContext.Provider: é o componente que fornece os valores do contexto para os componentes filhos.
  <AuthContext.Provider value={{logado: !!user, CadastrarUser, LogarUser, loadingAuth, loading}}>
 {children}
  </AuthContext.Provider>
);
}

export default AuthProvider;