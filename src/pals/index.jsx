
import "../styles/estiloCadastro.css"
import { useState } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../fireBaseConnection'


function Pals() {
    const [numero, setNumero] = useState();
    const [nome, setNome] = useState('');
    const [tipo1, setTipo1] = useState('');
    const [tipo2, setTipo2] = useState('Nao_tem');
    const [hp, setHp] = useState('');
    const [ataque, setAtaque] = useState('');
    const [defesa, setDefesa] = useState('');
    const [nivel, setNivel] = useState('');
    const [descricao, setDescricao] = useState('');
    const [equipe, setEquipe] = useState('nao');

    const [msg, setMsg] = useState("")


    async function handleAdd() {
        console.log(numero)
        console.log(nome)
        console.log(tipo1)
        console.log(tipo2)
        console.log(hp)
        console.log(ataque)
        console.log(defesa)
        console.log(nivel)
        console.log(descricao)
        console.log(equipe)
        if (numero === '' || nome === '' || tipo1 === '' || hp === '' || ataque === '' || defesa === '' || nivel === '' || descricao === '') {
            setMsg('Preencha todos os campos.')
            console.log('Preencha todos os campos obrigatórios.')
        } else {
            if (tipo1 === tipo2 && tipo2 !== "Nao_tem") {
                setMsg('O tipo primário e secundário não podem ser iguais.')
                console.log('O tipo primário e secundário não podem ser iguais.')

            } else {
                await addDoc(collection(db, "pals"), {
                    numero: numero,
                    nome: nome,
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
                        setNumero('');
                        setNome('');
                        setTipo1('');
                        setTipo2('Nao_tem');
                        setHp('');
                        setAtaque('');
                        setDefesa('');
                        setNivel('');
                        setDescricao('');
                        setEquipe('nao');

                        setMsg('Pal cadastrado com sucesso!')
                        console.log('Pal cadastrado com sucesso!')
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


    }
 
    return (
        <div className="container-pals">
            <div className="titulo">

                    <h1><strong>Cadastro de Pals</strong></h1>
                    <p>- Seus parceiros - </p>
                </div>
            <div className="cadastro">
                
                <label htmlFor="">Número:</label>
                <input type="number" placeholder="185" name="" id="" value={numero} onChange={(e) => setNumero(e.target.value)} className="inputs" />

                <label htmlFor="">Nome:</label>
                <input type="text" placeholder="Grizzbolt" name="" id="" value={nome} onChange={(e) => setNome(e.target.value)} className="inputs" />

                <label htmlFor="">Tipo:</label>

                <select id="tipo1" value={tipo1} onChange={(e) => setTipo1(e.target.value)} className="inputs-select">
                    <option value="">Selecione um tipo</option>
                    <option value="normal" style={{ backgroundColor: 'gray' }}>Normal</option>
                    <option value="fogo" style={{ backgroundColor: 'red' }}>Fogo</option>
                    <option value="agua" style={{ backgroundColor: 'blue' }}>Água</option>
                    <option value="eletrico" style={{ backgroundColor: 'yellow' }}>Elétrico</option>
                    <option value="erva" style={{ backgroundColor: 'green' }}>Erva</option>
                    <option value="terra" style={{ backgroundColor: 'brown' }}>Terra</option>
                    <option value="planta" style={{ backgroundColor: 'lightgreen' }}>Planta</option>
                    <option value="gelo" style={{ backgroundColor: 'lightblue' }}>Gelo</option>
                    <option value="dragao" style={{ backgroundColor: 'purple' }}>Dragão</option>
                    <option value="sombra" style={{ backgroundColor: 'darkgray' }}>Sombra</option>
                </select>


                <label htmlFor="">Tipo secundário:</label>
                <select id="tipo2" name="tipo2" placeholder="Selecione" value={tipo2} onChange={(e) => setTipo2(e.target.value)} className="inputs-select">

                    <option value="Nao_tem">Não possui</option>

                    <option value="fogo" style={{ backgroundColor: 'red' }}>Fogo</option>
                    <option value="agua" style={{ backgroundColor: 'blue' }}>Água</option>
                    <option value="eletrico" style={{ backgroundColor: 'yellow' }}>Elétrico</option>
                    <option value="erva" style={{ backgroundColor: 'green' }}>Erva</option>
                    <option value="terra" style={{ backgroundColor: 'brown' }}>Terra</option>
                    <option value="planta" style={{ backgroundColor: 'lightgreen' }}>Planta</option>
                    <option value="gelo" style={{ backgroundColor: 'lightblue' }}>Gelo</option>
                    <option value="dragao" style={{ backgroundColor: 'purple', color: 'white' }}>Dragão</option>
                    <option value="sombra" style={{ backgroundColor: 'darkgray' }}>Sombra</option>
                </select>

                <label htmlFor="">HP:</label>
                <input type="number" placeholder="120" name="" id="" value={hp} onChange={(e) => setHp(e.target.value)} className="inputs" />

                <label htmlFor="">Ataque: </label>
                <input type="number" placeholder="105" name="" id="" value={ataque} onChange={(e) => setAtaque(e.target.value)} className="inputs" />

                <label htmlFor="">Defesa: </label>
                <input type="number" placeholder="105" name="" id="" value={defesa} onChange={(e) => setDefesa(e.target.value)} className="inputs" />
 
                <label htmlFor="">Nível:</label>
                <input type="number"placeholder="20" name="" id="" value={nivel} onChange={(e) => setNivel(e.target.value)} className="inputs" />

                <label htmlFor="">Descrição:</label>
                <input type="text" placeholder="De sorriso cativante e porte robusto," name="" id="" value={descricao} onChange={(e) => setDescricao(e.target.value)} className="inputs" />

                <label htmlFor="">Faz parte da sua equipe?</label>
                <select id="equipe" name="equipe" placeholder="Selecione" value={equipe} onChange={(e) => setEquipe(e.target.value)} className="inputs-select">
                    <option value="sim">Sim</option>
                    <option value="nao">Não</option>
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

export default Pals