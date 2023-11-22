import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonLabel, IonToast, IonRouterLink, IonText, IonGrid, IonRow, IonCol, IonIcon, IonImg, IonApp } from '@ionic/react';

import firebase from '../../firebaseConfig';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Formulario from '../components/Login';
import '../global.css'

const Home = () => {
   const navigate = useNavigate();
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [showToast, setShowToast] = useState(false);
   const [toastMessage, setToastMessage] = useState('');

   const handleLogin = async () => {
      try {
         await firebase.auth().signInWithEmailAndPassword(email, password);
         navigate("/dashboard");
      } catch (error) {
         setToastMessage("Usuário ou senha incorretos");
      } finally {
         setShowToast(true);
      }
   }

   return (
      <IonApp>
         <main>
            <Formulario />
            <p>Ainda não agendou?</p>
            <IonRouterLink routerLink="/cadastrar"> Cadastrar</IonRouterLink>
         </main>

      </IonApp>
   )
}

export default Home