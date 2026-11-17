import "../styles/estiloPalDex.css"
import { useState, useEffect } from 'react'
import { setDoc, doc, getDoc, addDoc, collection, getDocs, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore'
import { db, auth } from '../fireBaseConnection'
import { Link } from "react-router-dom"

function Equipamentos() {
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
    const [equpamentos, setEquipamento] = useState([])
    const [idEquipa, setIdEquipa] = useState("")

    useEffect(() => {
        async function listarEquipamentos() {

            onSnapshot(collection(db, "equipamento"), (querySnapshot) => {
                let lista = []
                querySnapshot.forEach((doc) => {
                    lista.push(
                        {
                            id: doc.id,
                            nome: doc.data().nome,
                            bossRecomendado: doc.data().bossRecomendado,
                            categoria: doc.data().categoria,
                            materiais: doc.data().materiais,
                            tecnologia: doc.data().tecnologia,
                            nivel: doc.data().nivel,


                            poder: doc.data().poder,
                            dano: doc.data().dano,
                            defesa: doc.data().defesa,
                            vida: doc.data().vida,
                            durabilidade: doc.data().durabilidade,
                            funcao: doc.data().funcao,
                            recarga: doc.data().recarga,


                        })
                })
                setEquipamento(lista)
            })
        }
        listarEquipamentos()
    }, [])

    async function excluirEquipa(id) {
        const equipaRef = doc(db, "equipamento", id)

        await deleteDoc(equipaRef)
            .then(() => {
                setMsg('Equipamento excluído com sucesso!')

                window.scrollTo({
                    top: 0,
                    behavior: 'smooth' //animação suave
                });
                setTimeout(() => {
                    setMsg("")
                }, 3000)
                console.log("Dados excluidos com sucesso")
            })
            .catch((error) => {
                setMsg('Erro ao excluir o Equipamento!')
                console.log("Erro ao excluir os Equipamento" + error)
            })
    }

    function selecionarEquipa(item) {
        setIdEquipa(item.id)
        setNome(item.nome);
        setBossRecomendado(item.bossRecomendado)
        setCategoria(item.categoria)
        setMateriais(item.materiais)
        setTecnologia(item.tecnologia)
        setNivel(item.nivel);

        setPoder(item.poder)
        setDano(item.dano)
        setDefesa(item.defesa)
        setDefesa(item.defesa)
        setVida(item.vida)
        setDurabilidade(item.durabilidade)
        setFuncao(item.funcao)
        setRecarga(item.recarga)


        window.scrollTo({
            top: 0,
            behavior: 'smooth' //animação suave
        });
    }


    function cancelarEdicao() {
        setIdEquipa("");
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
    }



    async function alterarEquipa() {
        if (!idEquipa) return;

        const equipaRef = doc(db, "equipamento", idEquipa);
        await setDoc(equipaRef, {
            nome: nome,
            bossRecomendado: bossRecomendado,
            categoria: categoria,
            materiais: materiais,
            tecnologia: tecnologia,
            nivel: nivel,

            poder: poder,
            dano: dano,
            defesa: defesa,
            vida: vida,
            durabilidade: durabilidade,
            funcao: funcao,
            recarga: recarga

        })
            .then(() => {
                cancelarEdicao(); // Limpa os campos e oculta o card de edição
                setMsg("Equipamento alterado com sucesso!");
                setTimeout(() => setMsg(""), 3000);
            })
            .catch((error) => {
                console.log("Erro ao alterar: " + error);
                setMsg("Erro ao alterar os dados do Equipamento.");
            });
    }


    return (
        <div className="container-pals">

            <div className="titulo"  style={{ backgroundColor: '#7C6138', color:"white" }}>

                <h1 style={{color:"white"}}><strong>Equipamentos</strong></h1>
                <p>-Veja todos os seus equipamentos usados-</p>
            </div>

            {idEquipa && (
                <div className="painel-edicao">
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
                            <input type="number" placeholder="120" value={defesa} onChange={(e) => setDefesa(e.target.value)} />

                            <label>Vida Adicional:</label>
                            <input type="number" placeholder="250" value={vida} onChange={(e) => setVida(e.target.value)} />
                        </div>
                    )}

                    {categoria === "Ferramentas" && (
                        <div className="campos-especificos">
                            <label>Durabilidade</label>
                            <input type="number" placeholder="1200" value={durabilidade} onChange={(e) => setDurabilidade(e.target.value)} />
                        </div>
                    )}

                    {categoria === "Acessorios" && (
                        <div className="campos-especificos">
                            <label>Função: </label>
                            <input type="text" placeholder="1200" value={funcao} onChange={(e) => setFuncao(e.target.value)} />
                        </div>
                    )}

                    {categoria === "Construcao" && (
                        <div className="campos-especificos">
                            <label>Tempo de recarga:  </label>
                            <input type="text" placeholder="10s" value={recarga} onChange={(e) => setRecarga(e.target.value)} />
                        </div>
                    )}



                    <label htmlFor="">Materiais:</label>
                    <input type="text" placeholder="Lingote de Pal x20" name="" id="" value={materiais} onChange={(e) => setMateriais(e.target.value)} className="inputs" />

                    <label htmlFor="">Nivel de Tecnologia necessária: </label>
                    <input type="number" placeholder="49" name="" id="" value={tecnologia} onChange={(e) => setTecnologia(e.target.value)} className="inputs" />


                    <div className="botoes">
                        <button onClick={cancelarEdicao} className="botao-cancelar">Cancelar</button>
                        <button onClick={alterarEquipa} className="botao-alterar">Salvar Alterações</button>
                    </div>
                </div>
            )}

            <div className="exibirPals">
                <div className="mensagem">
                    {msg && (<h4 className="msg">{msg}</h4>)}
                </div>

                {/* Se a lsita estiver vazia */}
                {equpamentos.length === 0 ? (
                    <div className="sem-pals">
                        <h3>Nenhum Equipamento encontrado!</h3>

                        <Link to="/cadastroEquipamento" className="btn-cadastrar"> + Cadastrar Equipamentos</Link>
                    </div>
                ) : (
                    /* Se exitir pals mostra eles */
                    <>
                        <div className="topo-acoes">
                            <Link to="/cadastroEquipamento" className="btn-cadastrar">+ Cadastrar Equipamento</Link>
                        </div>

                        {equpamentos.map((item) => (
                            <div className="card-pals" key={item.id}>
                                <div className="nome-numero">
                                    <span className="numero">#{item.nivel}</span>
                                    <span className="nome">{item.nome}</span>
                                </div>

                                <label htmlFor="">Boss recomendado:</label>
                                <input type="text" placeholder="Jetragon Alfa" name="" id="" value={item.bossRecomendado} onChange={(e) => setBossRecomendado(e.target.value)} className="inputs" disabled />

                                <label htmlFor="">Categoria</label>

                                <select id="tipo1" value={item.categoria} onChange={(e) => setCategoria(e.target.value)} className="inputs-select" disabled>
                                    <option value={item.categoria}>{item.categoria}</option>
                                </select>

                                {item.categoria === "Esferas_de_Pal" && (
                                    <div className="campos-especifico">
                                        <label>Poder de Captura:</label>
                                        <input type="number" step="0.1" placeholder="1.5" value={item.poder} onChange={(e) => setPoder(e.target.value)} className="inputs-select" disabled/>
                                    </div>
                                )}

                                {item.categoria === "Arma_de_longo_Alcance" && (
                                    <div className="campos-especifico">
                                        <label htmlFor="">Dano:</label>
                                        <input type="number" placeholder="10000" name="" id="" value={item.dano} onChange={(e) => setDano(e.target.value)} className="inputs" disabled/>
                                    </div>
                                )}

                                {item.categoria === "Arma_Corpo-a-Corpo" && (
                                    <div className="campos-especifico">
                                        <label htmlFor="">Dano:</label>
                                        <input type="number" placeholder="10000" name="" id="" value={item.dano} onChange={(e) => setDano(e.target.value)} className="inputs" disabled/>
                                    </div>
                                )}

                                {item.categoria === "Armadura" && (
                                    <div className="campos-especificos">
                                        <label>Pontos de Defesa:</label>
                                        <input type="number" placeholder="120" value={item.defesa} onChange={(e) => setDefesa(e.target.value)} disabled/>

                                        <label>Vida Adicional:</label>
                                        <input type="number" placeholder="250" value={item.vida} onChange={(e) => setVida(e.target.value)} disabled/>
                                    </div>
                                )}

                                {item.categoria === "Ferramentas" && (
                                    <div className="campos-especificos">
                                        <label>Durabilidade</label>
                                        <input type="number" placeholder="1200" value={item.durabilidade} onChange={(e) => setDurabilidade(e.target.value)} disabled/>
                                    </div>
                                )}

                                {item.categoria === "Acessorios" && (
                                    <div className="campos-especificos">
                                        <label>Função: </label>
                                        <input type="text" placeholder="1200" value={item.funcao} onChange={(e) => setFuncao(e.target.value)} disabled/>
                                    </div>
                                )}

                                {item.categoria === "Construcao" && (
                                    <div className="campos-especificos">
                                        <label>Tempo de recarga:  </label>
                                        <input type="text" placeholder="10s" value={item.recarga} onChange={(e) => setRecarga(e.target.value)} disabled/>
                                    </div>
                                )}



                                <label htmlFor="">Materiais:</label>
                                <input type="text" placeholder="Lingote de Pal x20" name="" id="" value={item.materiais} onChange={(e) => setMateriais(e.target.value)} className="inputs" disabled/>

                                <label htmlFor="">Nivel de Tecnologia necessária: </label>
                                <input type="number" placeholder="49" name="" id="" value={item.tecnologia} onChange={(e) => setTecnologia(e.target.value)} className="inputs" disabled/>

                                <div className="botoes">
                                    <button className="botao-selecionar" onClick={() => selecionarEquipa(item)}>Selecionar</button>
                                    <button className="botao-excluir" onClick={() => excluirEquipa(item.id)}>Excluir</button>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>

        </div>
    )
}

export default Equipamentos