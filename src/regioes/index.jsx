import "../styles/estiloPalDex.css"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { setDoc, doc, getDoc, addDoc, collection, getDocs, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore'
import { db, auth } from '../fireBaseConnection'
function Regioes() {

    const [nome, setNome] = useState("")
    const [clima, setClima] = useState("")
    const [faixaNivel, setFaixaNivel] = useState("")
    const [recurso, setRecursos] = useState("")
    const [viagem, setViagem] = useState("")

    const [msg, setMsg] = useState("")
    const [regioes, setRegioes] = useState([])
    const [idRegioes, setIdRegioes] = useState("")

    useEffect(() => {
        async function listarRegioes() {

            onSnapshot(collection(db, "regioes"), (querySnapshot) => {
                let lista = []
                querySnapshot.forEach((doc) => {
                    lista.push(
                        {
                            id: doc.id,
                            nome: doc.data().nome,
                            clima: doc.data().clima,
                            faixaNivel: doc.data().faixaNivel,
                            viagem: doc.data().viagem,
                            recurso:doc.data().recurso
                        })
                })
                setRegioes(lista)
            })
        }
        listarRegioes()
    }, [])

    async function excluirRegioes(id) {
        const regRef = doc(db, "regioes", id)

        await deleteDoc(regRef)
            .then(() => {
                setMsg('Regiões excluído com sucesso!')
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
                setMsg('Erro ao excluir a Região!')
                console.log("Erro ao excluir os dados" + error)
            })
    }

    function selecionarRegiao(item) {
        setIdRegioes(item.id);
        setNome(item.nome);
        setClima(item.clima)
        setFaixaNivel(item.faixaNivel)
        setRecursos(item.recurso)
        setViagem(item.viagem)

        window.scrollTo({
            top: 0,
            behavior: 'smooth' //animação suave
        });
    }

    function cancelarEdicao() {
        setIdRegioes("")
        setNome('');
        setClima("")
        setFaixaNivel("")
        setRecursos("")
        setViagem("")
    }


     async function alterarRegiao() {
        if (!idRegioes) return;

        const regRef = doc(db, "regioes", idRegioes);
        await setDoc(regRef, {
            nome: nome,
            clima:clima,
            faixaNivel:faixaNivel,
            recurso: recurso,
            viagem:viagem
        })
            .then(() => {
                cancelarEdicao(); // Limpa os campos e oculta o card de edição
                setMsg("Região alterado com sucesso!");
                setTimeout(() => setMsg(""), 3000);
            })
            .catch((error) => {
                console.log("Erro ao alterar: " + error);
                setMsg("Erro ao alterar os dados do Região.");
            });
    }
    return (

        <div className="container-pals">
          
           

             <div className="titulo"  style={{ backgroundColor: '#D15319', color:"white" }}>

                <h1 style={{color:"white"}}><strong>Regiões</strong></h1>
                <p>  - Veja todos as suas Regiões Visitadas -  </p>
            </div>

            {idRegioes && (
                <div className="painel-edicao">
                    <h2>Editar Região Selecionada</h2>

                    

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
                            <option value="sim">Sim</option>
                            <option value="nao">Não</option>
                        </select>
                   

                    <div className="botoes">
                        <button onClick={cancelarEdicao} className="botao-cancelar">Cancelar</button>
                        <button onClick={alterarRegiao} className="botao-alterar">Salvar Alterações</button>
                    </div>
                </div>
            )}

            <div className="exibirPals">
                <div className="mensagem">
                    {msg && (<h4 className="msg">{msg}</h4>)}
                </div>

                {/* Se a lsita estiver vazia */}
                {regioes.length === 0 ? (
                    <div className="sem-pals">
                        <h3>Nenhuma Região encontrada!</h3>

                        <Link to="/cadastroRegioes" className="btn-cadastrar"> + Cadastrar Região</Link>
                    </div>
                ) : (
                    /* Se exitir pals mostra eles */
                    <>
                        <div className="topo-acoes">
                            <Link to="/cadastroRegioes" className="btn-cadastrar">+ Cadastrar Nova Região</Link>
                        </div>

                        {regioes.map((item) => (
                            <div className="card-pals" key={item.id}>
                                <div className="nome-numero">

                                    <span className="nome">{item.nome}</span>
                                </div>

                               


                                    <label htmlFor="">Clima:</label>

                                    <select id="tipo1" value={clima} onChange={(e) => setClima(e.target.value)} className="inputs-select">
                                        <option value={item.clima}>{item.clima}</option>
                                    </select>

                                    <label htmlFor="">Faixa de Nivel:</label>
                                    <input type="number" placeholder="30" name="" id="" value={item.faixaNivel} onChange={(e) => setFaixaNivel(e.target.value)} className="inputs" />

                                    <label htmlFor="">Recursos:</label>
                                    <input type="text" placeholder="Minerio de Enxofre" name="" id="" value={item.recurso} onChange={(e) => setRecursos(e.target.value)} className="inputs" />

                                    <label htmlFor="">Tem Viagem Rápida?</label>
                                    <select id="equipe" name="equipe" placeholder="Selecione" value={item.viagem} onChange={(e) => setViagem(e.target.value)} className="inputs-select">
                                        <option value="sim">Sim</option>
                                        <option value="nao">Não</option>
                                    </select>
                               

                                <div className="botoes">
                                    <button className="botao-selecionar" onClick={() => selecionarRegiao(item)}>Selecionar</button>
                                    <button className="botao-excluir" onClick={() => excluirRegioes(item.id)}>Excluir</button>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>

        </div>

    )
}

export default Regioes