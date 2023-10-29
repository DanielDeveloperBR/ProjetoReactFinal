import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonLabel, IonToast, IonRouterLink, IonText } from '@ionic/react';
import firebase from '../../firebaseConfig';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
   const navigate = useNavigate()
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

   const handleNavigateToCadastro = () => {
      setTimeout(() => {
         navigate('/cadastrar');
      }, 100); // Aguarda 100ms antes de redirecionar
   }

   return (
      <IonPage>
         <IonHeader>
            <IonToolbar>
               <IonTitle>Reserva na Loja</IonTitle>
            </IonToolbar>
         </IonHeader>
         <IonContent className="ion-padding">

            <IonLabel position="floating">Email:</IonLabel>
            <IonInput type="text" value={email} onIonChange={e => setEmail(e.detail.value || '')} required />

            <IonLabel position="floating">Senha:</IonLabel>
            <IonInput type="password" value={password} onIonChange={e => setPassword(e.detail.value || '')} required />

            <IonButton expand="full" color="secondary" className="ion-margin-top" onClick={handleLogin}>Entrar</IonButton>
            <IonText>Ainda não agendou?
            <IonRouterLink routerLink='/cadastrar'> Cadastrar</IonRouterLink>
            </IonText>

            <IonToast
               isOpen={showToast}
               onDidDismiss={() => setShowToast(false)}
               message={toastMessage}
               duration={3000} />
         </IonContent>
      </IonPage>
   );
}

export default Home;
