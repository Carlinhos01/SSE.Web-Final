const firebaseConfig = {
  apiKey: "AIzaSyB1kDIeiOQevdMZph6VPbXbyy-52C8SGy0",
  authDomain: "sseapp-715cf.firebaseapp.com",
  databaseURL: "https://sseapp-715cf-default-rtdb.firebaseio.com",
  projectId: "sseapp-715cf",
  storageBucket: "sseapp-715cf.appspot.com",
  messagingSenderId: "384311598256",
  appId: "1:384311598256:web:36771f75c6981d9505af75",
  measurementId: "G-PSSXM9HTNY"
};


// Inicialização do Firebase 
firebase.initializeApp(firebaseConfig); 
console.log('Firebase inicializado com sucesso.'); 
// Função para tentativa de login 

async function tentarLogin(email, senha) { 
  try { 
    // Autenticar usuário usando Firebase Authentication 
    const userCredential = await firebase.auth().signInWithEmailAndPassword(email, senha); 
    const user = userCredential.user; 
    console.log('Usuário autenticado:', user.uid); 
 

    // Consultar Firestore para verificar se o usuário está na coleção de usuários permitidos 
    const usersPermitidosRef = firebase.firestore().collection("users"); 
    const query = usersPermitidosRef.where("email", "==", email); 
    const snapshot = await query.get(); 
 

    if (!snapshot.empty) { 
      // Usuário encontrado na coleção de usuários permitidos 
      snapshot.forEach(doc => { 
        const userData = doc.data(); 
        console.log(`Usuário ${userData.nome} permitido. Papel: ${userData.papel}`); 
        // Redirecionar para a página principal "/" 
        window.location.replace("/"); 
      }); 
    } else { 
      // Usuário não encontrado na coleção de usuários permitidos 
      console.log("Usuário não encontrado na lista de permitidos."); 
      // Exibir mensagem de erro para o usuário 
      alert("Email ou senha incorretos."); 
    } 
  } catch (error) { 
    // Capturar e exibir o erro específico 
    console.error('Erro ao tentar fazer login:', error); 
    alert('Erro ao tentar fazer login. Verifique os detalhes e tente novamente.'); 
  } 
} 

 

// Evento de clique no botão de login (adapte conforme a estrutura HTML) 

document.addEventListener('DOMContentLoaded', function() { 

  const signInButton = document.getElementById('btn-login'); 

  signInButton.addEventListener('click', async (event) => { 

    event.preventDefault(); 

    const email = document.getElementById('Ruser').value; 

    const senha = document.getElementById('Rsenha').value; 

    tentarLogin(email, senha); 

  }); 

}); 

 

 

  // const singUp = document.getElementById('btn-login'); 

// singUp.addEventListener('click', (event)=>{ 

//   event.preventDefault(); 

//   const email = document.getElementById('Ruser').value; 

//   const senha = document.getElementById('Rsenha').value; 

 

//   const auth = getAuth(); 

//   const db = getFirestore(); 

 

//   createUserWithEmailAndPassword(auth, email, senha) 

//   .then((userCredential)=>{ 

//     const user = userCredential.user; 

//     const userData={ 

//       email: email, 

//       senha: senha 

//     }; 

 

//     const docRef = doc(db, "user",user.uid); 

//     setDoc(docRef,userData) 

//     .then(()=>{ 

//       window.location.href = 'login.blade.php'; 

//     }) 

//     .catch((error)=>{ 

//       console.error("erro no documento", error); 

//     }) 

//   }) 

//   .catch((error)=>{ 

//     const errorCode = error.code; 

//     if (errorCode == 'auth/email-alrady-in-use') { 

//       showMessage('Esse email não existe !!!', 'singUpMessage'); 

//     } 

//     else{ 

//       showMessage('Usuario criado com sucesso', 'singUpMessage') 

//     } 

//   }) 

 

// }) 