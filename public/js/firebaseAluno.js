async function getNextId(collectionName) {
  try {
      const docRef = db.collection('Counters').doc(collectionName);
      const doc = await docRef.get();

      if (doc.exists) {
          const currentId = doc.data().currentId;
          await docRef.update({ currentId: currentId + 1 });
          return currentId + 1;
      } else {
          await docRef.set({ currentId: 1 });
          return 1;
      }
  } catch (error) {
      console.error("Erro ao obter o próximo ID:", error);
      throw error;
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
      const alunoId = await getNextId('dadosAluno');
      await db.collection('dadosAluno').doc(alunoId.toString()).set({
          userId: alunoId,
          nome: nome,
          email: email,
          tel: telefone,
          dataNct: dt_nasc,
          genero: genero,
          cursos: curserens,
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
