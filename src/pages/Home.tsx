import  { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonLabel, IonToast, IonRouterLink, IonText, IonRadio, IonRadioGroup } from '@ionic/react';
import { useNavigate } from 'react-router-dom';
import style from '../pages/cadastrar/cadastrar.module.css';

const Home = () => {
   const navigate = useNavigate();
   const [login, setLogin] = useState('');
   const [senha, setSenha] = useState('');
   const [tipo, setTipo] = useState('');
   const [showToast, setShowToast] = useState(false);
   const [toastMessage, setToastMessage] = useState('');

   const handleLogin = async () => {
      try {
         const response = await fetch(`http://localhost:3000/app/login/`, {
            method: 'POST',
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "email": login, "senha": senha, "tipo": tipo })
         });

         if (response.ok) {
            const data = await response.json();

            if (data.tipoUsuario) {
               const tipoUsuario = data.tipoUsuario;
               localStorage.setItem('tipoUsuario', tipoUsuario);
               navigate("/dashboard");
            } else {
               alert("Tipo de usuário não reconhecido.");
            }
         } else {
            alert("Login ou senha incorretos!");
         }
      } catch (error) {
         setToastMessage("Erro ao realizar o login");
      } finally {
         setShowToast(true);
      }
   };

   return (
      <IonPage>
         <IonHeader>
            <IonToolbar>
               <IonTitle>Agendamento Expresso</IonTitle>
            </IonToolbar>
         </IonHeader>
         <IonContent>
            <div className={style.container}>
               <IonTitle>Faça Login</IonTitle>
               <IonRadioGroup value={tipo} onIonChange={e => setTipo(e.detail.value || '')} className={style.field}>
                  <IonRadio name='opcao' value='cliente' id='cliente' labelPlacement='start' alignment='center' className='ion-margin-start'>Sou Cliente
                  </IonRadio>
                  <IonRadio name='opcao' value='empresa' id='empresa' labelPlacement='start' alignment='center' className='ion-margin-start'>Sou Empresa
                  </IonRadio>
               </IonRadioGroup>
               <form method='post' className={style.containerFormulario}>

                  <IonInput label="Login" labelPlacement="floating" fill="outline" placeholder="Digite o seu login" type="text" value={login} onIonChange={e => setLogin(e.detail.value || '')} required clearInput={true} />

                  <IonInput label="Senha" labelPlacement="floating" fill="outline" placeholder="Digite a sua senha" type="password" value={senha} onIonChange={e => setSenha(e.detail.value || '')} required clearInput={true}/>
                  <IonButton onClick={handleLogin}>Entrar</IonButton>
               </form>
               <IonText>Ainda não agendou?
                  <IonRouterLink routerLink='/cadastrar'> Cadastrar</IonRouterLink>
               </IonText>

               <IonToast
                  isOpen={showToast}
                  onDidDismiss={() => setShowToast(false)}
                  message={toastMessage}
                  duration={3000} />
            </div>
         </IonContent>
      </IonPage>
   );
};

export default Home;