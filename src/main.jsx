import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App';
import Home from './home/index';
import Palsdex from './home/index';
import BossDex from './bossDex/index';
import Estruturas from './estruturas/index';
import Regioes from './regioes/index';
import Equipamentos from './equipamentos/index';

import Pals from './pals/index';
import CadastroBoss from './cadastroBoss';
import CadastroEquipamentos from './cadastroEquipamentos';
import CadastroRegioes from './cadastroRegioes';
import CadastroEstruturas from './cadastroEstruturas';

import CadastroUser from './cadastro';
import Login from "./login";
import Privado from './privado';

function MainRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas abertas sem login*/}
        <Route path="/login" element={<Login />} />
        <Route path="/cadastroUser" element={<CadastroUser />} />

        {/* rotas protegidas */}
        <Route
          path="/"
          element={
            <Privado> {/* se estiver logado permite o acesso ao app*/ }
              <App />
            </Privado>
          }
        >
          {/* rotas dentro do app*/}
          <Route index element={<Home />} />
          <Route path="palsdex" element={<Palsdex />} />
          <Route path="pals" element={<Pals />} />
          <Route path="bossDex" element={<BossDex />} />
          <Route path="estruturas" element={<Estruturas />} />
          <Route path="regioes" element={<Regioes />} />
          <Route path="equipamentos" element={<Equipamentos />} />
          <Route path="cadastroBoss" element={<CadastroBoss />} />
          <Route path="cadastroEquipamento" element={<CadastroEquipamentos />} />
          <Route path="cadastroRegioes" element={<CadastroRegioes />} />
          <Route path="cadastroEstruturas" element={<CadastroEstruturas />} />
           

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MainRouter />
  </React.StrictMode>
);