import { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonLabel, IonItem, IonToast } from '@ionic/react';
import firebase from '../../../firebaseConfig'; // Importe sua configuração do Firebase
import { useHistory } from 'react-router-dom';

const Login = () => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const handleLogin = async () => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
            setToastMessage("Login bem-sucedido!");
            history.push("/dashboard");
        } catch (error) {
            setToastMessage("Usuário ou senha incorretos");
        } finally {
            setShowToast(true);
        }
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonTitle>Bem-vindo(a) de volta!</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                <IonItem>
                    <IonLabel position="floating">Email:</IonLabel>
                    <IonInput
                        type="text"
                        value={email}
                        onIonChange={e => setEmail(e.detail.value || '')}
                        required
                    />

                </IonItem>

                <IonItem>
                    <IonLabel position="floating">Senha:</IonLabel>
                    <IonInput
                        type="password"
                        value={password}
                        onIonChange={e => setPassword(e.detail.value || '')}
                        required
                    />

                </IonItem>

                <IonButton expand="full" color="secondary" className="ion-margin-top" onClick={handleLogin}>Entrar</IonButton>

                <IonToast
                    isOpen={showToast}
                    onDidDismiss={() => setShowToast(false)}
                    message={toastMessage}
                    duration={3000}
                />
            </IonContent>
        </IonPage>
    );
}

export default Login;
