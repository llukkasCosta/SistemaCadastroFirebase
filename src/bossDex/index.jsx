import { Link } from "react-router-dom"

import "../styles/estiloPalDex.css"
import { useState, useEffect } from 'react'
import { setDoc, doc, getDoc, addDoc, collection, getDocs, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore'
import { db, auth } from '../fireBaseConnection'

function BossDex() {
    const [numero, setNumero] = useState("")
    const [nivel, setNivel] = useState("")
    const [nome, setNome] = useState("")
    const [recompensa, setRecompesa] = useState("")
    const [regiao, setRegiao] = useState("")
    const [status, setStatus] = useState("")
    const [tipoArena, setTipoArena] = useState("")


    const [msg, setMsg] = useState("")

    const [boss, setBoss] = useState([]);

    const [idBoss, setIdBoss] = useState("")

    useEffect(() => {
        async function listarBoss() {

            onSnapshot(collection(db, "bosses"), (querySnapshot) => {
                let lista = []
                querySnapshot.forEach((doc) => {
                    lista.push(
                        {
                            id: doc.id,
                            nome: doc.data().nome,
                            numero: doc.data().numero,
                            recompensa: doc.data().recompensa,
                            regiao: doc.data().regiao,
                            status: doc.data().status,
                            tipoArena: doc.data().tipoArena,
                            nivel: doc.data().nivel,

                        })
                })
                setBoss(lista)
            })
        }
        listarBoss()
    }, [])

    async function excluirBoss(id) {
        const bossRef = doc(db, "bosses", id)

        await deleteDoc(bossRef)
            .then(() => {
                setMsg('Boss excluído com sucesso!')

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
                setMsg('Erro ao excluir o Boss')
                console.log("Erro ao excluir os dados" + error)
            })
    }

    function selecionarBoss(item) {
        setIdBoss(item.id);
        setNumero(item.numero);
        setNome(item.nome);
        setRecompesa(item.recompensa);
        setRegiao(item.regiao)
        setStatus(item.status)
        setTipoArena(item.tipoArena)
        setNivel(item.nivel)

        window.scrollTo({
            top: 0,
            behavior: 'smooth' //animação suave
        });
    }


    function cancelarEdicao() {
        setIdBoss("");
        setNumero('');
        setNome('');
        setRecompesa("");
        setRegiao("")
        setStatus("")
        setTipoArena("")
        setNivel("")
    }

    async function alterarBoss() {
        if (!idBoss) return;

        const bossRef = doc(db, "bosses", idBoss);
        await setDoc(bossRef, {
            numero: numero,
            nome: nome,
            recompensa: recompensa,
            status: status,
            regiao: regiao,
            tipoArena: tipoArena,
            nivel: nivel,
        })
            .then(() => {
                cancelarEdicao(); // Limpa os campos e oculta o card de edição
                setMsg("Boss alterado com sucesso!");
                setTimeout(() => setMsg(""), 3000);
            })
            .catch((error) => {
                console.log("Erro ao alterar: " + error);
                setMsg("Erro ao alterar os dados do Boss." + error);
            });
    }
    return (
        <div className="container-pals">
            
            <div className="titulo"  style={{ backgroundColor: '#1921D1', color:"white" }}>

                <h1 style={{color:"white"}}><strong>Bosses</strong></h1>
                <p> - Veja Todos os Bosses que ja enfrentou - </p>
            </div>

            {idBoss && (
                <div className="painel-edicao">
                    <h2>Editar Boss Selecionado</h2>
                    <label htmlFor="">Número:</label>
                    <input type="number" value={numero} onChange={(e) => setNumero(e.target.value)} className="inputs" />


                    <label htmlFor="">Nome:</label>
                    <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} className="inputs" />

                    <label htmlFor="">Nível</label>
                    <input type="number" value={nivel} onChange={(e) => setNivel(e.target.value)} className="inputs" />

                    <label htmlFor="">Recompensa</label>
                    <input type="text" value={recompensa} onChange={(e) => setRecompesa(e.target.value)} className="inputs" />

                    <label htmlFor="">Região:</label>
                    <input type="text" value={regiao} onChange={(e) => setRegiao(e.target.value)} className="inputs" />

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

                    <div className="botoes">
                        <button onClick={cancelarEdicao} className="botao-cancelar">Cancelar</button>
                        <button onClick={alterarBoss} className="botao-alterar">Salvar Alterações</button>
                    </div>
                </div>
            )}

            <div className="exibirPals">
                <div className="mensagem">
                    {msg && (<h4 className="msg">{msg}</h4>)}
                </div>

                {/* Se a lsita estiver vazia */}
                {boss.length === 0 ? (
                    <div className="sem-pals">
                        <h3>Nenhum Boss encontrado!</h3>

                        <Link to="/cadastroBoss " className="btn-cadastrar"> + Cadastrar Pal</Link>
                    </div>
                ) : (
                    /* Se exitir pals mostra eles */
                    <>
                        <div className="topo-acoes">
                            <Link to="/cadastroBoss" className="btn-cadastrar">+ Cadastrar Novo Boss</Link>
                        </div>

                        {boss.map((item) => (
                            <div className="card-pals" key={item.id}>
                                <div className="nome-numero">
                                    <span className="numero">#{item.numero}</span>
                                    <span className="nome">{item.nome}</span>
                                </div>

                                <label htmlFor="">Nível</label>
                                <input type="number" placeholder="50" name="" id="" value={item.nivel} onChange={(e) => setNivel(e.target.value)} className="inputs" />

                                <label htmlFor="">Recompensa</label>
                                <input type="text" placeholder="Peça de Tecnologia Antiga x3" name="" id="" value={item.recompensa} onChange={(e) => setRecompesa(e.target.value)} className="inputs" />

                                <label htmlFor="">Região:</label>
                                <input type="text" placeholder="Vulcão Obsidian" name="" id="" value={item.regiao} onChange={(e) => setRegiao(e.target.value)} className="inputs" />

                                <label htmlFor="">Status:</label>
                                <select name="" id="" value={item.status} onChange={(e) => setStatus(e.target.value)} className="inputs-select">
                                    <option value={item.status}>{item.status}</option>

                                </select>
                                {/* <input type="text" placeholder="Derrotado" name="" id="" value={status} onChange={(e) => setStatus(e.target.value)} className="inputs" /> */}

                                <label htmlFor="">Tipo de Arena:</label>
                                <select name="" id="" value={item.tipoArena} onChange={(e) => setTipoArena(e.target.value)} className="inputs-select">
                                    <option value={item.tipoArena}>{item.tipoArena}</option>

                                </select>
                                <div className="botoes">
                                    <button className="botao-selecionar" onClick={() => selecionarBoss(item)}>Selecionar</button>
                                    <button className="botao-excluir" onClick={() => excluirBoss(item.id)}>Excluir</button>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>

        </div>
    )
}

export default BossDex