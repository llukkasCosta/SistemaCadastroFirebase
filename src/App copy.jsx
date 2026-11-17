import { useState, useEffect } from 'react'
import { setDoc, doc, getDoc, addDoc, collection, getDocs, onSnapshot, deleteDoc } from 'firebase/firestore'
import { db, auth } from './fireBaseConnection'
import {createUserWithEmailAndPassword} from 'firebase/auth'

import './App.css'

function App() {


  const [nome, setNome] = useState("")
  const [cep, setCep] = useState("")
  const [endereco, setEndereco] = useState("")
  const [estado, setEstado] = useState("")
  const [cidade, setCidade] = useState("")

  const [dados, setDados] = useState([])
  const [posts, setPosts] = useState([])
  
  const [idPost, setIdPost] = useState("")
  const[msg, setMsg] = useState("")

  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")

  const [user, setUser] = useState(false)
  const [userDetails, setUserDetails] = useState({})


  useEffect(() => {
    async function listarPosts() {

      onSnapshot(collection(db, "novasPessoas"), (querySnapshot) => {
        let lista = []
        querySnapshot.forEach((doc) => {
          lista.push(
            {
              id: doc.id,
              nome: doc.data().nome,
              cep: doc.data().cep,
              endereco: doc.data().endereco,
              estado: doc.data().estado,
              cidade: doc.data().cidade
            })
        })
        setPosts(lista)
      })
    }
    listarPosts()
  }, [])


async function handleAdd() {

  await addDoc(collection(db, "novasPessoas"), {
    nome: nome,
    cep: cep,
    endereco: endereco,
    estado: estado,
    cidade: cidade
  })
    .then(() => {
      setNome("")
      setCep("")
      setEndereco("")
      setEstado("")
      setCidade("")
      
      setMsg("Dados cadastrados com sucesso")
      setTimeout(() => {
        setMsg("")
      }, 3000)
      console.log("Dados cadastrados com sucesso")
    })
    .catch((error) => {
      console.log("Erro ao cadastrar os dados" + error)
    })
}

async function buscarPost() {
  const postRef = doc(db, "novasPessoas", "123456")
  await getDoc(postRef)
    .then((snapshot) => {
      setNome(snapshot.data().nome)
      setEndereco(snapshot.data().endereco)
      setCep(snapshot.data().cep)
      setEstado(snapshot.data().estado)
      setCidade(snapshot.data().cidade)
      setMsg("Dados buscados com sucesso")
      timeout(() => {
        setMsg("")
      }, 3000)
     
    })
    .catch((error) => {
      console.log("Gerou um erro" + error)
    })
}

async function buscaAll() {
  const querySnapshot = await getDocs(collection(db, "pessoas"))
  querySnapshot.forEach((items) => {
    setDados(...dados, items.data())

    console.log(items.data())
  })
}


async function buscarPostAll() {
  await getDocs(collection(db, "novasPessoas"))
    .then((snapshot) => {
      let lista = []
      snapshot.forEach((doc) => {
        lista.push(
          {
            id: doc.id,
            nome: doc.data().nome,
            cep: doc.data().cep,
            endereco: doc.data().endereco,
            estado: doc.data().estado,
            cidade: doc.data().cidade
          }
        )

      })
      console.log("dados da coleção:", lista)
      setPosts(lista)
    })
    .catch((erro) => {
      console.log(erro)
    })


}

function selecionarPost(id, nome, cep, endereco, estado, cidade) {
  setIdPost(id)
  setNome(nome)
  setCep(cep)
  setEndereco(endereco)
  setEstado(estado)
  setCidade(cidade)

}

async function alterarPost(){
  const postRef = doc(db, "novasPessoas", idPost)
  await setDoc(postRef, {
    nome:nome,
    cep:cep,
    endereco:endereco,
    estado:estado,
    cidade:cidade
  })
  .then( () => {
    console.log("Dados Alterados com sucesso")
    setIdPost("")
    setNome("")
    setCep("")
    setEndereco("")
    setEstado("")
    setCidade("")
    setMsg("Dados alterados com sucesso")
    setTimeout(() => {
      setMsg("")
    }, 3000)
  })
  .catch( (error) =>{
    console.log("Erro ao alterar os dados" + error)
  })
}

async function excluirPost(id){
  const postRef = doc(db, "novasPessoas", id)

  await deleteDoc(postRef)
  .then(() => {
  console.log("Dados excluidos com sucesso")
  })
  .catch((error) => {
    console.log("Erro ao excluir os dados" + error)
  })
}


async function novoUser(){
  await createUserWithEmailAndPassword(auth, email, senha)
  .then((value) =>{
    console.log("Usuário criado com sucesso")
    console.log(value.user)
    setUser(true)
    setUserDetails({
      uid:value.user.uid,
      email:value.user.email
    })
    setEmail("")
    setSenha("")
  })
  .catch((error) =>{
    if(error.code ==="auth/weak-password"){
      console.log("Senha muito fraca")
    }else if(error.code === "auth/email-already-in-use"){
      alert("Email já cadastrado")
    }
    console.log("Erro ao criar usuário" + error)
  })
}

async function loginUser(){
  await signInWithEmailAndPassword(auth, email, senha)
  .then((value) =>{
    console.log("Usuário logado com sucesso")
    console.log(value.user)
    setEmail("")
    setSenha("")
  })
  .catch((error) =>{
    if(error.code ==="auth/wrong-password"){
      alert("Senha incorreta")
    }else if(error.code === "auth/user-not-found"){
      alert("Usuário não encontrado")
    }
    console.log("Erro ao logar usuário" + error)
  })
}

async function logout(){
  await auth.signOut()
  .then(() =>{
    setUser(false)
    setUserDetails({})
  })
}


return (
  <>
    <hr style={{ border: "1px solid #ccc", width: "100%", borderStyle: "solid", borderColor: "#ccc" }} />

      <h1>Cadastro de Usuário</h1>
      {user && (
        <div>
          <strong>Seja bem vindo:</strong> {userDetails.email} <br /> <br />
          <strong>Id: </strong> {userDetails.uid}
          <button onClick={logout}>Sair</button>
        </div>
      )}
    
      <label htmlFor="email">Email</label>
      <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/> <br /> <br />

      <label htmlFor="senha">Senha</label>
      <input type="password" name="senha" id="senha"  value={senha} onChange={(e) => setSenha(e.target.value)}/> <br /> <br />

      <button onClick={novoUser}>Entrar</button>
      <button onClick={loginUser}>Login user</button>
  
    <h1>Cadastro de Pessoa</h1>
    {msg &&  (<h4>{msg}</h4>)}
   
    <div className="container">
      <label htmlFor="">ID: </label>
      <input type="text" name="" id="" value={idPost} onChange={(e) => setIdPost(e.target.value)} disabled/>

      <label htmlFor="">Nome: </label>
      <input type="text" name="" id="" value={nome} onChange={(e) => setNome(e.target.value)} />  

      <label htmlFor="">CEP: </label>
      <input type="text" name="" id="" value={cep} onChange={(e) => setCep(e.target.value)} />

      <label htmlFor="">Endereço: </label>
      <input type="text" name="" id="" value={endereco} onChange={(e) => setEndereco(e.target.value)} />

      <label htmlFor="">Estado: </label>
      <input type="text" name="" id="" value={estado} onChange={(e) => setEstado(e.target.value)} />

      <label htmlFor="">Cidade: </label>
      <input type="text" name="" id="" value={cidade} onChange={(e) => setCidade(e.target.value)} />

      <button onClick={handleAdd}>Cadastrar</button>
      <button onClick={buscarPost}>Buscar</button>

      <button onClick={buscarPostAll}>Buscar Todos 2</button>
      <button onClick={alterarPost}>Alterar</button>

      <hr />
      {!posts && (<h1>Nenhum post encontrado</h1>)}


  
      {posts.map((item) => (
        <ul>
          <li>Id:
            <strong></strong> {item.id} <br />
            <strong>Nome:</strong> {item.nome} <br />
            <strong>CEP:</strong> {item.cep} <br />
            <strong>Endereço:</strong> {item.endereco} <br />
            <strong>Estado:</strong> {item.estado} <br />
            <strong>Cidade:</strong> {item.cidade} <br />
            <button class="excluirBtn" onClick={() => excluirPost(item.id)}>Excluir</button> &nbsp; &nbsp;
            <button class="selecionarBtn" onClick={() => selecionarPost(item.id, item.nome, item.cep, item.endereco, item.estado, item.cidade)}>Selecionar</button>
          </li>
        </ul>
      ))}
    </div>
  </>
)
}

export default App
