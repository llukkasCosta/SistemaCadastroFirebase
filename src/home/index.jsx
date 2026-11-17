import "../styles/estiloPalDex.css"
import { useState, useEffect } from 'react'
import { setDoc, doc, getDoc, addDoc, collection, getDocs, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore'
import { db, auth } from '../fireBaseConnection'


import { Link, Outlet } from "react-router";

function PalsDex() {
    const [numero, setNumero] = useState('');
    const [nome, setNome] = useState('');
    const [tipo1, setTipo1] = useState('');
    const [tipo2, setTipo2] = useState('');
    const [hp, setHp] = useState('');
    const [ataque, setAtaque] = useState('');
    const [defesa, setDefesa] = useState('');
    const [nivel, setNivel] = useState('');
    const [descricao, setDescricao] = useState('');
    const [equipe, setEquipe] = useState('');

    const [msg, setMsg] = useState("")

    const [pals, setPals] = useState([]);

    const [idPal, setIdPal] = useState("")

    useEffect(() => {
        async function listarPals() {

            onSnapshot(collection(db, "pals"), (querySnapshot) => {
                let lista = []
                querySnapshot.forEach((doc) => {
                    lista.push(
                        {
                            id: doc.id,
                            nome: doc.data().nome,
                            numero: doc.data().numero,
                            tipo1: doc.data().tipo1,
                            tipo2: doc.data().tipo2,
                            hp: doc.data().hp,
                            ataque: doc.data().ataque,
                            defesa: doc.data().defesa,
                            nivel: doc.data().nivel,
                            descricao: doc.data().descricao,
                            equipe: doc.data().equipe
                        })
                })
                setPals(lista)
            })
        }
        listarPals()
    }, [])

    async function excluirPal(id) {
        const palRef = doc(db, "pals", id)

        await deleteDoc(palRef)
            .then(() => {
                setMsg('Pal excluído com sucesso!')
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
                setMsg('Erro ao excluir o Pal!')
                console.log("Erro ao excluir os dados" + error)
            })
    }

    function selecionarPal(item) {
        setIdPal(item.id);
        setNumero(item.numero);
        setNome(item.nome);
        setTipo1(item.tipo1);
        setTipo2(item.tipo2);
        setHp(item.hp);
        setAtaque(item.ataque);
        setDefesa(item.defesa);
        setNivel(item.nivel);
        setDescricao(item.descricao);
        setEquipe(item.equipe);

        window.scrollTo({
            top: 0,
            behavior: 'smooth' //animação suave
        });
    }


    function cancelarEdicao() {
        setIdPal("");
        setNumero('');
        setNome('');
        setTipo1('');
        setTipo2('');
        setHp('');
        setAtaque('');
        setDefesa('');
        setNivel('');
        setDescricao('');
        setEquipe('');
    }

    async function alterarPal() {
        if (!idPal) return;

        const palRef = doc(db, "pals", idPal);
        await setDoc(palRef, {
            nome: nome,
            numero: numero,
            tipo1: tipo1,
            tipo2: tipo2,
            hp: hp,
            ataque: ataque,
            defesa: defesa,
            nivel: nivel,
            descricao: descricao,
            equipe: equipe
        })
            .then(() => {
                cancelarEdicao(); // Limpa os campos e oculta o card de edição
                setMsg("Pal alterado com sucesso!");
                setTimeout(() => setMsg(""), 3000);
            })
            .catch((error) => {
                console.log("Erro ao alterar: " + error);
                setMsg("Erro ao alterar os dados do Pal.");
            });
    }

    return (



        <div className="container-pals">
            {/* <Link to="/pals">Cadastro de Pals</Link> */}
            <div className="titulo">

                <h1><strong>PalsDex</strong></h1>
                <p> - Veja todos os seus companheiros Pals - </p>
            </div>

            {idPal && (
                <div className="painel-edicao">
                    <h2>Editar Pal Selecionado</h2>

                    <label>Número:</label>
                    <input type="text" value={numero} onChange={(e) => setNumero(e.target.value)} className="inputs" />

                    <label>Nome:</label>
                    <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} className="inputs" />

                    <label>Tipo Primário:</label>
                    <select value={tipo1} onChange={(e) => setTipo1(e.target.value)} className="inputs-select">
                        <option value="Normal">Normal</option>
                        <option value="Fogo">Fogo</option>
                        <option value="Água">Água</option>
                        <option value="Planta">Planta</option>
                        <option value="Elétrico">Elétrico</option>
                        <option value="Gelo">Gelo</option>
                        <option value="Dragão">Dragão</option>
                        <option value="Sombrio">Sombrio</option>
                        <option value="Terra">Terra</option>
                    </select>

                    <label>Tipo Secundário:</label>
                    <select value={tipo2} onChange={(e) => setTipo2(e.target.value)} className="inputs-select">
                        <option value="Nenhum">Nenhum</option>
                        <option value="Normal">Normal</option>
                        <option value="Fogo">Fogo</option>
                        <option value="Água">Água</option>
                        <option value="Planta">Planta</option>
                        <option value="Elétrico">Elétrico</option>
                        <option value="Gelo">Gelo</option>
                        <option value="Dragão">Dragão</option>
                        <option value="Sombrio">Sombrio</option>
                        <option value="Terra">Terra</option>
                    </select>

                    <label>HP:</label>
                    <input type="text" value={hp} onChange={(e) => setHp(e.target.value)} className="inputs" />

                    <label>Ataque:</label>
                    <input type="text" value={ataque} onChange={(e) => setAtaque(e.target.value)} className="inputs" />

                    <label>Defesa:</label>
                    <input type="text" value={defesa} onChange={(e) => setDefesa(e.target.value)} className="inputs" />

                    <label>Nível:</label>
                    <input type="text" value={nivel} onChange={(e) => setNivel(e.target.value)} className="inputs" />

                    <label>Descrição:</label>
                    <input type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} className="inputs" />

                    <label>Faz parte da equipe?</label>
                    <select value={equipe} onChange={(e) => setEquipe(e.target.value)} className="inputs-select">
                        <option value="Sim">Sim</option>
                        <option value="Não">Não</option>
                    </select>

                    <div className="botoes">
                        <button onClick={cancelarEdicao} className="botao-cancelar">Cancelar</button>
                        <button onClick={alterarPal} className="botao-alterar">Salvar Alterações</button>
                    </div>
                </div>
            )}

            <div className="exibirPals">
                <div className="mensagem">
                    {msg && (<h4 className="msg">{msg}</h4>)}
                </div>

                {/* Se a lsita estiver vazia */}
                {pals.length === 0 ? (
                    <div className="sem-pals">
                        <h3>Nenhum Pal encontrado!</h3>

                        <Link to="/pals" className="btn-cadastrar"> + Cadastrar Pal</Link>
                    </div>
                ) : (
                    /* Se exitir pals mostra eles */
                    <>
                        <div className="topo-acoes">
                            <Link to="/pals" className="btn-cadastrar">+ Cadastrar Novo Pal</Link>
                        </div>

                        {pals.map((item) => (
                            <div className="card-pals" key={item.id}>
                                <div className="nome-numero">
                                    <span className="numero">#{item.numero}</span>
                                    <span className="nome">{item.nome}</span>
                                </div>

                                <label>Tipo:</label>
                                <select id="tipo1" value={item.tipo1} className="inputs-select" disabled >
                                    <option value={item.tipo1}>{item.tipo1}</option>
                                </select>

                                <label>Tipo secundário:</label>
                                <select id="tipo2" value={item.tipo2} className="inputs-select" disabled>
                                    <option value={item.tipo2}>{item.tipo2}</option>
                                </select>

                                <label>HP:</label>
                                <input type="text" value={item.hp} onChange={(e) => setHp(e.target.value)} className="inputs" disabled />

                                <label>Ataque:</label>
                                <input type="text" value={item.ataque} onChange={(e) => setAtaque(e.target.value)} className="inputs" disabled />

                                <label>Defesa:</label>
                                <input type="text" value={item.defesa} onChange={(e) => setDefesa(e.target.value)} className="inputs" disabled />

                                <label>Nível:</label>
                                <input type="text" value={item.nivel} onChange={(e) => setNivel(e.target.value)} className="inputs" disabled />

                                <label>Descrição:</label>
                                <input type="text" value={item.descricao} onChange={(e) => setDescricao(e.target.value)} className="inputs" disabled />

                                <label>Faz parte da sua equipe?</label>
                                <select id="equipe" value={item.equipe} className="inputs-select" disabled>
                                    <option value={item.equipe}>{item.equipe}</option>
                                </select>

                                <div className="botoes">
                                    <button className="botao-selecionar" onClick={() => selecionarPal(item)}>Selecionar</button>
                                    <button className="botao-excluir" onClick={() => excluirPal(item.id)}>Excluir</button>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>

        </div>

    )
}

export default PalsDex