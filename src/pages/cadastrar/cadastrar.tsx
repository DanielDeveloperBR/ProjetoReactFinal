import { useState } from 'react';
import { IonButton, IonHeader, IonContent, IonToolbar, IonTitle, IonInput, IonLabel, IonRouterLink } from '@ionic/react';
import firebase from '../../../firebaseConfig';
import { useNavigate } from 'react-router-dom';

function Cadastrar() {
  const navigate = useNavigate()
  const firestore = firebase.firestore();
  const agendamentoReferencia = firestore.collection('agendamento')
  const [formData, setFormData] = useState({
    nome: '',
    dia: '',
    mes: '',
    hora: '',
    minutos: '',
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (formData.nome === "" || formData.dia === "" || formData.mes === "" || formData.hora === "" || formData.minutos === "") {
      alert("preencha os campos")
      return
    } else {
      agendamentoReferencia.add(formData)
      .then((docRef: { id: any; }) => {
        console.log('Dados enviados para o Firebase com ID:', docRef.id);
        setFormData({
          nome: '',
          dia: '',
          mes: '',
          hora: '',
          minutos: '',
        });
          navigate('/dashboard');

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
      </IonHeader>
      <IonContent>
        <h1>Agendamento</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="nome">Nome</label>
          <input type="text" name="nome" value={formData.nome} onChange={handleInputChange} />
          <label htmlFor="dia">Dia</label>
          <input type="text" name="dia" value={formData.dia} onChange={handleInputChange} />
          <label htmlFor="mes">Mês</label>
          <input type="text" name="mes" value={formData.mes} onChange={handleInputChange} />
          <label htmlFor="hora">Hora</label>
          <input type="text" name="hora" value={formData.hora} onChange={handleInputChange} />
          <label htmlFor="minutos">Minutos</label>
          <input type="text" name="minutos" value={formData.minutos} onChange={handleInputChange} />
          <button type="submit">Agendar</button>
          <IonRouterLink routerLink='/home'>Voltar</IonRouterLink>
        </form>
      </IonContent>
    </>
  )
}
export default Cadastrar;
