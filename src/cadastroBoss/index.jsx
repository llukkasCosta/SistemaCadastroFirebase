import "../styles/estiloCadastro.css"
import { useState } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../fireBaseConnection'


function CadastroBoss() {

    const [numero, setNumero] = useState("")
    const[nivel, setNivel] = useState("")
    const [nome, setNome] = useState("")
    const [recompensa, setRecompesa] = useState("")
    const [regiao, setRegiao] = useState("")
    const [status, setStatus] = useState("Derrotado")
    const [tipoArena, setTipoArena] = useState("Campo_Aberto")

    const [msg, setMsg] = useState("")

    async function handleAdd() {
        if (numero === '' || nome === '' || recompensa === '' || regiao === '' || status === '' || tipoArena === '' || nivel === "") {
            setMsg('Preencha todos os campos.')
            console.log('Preencha todos os campos obrigatórios.')
        } else {
           
                await addDoc(collection(db, "bosses"), {
                    numero: numero,
                    nome: nome,
                    recompensa: recompensa,
                    status: status,
                    regiao: regiao,
                    tipoArena: tipoArena,
                    nivel: nivel,
                    
                })
                    .then(() => {
                        setNumero('');
                        setNome('');
                        setRecompesa("");
                        setRegiao("")
                        setStatus("")
                        setTipoArena("")
                        setNivel("")

                        setMsg('Boss cadastrado com sucesso!')
                        console.log('Boss cadastrado com sucesso!')
                        setTimeout(() => {
                            setMsg("")
                        }, 3000)
                    })
                    .catch((error) => {
                        setMsg('Erro ao cadastrar o Boss: ' + error.message)
                        console.log('Erro ao cadastrar o Boss: ' + error.message)
                    })
            
        }
    }


    return (
        <div className="container-pals">
            

            <div className="titulo"  style={{ backgroundColor: '#1921D1', color:"white" }}>

                <h1 style={{color:"white"}}><strong>Cadastro de Bosses</strong></h1>
                <p> - Chefões enfrentados -  </p>
            </div>
            <div className="cadastro">

                <label htmlFor="">Número:</label>
                <input type="number" placeholder="185" name="" id="" value={numero} onChange={(e) => setNumero(e.target.value)} className="inputs" />


                <label htmlFor="">Nome:</label>
                <input type="text" placeholder="Jetragon Alfa" name="" id="" value={nome} onChange={(e) => setNome(e.target.value)} className="inputs" />

                <label htmlFor="">Nível</label>
                <input type="number" placeholder="50" name="" id="" value={nivel} onChange={(e) => setNivel(e.target.value)} className="inputs" />

                <label htmlFor="">Recompensa</label>
                <input type="text" placeholder="Peça de Tecnologia Antiga x3" name="" id="" value={recompensa} onChange={(e) => setRecompesa(e.target.value)} className="inputs" />

                <label htmlFor="">Região:</label>
                <input type="text" placeholder="Vulcão Obsidian" name="" id="" value={regiao} onChange={(e) => setRegiao(e.target.value)} className="inputs" />

                <label htmlFor="">Status:</label>
                <select name="" id="" value={status} onChange={(e) => setStatus(e.target.value)} className="inputs-select">
                    <option value="Derrotado">Derrotado</option>
                    <option value="Pendente">Pedente</option>
                </select>
               
                <label htmlFor="">Tipo de Arena:</label>
                <select name="" id="" value={tipoArena} onChange={(e) => setTipoArena(e.target.value)} className="inputs-select">
                    <option value="Campo_Aberto">Campo Aberto</option>
                    <option value="Dungeon">Dungeon</option>
                    <option value="Selo">Selo</option>
                </select>
               
            </div>

            <div className="efetuar-cadastro">

                <button onClick={handleAdd}>Cadastrar</button>
            </div>


            <br />
            <div className="mensagem">

                {msg && (<h4 className="msg">{msg}</h4>)}
            </div>

        </div>
    )
}

export default CadastroBoss