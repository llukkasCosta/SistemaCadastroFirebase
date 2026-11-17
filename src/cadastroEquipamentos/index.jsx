import { useState } from "react"

import { addDoc, collection } from 'firebase/firestore'
import { db } from '../fireBaseConnection'

function CadastroEquipamentos() {
    const [nome, setNome] = useState("")
    const [bossRecomendado, setBossRecomendado] = useState("")
    const [categoria, setCategoria] = useState("")
    const [materiais, setMateriais] = useState("")
    const [tecnologia, setTecnologia] = useState("")
    const [nivel, setNivel] = useState("")
    
    const [poder, setPoder] = useState("")
    const [dano, setDano] = useState("")
    const [defesa, setDefesa] = useState("")
    const [vida, setVida] = useState("")
    const [durabilidade, setDurabilidade] = useState("")
    const [funcao, setFuncao] = useState("")
    const [recarga, setRecarga] = useState("")

    const [msg, setMsg] = useState("")

    async function handleAdd() {

         if (bossRecomendado === '' || nome === '' || categoria === '' || materiais === '' || categoria === '') {
            setMsg('Preencha todos os campos.')
            console.log('Preencha todos os campos obrigatórios.')
        } else {
                await addDoc(collection(db, "equipamento"), {
                    nome: nome,
                    bossRecomendado: bossRecomendado,
                    categoria: categoria,
                    materiais:materiais,
                    tecnologia: tecnologia,
                    nivel: nivel,

                    poder: poder,
                    dano: dano,
                    defesa: defesa,
                    vida: vida,
                    durabilidade: durabilidade,
                    funcao:funcao,
                    recarga: recarga
                   
                })
                    .then(() => {
                        setNome('');
                        setBossRecomendado("")
                        setCategoria("")
                        setMateriais("")
                        setTecnologia("")
                        setNivel('');

                        setPoder("")
                        setDano("")
                        setDefesa("")
                        setDefesa("")
                        setVida("")
                        setDurabilidade("")
                        setFuncao("")
                        setRecarga("")
                        

                        setMsg('Equipamentos cadastrado com sucesso!')
                        console.log('Equipamentos cadastrado com sucesso!')
                        setTimeout(() => {
                            setMsg("")
                        }, 3000)
                    })
                    .catch((error) => {
                        setMsg('Erro ao cadastrar o Equipamento: ' + error.message)
                        console.log('Erro ao cadastrar o Equipamento: ' + error.message)
                    })
            
        }

    }
    return (
        <div className="container-pals">
            


             <div className="titulo"  style={{ backgroundColor: '#7C6138', color:"white" }}>

                <h1 style={{color:"white"}}><strong>Cadastro de Equipamentos</strong></h1>
                <p>- Suas Armas -</p>
            </div>
            <div className="cadastro">
                <label htmlFor="">Nome:</label>
                <input type="text" placeholder="Lança-Foguete" name="" id="" value={nome} onChange={(e) => setNome(e.target.value)} className="inputs" />

                <label htmlFor="">Boss recomendado:</label>
                <input type="text" placeholder="Jetragon Alfa" name="" id="" value={bossRecomendado} onChange={(e) => setBossRecomendado(e.target.value)} className="inputs" />

                <label htmlFor="">Nivel:</label>
                <input type="number" placeholder="15" name="" id="" value={nivel} onChange={(e) => setNivel(e.target.value)} className="inputs" />

                <label htmlFor="">Categoria</label>

                <select id="tipo1" value={categoria} onChange={(e) => setCategoria(e.target.value)} className="inputs-select">
                    <option value="">Selecione um tipo</option>
                    <option value="Arma_de_longo_Alcance">Arma de longo Alcance</option>
                    <option value="Arma_Corpo-a-Corpo">Armas Corpo-a-Corpo</option>
                    <option value="Ferramentas">Ferramentas</option>
                    <option value="Armadura">Armadura</option>
                    <option value="Acessorios">Acessorios</option>
                    <option value="Construcao">Construção</option>
                    <option value="Esferas_de_Pal">Esferas de Pal</option>
                </select>

                {categoria === "Esferas_de_Pal" && (
                    <div className="campos-especifico">
                        <label>Poder de Captura:</label>
                        <input type="number" step="0.1" placeholder="1.5" value={poder} onChange={(e) => setPoder(e.target.value)} className="inputs-select" />
                    </div>
                )}

                {categoria === "Arma_de_longo_Alcance" && (
                    <div className="campos-especifico">
                        <label htmlFor="">Dano:</label>
                        <input type="number" placeholder="10000" name="" id="" value={dano} onChange={(e) => setDano(e.target.value)} className="inputs" />
                    </div>
                )}

                {categoria === "Arma_Corpo-a-Corpo" && (
                    <div className="campos-especifico">
                        <label htmlFor="">Dano:</label>
                        <input type="number" placeholder="10000" name="" id="" value={dano} onChange={(e) => setDano(e.target.value)} className="inputs" />
                    </div>
                )}

                {categoria === "Armadura" && (
                    <div className="campos-especificos">
                        <label>Pontos de Defesa:</label>
                        <input type="number" placeholder="120" value={defesa} onChange={(e) => setDefesa(e.target.value)}  />

                        <label>Vida Adicional:</label>
                        <input type="number" placeholder="250" value={vida} onChange={(e) => setVida(e.target.value)} />
                    </div>
                )}

                {categoria === "Ferramentas" && (
                    <div className="campos-especificos">
                        <label>Durabilidade</label>
                        <input type="number" placeholder="1200" value={durabilidade} onChange={(e) => setDurabilidade(e.target.value)}  />
                    </div>
                )}

                 {categoria === "Acessorios" && (
                    <div className="campos-especificos">
                        <label>Função: </label>
                        <input type="text" placeholder="1200" value={funcao} onChange={(e) => setFuncao(e.target.value)}  />
                    </div>
                )}

                 {categoria === "Construcao" && (
                    <div className="campos-especificos">
                        <label>Tempo de recarga:  </label>
                        <input type="text" placeholder="10s" value={recarga} onChange={(e) => setRecarga(e.target.value)}  />
                    </div>
                )}



                <label htmlFor="">Materiais:</label>
                <input type="text" placeholder="Lingote de Pal x20" name="" id="" value={materiais} onChange={(e) => setMateriais(e.target.value)} className="inputs" />

                <label htmlFor="">Nivel de Tecnologia necessária: </label>
                <input type="number" placeholder="49" name="" id="" value={tecnologia} onChange={(e) => setTecnologia(e.target.value)} className="inputs" />

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

export default CadastroEquipamentos