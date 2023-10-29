import { useState } from 'react';
import { IonHeader, IonContent, IonToolbar, IonTitle, IonInput, IonLabel, IonRouterLink, IonCol, IonGrid, IonItem, IonRow, IonButton, IonDatetime } from '@ionic/react';
import firebase from '../../../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';


function Cadastrar() {
  const navigate = useNavigate();
  const firestore = firebase.firestore();
  const agendamentoReferencia = firestore.collection('agendamento');
  const [formData, setFormData] = useState({
    nome: '',
    data: '',
  });



  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const { nome, data } = formData;
    console.log("pegando o nome, data... " + formData.nome + " " + formData.data)
    if (nome === '' || data === '') {
      alert('Preencha todos os campos');
      return;
    }

    try {
      const formattedDate = `${data}`;
      const dataFormatada = new Date(formattedDate);

      if (isNaN(dataFormatada.getTime())) {
        throw new Error('Data ou hora inválida');
      }

      console.log("pegando o nome , data... " + formattedDate)
      agendamentoReferencia.add({
          nome,
          dia: dataFormatada.getDate(),
          mes: dataFormatada.getMonth() + 1,
          hora: dataFormatada.getHours(),
          minutos: dataFormatada.getMinutes(),
        })
        .then((docRef: { id: any }) => {
          console.log("enviou os dandos: " + formattedDate)
          console.log("data formatada: " + dataFormatada)
          console.log('Dados enviados para o Firebase com ID:', docRef.id);
          navigate('/dashboard');
        })
        .catch(error => {
          console.error('Erro ao enviar dados para o Firebase:', error);
        });
    } catch (error) {
      console.error('Erro:', error);
      alert('Data ou hora inválida');
    }
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Agendamento</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div>
          <h1>Agendamento</h1>
          <form onSubmit={handleSubmit}>
            <IonGrid>
              <IonRow>
                <IonCol size="12" sizeMd="6">
                  <IonItem>
                    <IonInput label="Nome" type="text" name="nome" value={formData.nome} onIonChange={handleInputChange} />
                  </IonItem>
                </IonCol>
                <IonCol size="12" sizeMd="6">
                  <IonItem>
                    <IonDatetime
                      aria-label="Data"
                      name="data"
                      onIonChange={handleInputChange}
                      presentation="date-time"
                      preferWheel={true}
                      min={format(new Date(), 'yyyy-MM-dd')} 
                      hourValues='6,7,8,9,10,11,12,13,14,15,16,17,18'
                    ></IonDatetime>

                  </IonItem>
                </IonCol>
              </IonRow>
            </IonGrid>
            <IonButton expand="block" type="submit">
              Enviar
            </IonButton>
            <IonRouterLink routerLink="/home">Voltar</IonRouterLink>
          </form>
        </div>
      </IonContent>
    </>
  );
}

export default Cadastrar;
