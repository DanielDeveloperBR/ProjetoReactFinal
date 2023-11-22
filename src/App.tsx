import { IonApp, setupIonicReact } from '@ionic/react';
import Home from './pages/Home';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '@ionic/react/css/core.css'
import './global.css'
import Cadastrar from './pages/cadastrar/cadastrar';


// /* Basic CSS for apps built with Ionic */
// import '@ionic/react/css/normalize.css';
// import '@ionic/react/css/structure.css';
// import '@ionic/react/css/typography.css';

// /* Optional CSS utils that can be commented out */
// import '@ionic/react/css/padding.css';
// import '@ionic/react/css/float-elements.css';
// import '@ionic/react/css/text-alignment.css';
// import '@ionic/react/css/text-transformation.css';
// import '@ionic/react/css/flex-utils.css';
// import '@ionic/react/css/display.css';



setupIonicReact();

const App: React.FC = () => (
  <BrowserRouter>
    <IonApp>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/cadastrar" element={<Cadastrar />} />
      </Routes>
    </IonApp>
  </BrowserRouter>
);

export default App;