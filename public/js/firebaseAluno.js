const firebaseConfig = {
    apiKey: "AIzaSyBfh1YVJ64Hh8w8ePg5fy0JFNh9Hdx9eus",
    authDomain: "ssebd-cb9e8.firebaseapp.com",
    databaseURL: "https://ssebd-cb9e8-default-rtdb.firebaseio.com",
    projectId: "ssebd-cb9e8",
    storageBucket: "ssebd-cb9e8.appspot.com",
    messagingSenderId: "569484499742",
    appId: "1:569484499742:web:809038a4e03e282bbc070f",
    measurementId: "G-W3RENCHERS"
  };

  // Inicialização do Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();

  async function getNextId(collectionName) {
    const doc = await db.collection('Counters').doc(collectionName).get();
    if (doc.exists) {
      const currentId = doc.data().currentId;
      await db.collection('Counters').doc(collectionName).update({ currentId: currentId + 1 });
      return currentId + 1;
    } else {
      await db.collection('Counters').doc(collectionName).set({ currentId: 1 });
      return 1;
    }
  }

  document.getElementById('add-user-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    // Capturar dados do formulário
    const nome = document.getElementById('add-user-name').value;
    const email = document.getElementById('add-user-email').value;
    const telefone = document.getElementById('telefone').value;
    const dt_nasc = document.getElementById('add-user-dt_nasc').value;
    const genero = document.getElementById('add-user-genero').value;
    const curserens = document.getElementById('cur-ser-ens').value;
    const instituicao = document.getElementById('instituicao').value;
    const cpf = document.getElementById('add-user-cpf').value;
    const rg = document.getElementById('add-user-rg').value;
    const pcd = document.getElementById('add-user-pcd').value;
    const icone = document.getElementById('add-user-icon').value;
    const nomeResponsavel = document.getElementById('NomeResponsavel').value;
    const emailResponsavel = document.getElementById('EmailResponsavel').value;
    const telefoneResponsavel = document.getElementById('TelefoneResponsavel').value;
    const rgResponsavel = document.getElementById('RGResponsavel').value;
    const cpfResponsavel = document.getElementById('CPFResponsavel').value;

    try {
      const alunoId = await getNextId('Alunos');
      await db.collection('Alunos').doc(alunoId.toString()).set({
        id: alunoId,
        nome: nome,
        email: email,
        telefone: telefone,
        dt_nasc: dt_nasc,
        genero: genero,
        curserens: curserens,
        instituicao: instituicao,
        cpf: cpf,
        rg: rg,
        pcd: pcd,
        icone: icone,
      });
      alert('Usuário adicionado com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar usuário:', error);
      alert('Erro ao adicionar usuário. Tente novamente.');
    }

    try {
      const responsavelId = await getNextId('Responsaveis');
      await db.collection('Responsaveis').doc(responsavelId.toString()).set({
        id: responsavelId,
        nomeResponsavel: nomeResponsavel,
        emailResponsavel: emailResponsavel,
        telefoneResponsavel: telefoneResponsavel,
        rgResponsavel: rgResponsavel,
        cpfResponsavel: cpfResponsavel,
      });
      alert('Responsável adicionado com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar responsável:', error);
      alert('Erro ao adicionar responsável. Tente novamente.');
    }
  });