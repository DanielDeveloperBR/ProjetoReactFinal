import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import Home from './pages/Home';
import Login from './pages/login/login';
import Dashboard from './pages/dashboard/dashboard';
import Cadastrar from './pages/cadastrar/cadastrar';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';


setupIonicReact();

const App: React.FC = () => (
  <BrowserRouter>
    <IonApp>
      <Routes>
          <Route path="/home" element={<Home />}/>
          <Route path="/cadastrar" element={<Cadastrar />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/" element={<Home />} />
      </Routes>
    </IonApp>
  </BrowserRouter>
);

export default App;