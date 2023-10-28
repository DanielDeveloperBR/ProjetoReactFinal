import { useState } from 'react';
import { IonButton, IonHeader, IonContent, IonToolbar, IonTitle, IonInput, IonLabel } from '@ionic/react';
import firebase from '../../../firebaseConfig';
import { useHistory } from 'react-router';

function Cadastrar() {
  const history = useHistory()
  const [formData, setFormData] = useState({
    nome: '',
    dia: '',
    mes: '',
    hora: '',
    minuto: ''
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const firestore = firebase.firestore();
  const produtosRef = firestore.collection('produtos');
  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (formData.nome === "" || formData.dia === "" || formData.mes === "" || formData.hora === "" || formData.minuto === "") {
      alert("preencha os campos")
      return
    } else {
      produtosRef.add(formData)
        .then((docRef: { id: any; }) => {
          console.log('Dados enviados para o Firebase com ID:', docRef.id);
          history.push('/dashboard');

        })
        .catch(error => {
          console.error('Erro ao enviar dados para o Firebase:', error);
        })
    }
  }
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Agendamento</IonTitle>
        </IonToolbar>
      </IonHeader><IonContent class="ion-padding">
        <h1>Agendamento</h1>
        <form onSubmit={handleSubmit}>
          <IonLabel position="floating">Nome</IonLabel>
          <IonInput type="text" name="nome" value={formData.nome} onIonChange={handleInputChange}></IonInput>
          <IonLabel position="floating">Dia</IonLabel>
          <IonInput type="text" name="dia" value={formData.dia} onIonChange={handleInputChange}></IonInput>
          <IonLabel position="floating">Mês</IonLabel>
          <IonInput type="text" name="mes" value={formData.mes} onIonChange={handleInputChange}></IonInput>
          <IonLabel position="floating">Hora</IonLabel>
          <IonInput type="text" name="hora" value={formData.hora} onIonChange={handleInputChange}></IonInput>
          <IonLabel position="floating">Minutos</IonLabel>
          <IonInput type="text" name="hora" value={formData.hora} onIonChange={handleInputChange}></IonInput>
          <IonButton expand="full" type="submit">Cadastrar</IonButton>
        </form>
      </IonContent>
    </>
  )
}
export default Cadastrar;
