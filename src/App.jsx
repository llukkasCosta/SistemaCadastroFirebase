
  import './App.css';

  import { useNavigate, Outlet, Link } from 'react-router-dom';
  import { auth } from './fireBaseConnection';
  import { signOut } from 'firebase/auth'

  function App() {
    const navigate = useNavigate();

    async function handleLogout() {
      await signOut(auth)
        .then(() => {
          //logout e volta pra tela de login
          navigate('/login', { replace: true });
        })
        .catch((error) => {
          console.log("Erro ao fazer logout: " + error);
        });
    }
    return (
      <>
        <div className="container">



          <div className="menu">
            <div className="logo">
              <img src="./img/logo.png" alt="" />

              <h2>Navegar</h2>
            </div>
            <div className="links">

              <ul>
                <li><Link to="/">Início</Link> </li>

                <li><Link to="/bossdex">Bosses</Link></li>
                <li><Link to="/equipamentos">Equipamentos</Link></li>
                <li><Link to="/regioes">Regiões</Link></li>
                <li><Link to="/estruturas">Estruturas</Link></li>
                <li>

                  <button onClick={handleLogout} className="btn-logout">
                    Sair da Conta
                  </button>
                </li>
              </ul>




              <div className="img">
                <img src="./img/Grizzbolt.webp" alt="" />
              </div>



            </div>
          </div>


          <div className="conteudo">
            <Outlet />
          </div>

        </div>


      </>
    );
  }

  export default App;