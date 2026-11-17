import { Link } from "react-router-dom"

import "../styles/estiloPalDex.css"
import { useState, useEffect } from 'react'
import { setDoc, doc, getDoc, addDoc, collection, getDocs, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore'
import { db, auth } from '../fireBaseConnection'


function Estruturas() {

    const [nome, setNome] = useState("")
    const [categoria, setCategoria] = useState("")
    const [quantidade, setQuantidade] = useState("")
    const [nivelBase, setNivelBase] = useState("")
    const [palsNece, setPalsNece] = useState("")
    const [regiao, setRegiao] = useState("")

    const [msg, setMsg] = useState("")

    const [estrutura, setEstrutura] = useState([])
    const [idEstrutura, setIdEstrutura] = useState("")

    useEffect(() => {
        async function listarEstrutura() {

            onSnapshot(collection(db, "estruturas"), (querySnapshot) => {
                let lista = []
                querySnapshot.forEach((doc) => {
                    lista.push(
                        {
                            id: doc.id,
                            nome: doc.data().nome,
                            categoria: doc.data().categoria,
                            quantidade: doc.data().quantidade,
                            nivelBase: doc.data().nivelBase,
                            palsNece: doc.data().palsNece,
                            regiao: doc.data().regiao,

                        })
                })
                setEstrutura(lista)
            })
        }
        listarEstrutura()
    }, [])


    async function excluirEstrutura(id) {
        const estruRef = doc(db, "estruturas", id)

        await deleteDoc(estruRef)
            .then(() => {
                setMsg('Estrutura excluído com sucesso!')
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
                setMsg('Erro ao excluir a Estrutura!')
                console.log("Erro ao excluir os dados" + error)
            })
    }

    function selecionarEstrutura(item) {
        setIdEstrutura(item.id);
        setNome(item.nome);
        setCategoria(item.categoria)
        setNivelBase(item.nivelBase)
        setPalsNece(item.palsNece)
        setQuantidade(item.quantidade)
        setRegiao(item.regiao)

        window.scrollTo({
            top: 0,
            behavior: 'smooth' //animação suave
        });
    }

    function cancelarEdicao() {
        setIdEstrutura("");
        setCategoria("")
        setNivelBase("")
        setPalsNece("")
        setQuantidade("")
        setRegiao("")
        setNome('');
    }

    async function alterarEstrutura() {
        if (!idEstrutura) return;

        const estruRef = doc(db, "estruturas", idEstrutura);
        await setDoc(estruRef, {
            nome: nome,
            categoria: categoria,
            quantidade: quantidade,
            nivelBase: nivelBase,
            palsNece: palsNece,
            regiao:regiao
        })
            .then(() => {
                cancelarEdicao(); // Limpa os campos e oculta o card de edição
                setMsg("Estrutura alterado com sucesso!");
                setTimeout(() => setMsg(""), 3000);
            })
            .catch((error) => {
                console.log("Erro ao alterar: " + error);
                setMsg("Erro ao alterar os dados do Estrutura" + error);
            });
    }

    return (
        <div className="container-pals">
            <div className="titulo"  style={{ backgroundColor: '#1982D1', color:"white" }}>

                <h1 style={{color:"white"}}><strong>Estruturas</strong></h1>
                <p> - Veja todos as suas estruturas construidas e visitadas - </p>
            </div>

            {idEstrutura && (
                <div className="painel-edicao">
                    <h2>Editar Estrutura Selecionada</h2>

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


                    <div className="botoes">
                        <button onClick={cancelarEdicao} className="botao-cancelar">Cancelar</button>
                        <button onClick={alterarEstrutura} className="botao-alterar">Salvar Alterações</button>
                    </div>
                </div>
            )}

            <div className="exibirPals">
                <div className="mensagem">
                    {msg && (<h4 className="msg">{msg}</h4>)}
                </div>

                {/* Se a lsita estiver vazia */}
                {estrutura.length === 0 ? (
                    <div className="sem-pals">
                        <h3>Nenhuma Estrutura encontrada!</h3>

                        <Link to="/cadastroEstruturas" className="btn-cadastrar"> + Cadastrar Estrutura</Link>
                    </div>
                ) : (
                    /* Se exitir pals mostra eles */
                    <>
                        <div className="topo-acoes">
                            <Link to="/cadastroEstruturas" className="btn-cadastrar">+ Cadastrar Estrutura</Link>
                        </div>

                        {estrutura.map((item) => (
                            <div className="card-pals" key={item.id}>
                                <div className="nome-numero">
                                    <span className="nome">{item.nome}</span>
                                </div>
                                <label htmlFor="">Nome:</label>
                                <input type="text" placeholder="Forja Eletronica" name="" id="" value={item.nome} onChange={(e) => setNome(e.target.value)} className="inputs" disabled/>

                                <label htmlFor="">Categoria</label>

                                <select id="tipo1" value={item.categoria} onChange={(e) => setCategoria(e.target.value)} className="inputs-select" disabled>
                                    <option value={item.categoria}>{item.categoria}</option>
                                    
                                </select>


                                <label htmlFor="">Quantidade</label>
                                <input type="number" placeholder="2" name="" id="" value={item.quantidade} onChange={(e) => setQuantidade(e.target.value)} className="inputs" disabled/>

                                <label htmlFor="">Nivel de Base Necessária</label>
                                <input type="number" placeholder="5" name="" id="" value={item.nivelBase} onChange={(e) => setNivelBase(e.target.value)} className="inputs" disabled/>

                                <label htmlFor="">Quantidad de Pals Necessários</label>
                                <input type="number" placeholder="2" name="" id="" value={item.palsNece} onChange={(e) => setPalsNece(e.target.value)} className="inputs" disabled/>

                                <label htmlFor="">Região Pertencente:</label>
                                <input type="text" placeholder="Vulcão de Obsidiana" name="" id="" value={item.regiao} onChange={(e) => setRegiao(e.target.value)} className="inputs" disabled/>


                                <div className="botoes">
                                    <button className="botao-selecionar" onClick={() => selecionarEstrutura(item)}>Selecionar</button>
                                    <button className="botao-excluir" onClick={() => excluirEstrutura(item.id)}>Excluir</button>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>

        </div>
    )
}

export default Estruturas