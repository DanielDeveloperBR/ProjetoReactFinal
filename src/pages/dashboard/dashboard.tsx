import React, { useState, useEffect } from "react";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonButton, IonRouterLink } from '@ionic/react';
import style from './dashboard.module.css'
import firebase from '../../../firebaseConfig'

const firestore = firebase.firestore();

// Definição da interface do Produto
interface Agendamento {
  id: string;
  nome: string;
  dia: number;
  mes: number;
  hora: number;
  minutos: number;
}

const Dashboard: React.FC = () => {
  const [produtos, setProdutos] = useState<Agendamento[]>([]);

  const listarProdutos = async () => {
    const querySnapshot = await firestore.collection("agendamento").get();
    const produtosArray: Agendamento[] = [];

    for (const document of querySnapshot.docs) {
      const data = document.data();
      produtosArray.push({
        id: document.id,
        dia: data.dia,
        hora: data.hora,
        mes: data.mes,
        minutos: data.minutos,
        nome: data.nome
      });
    }

    setProdutos(produtosArray);
  };

  useEffect(() => {
    listarProdutos();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Loja de Produtos</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h2>Lista de produtos</h2>

        {produtos.map((produto) => (
          <IonCard key={produto.id}>
            <IonCardHeader>
              <IonCardTitle>{produto.nome}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <table className={style.tabela}>
                <thead>
                  <tr>
                    <th colSpan={5}>Agendado</th>
                  </tr>
                  <tr>
                    <td>Dia</td>
                    <td>Mês</td>
                    <td>Hora</td>
                    <td>Minutos</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{produto.dia}</td>
                    <td>{produto.mes}</td>
                    <td>{produto.hora}</td>
                    <td>{produto.minutos}</td>
                  </tr>
                </tbody>
              </table>
            </IonCardContent>
          </IonCard>
        ))}
        <IonRouterLink routerLink="/home">voltar</IonRouterLink>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
