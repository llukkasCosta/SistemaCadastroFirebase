import { useState } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../fireBaseConnection'
import "../styles/estiloCadastro.css"

function CadastroEstruturas() {
    const [nome, setNome] = useState("")
    const [categoria, setCategoria] = useState("")
    const [quantidade, setQuantidade] = useState("")
    const [nivelBase, setNivelBase] = useState("")
    const [palsNece, setPalsNece] = useState("")
    const [regiao, setRegiao] = useState("")

    const [msg, setMsg] = useState("")

    async function handleAdd() {
        if (nome === '' || categoria === '' || quantidade === '' || nivelBase === '' || palsNece === '' || regiao === '' ) {
            setMsg('Preencha todos os campos.')
            console.log('Preencha todos os campos obrigatórios.')
        } else {
            await addDoc(collection(db, "estruturas"), {

                nome: nome,
                categoria: categoria,
                quantidade: quantidade,
                nivelBase: nivelBase,
                palsNece: palsNece,
                regiao: regiao
            })
                .then(() => {
                    setCategoria("")
                    setNivelBase("")
                    setPalsNece("")
                    setQuantidade("")
                    setRegiao("")
                    setNome('');
                    setMsg('Estrutura cadastrado com sucesso!')
                    console.log('Estrutura cadastrado com sucesso!')
                    setTimeout(() => {
                        setMsg("")
                    }, 3000)
                })
                .catch((error) => {
                    setMsg('Erro ao cadastrar o Pal: ' + error.message)
                    console.log('Erro ao cadastrar o Pal: ' + error.message)
                })

        }
    }

    return (
        <div className="container-pals">
            <div className="titulo"  style={{ backgroundColor: '#1982D1', color:"white" }}>

                <h1 style={{color:"white"}}><strong>Cadastro de Estruturas</strong></h1>
                <p> - Suas estruturas contruidas- </p>
            </div>
            <div className="cadastro">

                <label htmlFor="">Nome:</label>
                <input type="text" placeholder="Forja Eletronica" name="" id="" value={nome} onChange={(e) => setNome(e.target.value)} className="inputs" />

                <label htmlFor="">Categoria</label>

                <select id="tipo1" value={categoria} onChange={(e) => setCategoria(e.target.value)} className="inputs-select">
                    <option value="">Selecione um tipo</option>
                   <option value="Producao">Produção</option>
                   <option value="Alimentacao">Alimentação</option>
                   <option value="Descanco">Descanço</option>
                   <option value="Defesa">Defesa</option>
                </select>


                <label htmlFor="">Quantidade</label>
                <input type="number" placeholder="2" name="" id="" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} className="inputs" />

                <label htmlFor="">Nivel de Base Necessária</label>
                <input type="number" placeholder="5" name="" id="" value={nivelBase} onChange={(e) => setNivelBase(e.target.value)} className="inputs" />

                <label htmlFor="">Quantidad de Pals Necessários</label>
                <input type="number" placeholder="2" name="" id="" value={palsNece} onChange={(e) => setPalsNece(e.target.value)} className="inputs" />

                <label htmlFor="">Região Pertencente:</label>
                <input type="text" placeholder="Vulcão de Obsidiana" name="" id="" value={regiao} onChange={(e) => setRegiao(e.target.value)} className="inputs" />

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

export default CadastroEstruturas