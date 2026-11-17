import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../fireBaseConnection'
import { signInWithEmailAndPassword } from 'firebase/auth'
import "../styles/estiloCadastro.css"
import "../styles/estiloLogin.css"


function Login() {

    const [nome, setNome] = useState("")
    const [idade, setIdade] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    const [user, setUser] = useState(false)
    const [msg, setMsg] = useState("")
    
 const navigate = useNavigate()


    async function loginUser() {
        await signInWithEmailAndPassword(auth, email, senha)
            .then((value) => {
                console.log("Usuário logado com sucesso")
                setMsg("Usuário logado com sucesso")
                console.log(value.user)
                setEmail("")
                setSenha("")

                setTimeout(() => {
                    setMsg("")
                    navigate('/', { replace: true });
                }, 2000)
            })
            .catch((error) => {
                if (error.code === "auth/wrong-password") {

                    setMsg("Senha incorreta")

                    setTimeout(() => {
                        setMsg("")
                    }, 3000)
                } else if (error.code === "auth/user-not-found") {
                    setMsg("Usuário não encontrado")
                }else {
                    setMsg("Erro ao fazer login.");
                }
                console.log("Erro ao logar: " + error);
            })
    }
    return (
        <div className="container-pals">

            
           

             <div className="titulo" style={{ backgroundColor: '#5720ec', color: "white" }}>
                    <h1 style={{ color: "white" }}>Entre com a sua conta</h1>

                    <p>E acesse nosso sistema</p>
                </div>

            <div className="bemvindo">
                <h2>Seja Bem vindo a Dex de PalWord</h2>
            </div>

            <div className="cadastro">

               

                <label htmlFor="">Email</label>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="inputs" />

                <label htmlFor="">Senha</label>
                <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} className="inputs" />

                <div className="efetuar-cadastro">

                    
                    <button onClick={loginUser} style={{backgroundColor:"#5720ec"}}>Entrar</button>
                     <Link to="/cadastroUser" className="btn-cadastrar">Faça seu cadastro</Link>
                </div>

                

                <div className="mensagem">

                    {msg && (<h4 className="msg" style={{ color: "#1e293b" }}>{msg}</h4>)}
                </div>

            </div>
        </div>
    )
}

export default Login