
import "../styles/estiloCadastro.css"
import { useState } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../fireBaseConnection'

function CadastroRegioes(){
    const [nome, setNome] = useState("")
    const [clima, setClima] = useState("")
    const [faixaNivel, setFaixaNivel ] = useState("")
    const [recurso, setRecursos] = useState("")
    const [viagem, setViagem] = useState("Sim")
    
    const [msg, setMsg] = useState("")
    async function handleAdd(){
         if (nome === '' || clima === '' || faixaNivel === '' || recurso === '' || viagem === '') {
            setMsg('Preencha todos os campos.')
            console.log('Preencha todos os campos obrigatórios.')
        } else {
                await addDoc(collection(db, "regioes"), {
                    nome: nome,
                    clima:clima,
                    faixaNivel: faixaNivel,
                    recurso: recurso,
                    viagem:viagem
                   
                })
                    .then(() => {
                        setNome('');
                        setClima("")
                        setFaixaNivel("")
                        setRecursos("")
                        setViagem("")
                        setMsg('Região cadastrado com sucesso!')
                        console.log('Região cadastrado com sucesso!')
                        setTimeout(() => {
                            setMsg("")
                        }, 3000)
                    })
                    .catch((error) => {
                        setMsg('Erro ao cadastrar a Região: ' + error.message)
                        console.log('Erro ao cadastrar o Região: ' + error.message)
                    })
            
        }
    }
    return(
       <div className="container-pals">
             <div className="titulo"  style={{ backgroundColor: '#D15319', color:"white" }}>

                <h1 style={{color:"white"}}><strong>Cadastro de Regiões</strong></h1>
                <p>  - Suas regiões visitadas-  </p>
            </div>
            <div className="cadastro">
            
                <label htmlFor="">Nome:</label>
                <input type="text" placeholder="Vulcão-Obsidian" name="" id="" value={nome} onChange={(e) => setNome(e.target.value)} className="inputs" />

                <label htmlFor="">Clima:</label>

                <select id="tipo1" value={clima} onChange={(e) => setClima(e.target.value)} className="inputs-select">
                    <option value="">Selecione um tipo</option>
                    <option value="Temperado">Temperado</option>
                    <option value="Quente">Quente</option>
                    <option value="Congelante">Congelante</option>
                    <option value="Tropical">Tropical</option>
                    <option value="Sombrio">Sombrio</option>
                    
                </select>

                <label htmlFor="">Faixa de Nivel:</label>
                <input type="number" placeholder="30" name="" id="" value={faixaNivel} onChange={(e) => setFaixaNivel(e.target.value)} className="inputs" />

                <label htmlFor="">Recursos:</label>
                <input type="text" placeholder="Minerio de Enxofre" name="" id="" value={recurso} onChange={(e) => setRecursos(e.target.value)} className="inputs" />

                <label htmlFor="">Tem Viagem Rápida?</label>
                <select id="equipe" name="equipe" placeholder="Selecione" value={viagem} onChange={(e) => setViagem(e.target.value)} className="inputs-select">
                    <option value="Sim">Sim</option>
                    <option value="Nao">Não</option>
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

export default CadastroRegioes