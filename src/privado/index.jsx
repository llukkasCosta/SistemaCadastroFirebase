import { useState, useEffect } from 'react';
import { auth } from '../fireBaseConnection';
import { onAuthStateChanged } from 'firebase/auth';

import { useNavigate, Outlet, Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

function Privado({children}){
    const [caregando, setCarregando] = useState(true);
    const [logado, setLogado] = useState(false);

    const navigate = useNavigate();


    useEffect(() => {
    //verifica de esta logado
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        // se estiver 
        setLogado(true);
        setCarregando(false); // para de mostrar carregando 
      } else {
        // se não
        setLogado(false);
        setCarregando(false);
      }
    });

    return () => unsub(); 
  }, []);

  if (caregando) { //tela de espera
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <h2>Carregando...</h2>
      </div>
    );
  }

  // Se não estiver logado redireciona imediatamente para a tela de Login
  if (!logado) {
    return <Navigate to="/login" replace />;
  }

  // Se estiver logado renderiza a página normalmente
  return children;
}


export default Privado