import { useState, useEffect } from 'react'
import { setDoc, doc, getDoc, addDoc, collection, getDocs, onSnapshot, deleteDoc } from 'firebase/firestore'
import { db, auth } from '../fireBaseConnection'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import "../styles/estiloCadastro.css"
import { Link, useNavigate } from 'react-router-dom'
import "../styles/estiloLogin.css"

function CadastroUser() {

    const [nome, setNome] = useState("")
    
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    const [user, setUser] = useState(false)
    const [msg, setMsg] = useState("")
    const [userDetails, setUserDetails] = useState({})
    const navigate = useNavigate()

    async function handleAdd() {

    }



    async function novoUser() {
        await createUserWithEmailAndPassword(auth, email, senha)
            .then((value) => {
                console.log("Usuário criado com sucesso")
                console.log(value.user)
                setUser(true)
                setUserDetails({
                    uid: value.user.uid,
                    email: value.user.email

                })
                setNome("")
               
                setEmail("")
                setSenha("")
                setMsg('Usuário cadastrado com sucesso!')
                setTimeout(() => {
                    navigate('/login', { replace: true });
                    setMsg("")
                }, 2000);
            })
            .catch((error) => {
                if (error.code === "auth/weak-password") {
                    setMsg('Senha muito fraca!')
                    console.log("Senha muito fraca")
                } else if (error.code === "auth/email-already-in-use") {
                    
                    setMsg('Email já cadstrado!')
                }else{
                    setMsg("Erro ao criar o usuário!")
                    console.log("Erro ao criar usuário" + error)

                }

                console.log("Erro ao criar usuário: " + error);
            })
    }

    return (
        <div className="container-pals">

            <div className="titulo" style={{ backgroundColor: '#5720ec', color: "white" }}>
                    <h1 style={{ color: "white" }}>Cadastro de Usuário</h1>

                    <p>E acesse nosso sistema</p>
                </div>

                <div className="bemvindo">
                <h2>Seja Bem vindo a Dex de PalWord</h2>
            </div>
            <div className="cadastro">
             

                <label htmlFor="">Nome:</label>
                <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} className="inputs" />

                <label htmlFor="">Email</label>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="inputs" />

                <label htmlFor="">Senha</label>
                <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} className="inputs" />

               

                <div className="efetuar-cadastro">

                     <button onClick={novoUser} style={{backgroundColor:"#5720ec"}}>Entrar</button>
                    <Link to="/login" className="btn-cadastrar">Fazer Login</Link>
                </div>

                 <div className="mensagem">

                {msg && (<h4 className="msg" style={{color:"#1e293b"}}>{msg}</h4>)}
            </div>

            </div>
        </div>
    )
}

export default CadastroUser